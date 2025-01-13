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
            <ProfileOption parameter={{
                type: ProfileOpt.language,
                name: strings.language,
                onSelected: onOptionSelected
            }} />
            <ProfileOption parameter={{
                type: ProfileOpt.feedback,
                name: strings.leaveFeedback,
                onSelected: onOptionSelected
            }} />
            <ProfileOption parameter={{
                type: ProfileOpt.supportProject,
                name: strings.supportProject,
                onSelected: onOptionSelected
            }} />
            <ProfileOption parameter={{
                type: ProfileOpt.faq,
                name: strings.faq,
                onSelected: onOptionSelected
                }}
                style={{marginTop: 20}} />
            <ProfileOption parameter={{
                type: ProfileOpt.termsConditions,
                name: strings.termsConditions,
                onSelected: onOptionSelected
            }} />
            <ProfileOption parameter={{
                type: ProfileOpt.privacyPolicy,
                name: strings.privacyPolicy,
                onSelected: onOptionSelected
            }} />
        </ScrollView>
    )
}