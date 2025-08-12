import appColors from "@/assets/colors";
import { ActionSheetIOS, ScrollView, StyleSheet } from "react-native";
import ProfileOption from "../components/ProfileOption";
import { strings } from "@/assets/strings";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProfileOpt } from "@/enums/ProfileOpt";
import { ProfileNavigationProp } from "@/navigation-types/ProfileNavigationParams";
import React from "react";
import { openUrlModally } from "@/utils/helperFunctions";
import { AuthContext } from "../../utils/AuthContextType";
import { Image } from "expo-image";
import { iocContainer } from "@/ioc/inversify.config";
import { ISecureStorage } from "@/services/ISecureStorage";
import { TYPES } from "@/ioc/TypesRegistrations";
import { DbConnection } from "@/db/DbConnection";

export default function ProfileScreen(
    {navigation}:{navigation: ProfileNavigationProp}) : React.JSX.Element {
    const safeArea = useSafeAreaInsets();
    const { signOut } = React.useContext(AuthContext)!;

    const onOptionSelected = async (type: ProfileOpt) => {
        if(type == ProfileOpt.language) {
            navigation.navigate("ChooseLanguageScreen");
        } else if(type == ProfileOpt.faq) {
            navigation.navigate("FaqsScreen");
        }  else if(type == ProfileOpt.advices) {
            navigation.navigate("AdvicesScreen");
        }  else if(type == ProfileOpt.privacyPolicy) {
            await openUrlModally('https://github.com/Kirill-Navolokov/hero-app-client-react-native/blob/main/PRIVACY_POLICY.md');
        } else if(type == ProfileOpt.cleanCache) {
            clearCache();
        } else if(type == ProfileOpt.signout) {
            await signOut();
        }
    }

    return (
        <ScrollView
            contentContainerStyle={{
                paddingTop: 20,
                paddingBottom: safeArea.bottom
            }}
            style={{
                backgroundColor: appColors.backgroundPrimary,
            }}>
            <ProfileOption
                name={strings.language}
                iconName="language"
                onSelected={() => onOptionSelected(ProfileOpt.language)} />
            <ProfileOption
                name={strings.leaveFeedback}
                iconName="feedback"
                onSelected={() => onOptionSelected(ProfileOpt.feedback)} />
            {/* <ProfileOption
                name={strings.supportProject}
                iconName="support"
                onSelected={() => onOptionSelected(ProfileOpt.supportProject)} /> */}
            <ProfileOption
                name={strings.faq}
                iconName="question-answer"
                onSelected={() => onOptionSelected(ProfileOpt.faq)}
                viewStyle={{marginTop: 20}} />
            <ProfileOption
                name={strings.advices}
                iconName="info"
                onSelected={() => onOptionSelected(ProfileOpt.advices)}/>
            {/* <ProfileOption
                name={strings.termsConditions}
                iconName="handshake"
                onSelected={() => onOptionSelected(ProfileOpt.termsConditions)} /> */}
            <ProfileOption
                name={strings.privacyPolicy}
                iconName="privacy-tip"
                onSelected={() => onOptionSelected(ProfileOpt.privacyPolicy)} />
            <ProfileOption
                name={strings.clearCache}
                iconName="cleaning-services"
                showArrow={false}
                onSelected={() => onOptionSelected(ProfileOpt.cleanCache)}
                viewStyle={{
                    marginTop: 40
                }}
                textStyle={{
                    color: appColors.alertDanger
                }}/>
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

function clearCache() {
    ActionSheetIOS.showActionSheetWithOptions({
        title: "Усі дані, що зберегаються локально буде видалено",
        options: [strings.cancel, strings.clearCache],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark',
    }, async (buttonIndex: number) => {
        if(buttonIndex == 0)
            return;

        let secureStorage = iocContainer.get<ISecureStorage>(TYPES.SecureStorage);
        let dbConnection = iocContainer.get<DbConnection>(TYPES.DbConnection);
        await Promise.all([
            Image.clearDiskCache(),
            secureStorage.clear(),
            dbConnection.dropData()
        ]);
        await secureStorage.verifyCacheLastSyncs();
    });
}