import appColors from "@/assets/colors";
import { ScrollView } from "react-native";
import { ProfileOption } from "../components/ProfileOption";
import { strings } from "@/assets/strings";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProfileOpt } from "@/enums/ProfileOpt";
import { ProfileNavigationProp } from "@/navigation-types/ProfileNavigationParams";

export default function ProfileScreen(
    {navigation}:{navigation: ProfileNavigationProp}) : React.JSX.Element {
    var safeArea = useSafeAreaInsets();

    const onOptionSelected = (type: ProfileOpt) => {
        if(type == ProfileOpt.language) {
            navigation.navigate("ChooseLanguageScreen")
        }
    }

    return (
        <ScrollView
            contentContainerStyle={{
                paddingTop: 20,
                paddingBottom: safeArea.bottom,
            }}
            style={{
                backgroundColor: appColors.primary,
            }}>
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
                style={{marginTop: 20}} />
            <ProfileOption
                name={strings.termsConditions}
                iconName="handshake"
                onSelected={() => onOptionSelected(ProfileOpt.termsConditions)} />
            <ProfileOption
                name={strings.privacyPolicy}
                iconName="privacy-tip"
                onSelected={() => onOptionSelected(ProfileOpt.privacyPolicy)} />
        </ScrollView>
    )
}