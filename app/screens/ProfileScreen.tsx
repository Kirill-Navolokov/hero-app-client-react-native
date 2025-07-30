import appColors from "@/assets/colors";
import { ScrollView, StyleSheet, Text } from "react-native";
import { ProfileOption } from "../components/ProfileOption";
import { strings } from "@/assets/strings";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProfileOpt } from "@/enums/ProfileOpt";
import { ProfileNavigationProp } from "@/navigation-types/ProfileNavigationParams";
import { TYPES } from "@/ioc/TypesRegistrations";
import React, { useEffect, useState } from "react";
import { AuthContext } from "../_layout";
import { iocContainer } from "@/ioc/inversify.config";
import { IPreferencesService } from "@/services/Preferences/IPreferencesService";
import { UserInfo } from "@/models/UserInfo";
import { labelStyles } from "@/assets/styles";

export default function ProfileScreen(
    {navigation}:{navigation: ProfileNavigationProp}) : React.JSX.Element {
    var safeArea = useSafeAreaInsets();
    const [userInfo, setUserInfo] = useState<UserInfo>();
    const { signOut } = React.useContext(AuthContext)!;

    const onOptionSelected = async (type: ProfileOpt) => {
        if(type == ProfileOpt.language) {
            navigation.navigate("ChooseLanguageScreen");
        } else if(type == ProfileOpt.faq) {
            navigation.navigate("FaqsScreen");
        }  else if(type == ProfileOpt.advices) {
            navigation.navigate("AdvicesScreen");
        } else if(type == ProfileOpt.signout) {
            await signOut();
        }
    }
    useEffect(() => {
        var preferencesService = iocContainer.get<IPreferencesService>(TYPES.PreferencesService);
        preferencesService.userInfo().then(result => setUserInfo(result));
    })

    return (
        <ScrollView
            contentContainerStyle={{
                paddingTop: 20,
                paddingBottom: safeArea.bottom,
            }}
            style={{
                backgroundColor: appColors.backgroundPrimary,
            }}>
            <Text
                style={[labelStyles.title, styles.userName]}
                >{ !userInfo?.username ? userInfo?.email : userInfo.username}</Text>
            <ProfileOption
                name={strings.language}
                iconName="language"
                onSelected={() => onOptionSelected(ProfileOpt.language)} />
            <ProfileOption
                name={strings.leaveFeedback}
                iconName="feedback"
                onSelected={() => onOptionSelected(ProfileOpt.feedback)} />
            <ProfileOption
                name={strings.supportProject}
                iconName="support"
                onSelected={() => onOptionSelected(ProfileOpt.supportProject)} />
            <ProfileOption
                name={strings.faq}
                iconName="question-answer"
                onSelected={() => onOptionSelected(ProfileOpt.faq)}
                viewStyle={{marginTop: 20}} />
            <ProfileOption
                name={strings.advices}
                iconName="info"
                onSelected={() => onOptionSelected(ProfileOpt.advices)}/>
            <ProfileOption
                name={strings.termsConditions}
                iconName="handshake"
                onSelected={() => onOptionSelected(ProfileOpt.termsConditions)} />
            <ProfileOption
                name={strings.privacyPolicy}
                iconName="privacy-tip"
                onSelected={() => onOptionSelected(ProfileOpt.privacyPolicy)} />
            {/* <ProfileOption
                name={strings.signout}
                iconName="logout"
                onSelected={() => onOptionSelected(ProfileOpt.signout)}
                viewStyle={{marginTop: 30}} /> */}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    userName: {
        paddingHorizontal: 15,
        paddingBottom: 15
    }
})