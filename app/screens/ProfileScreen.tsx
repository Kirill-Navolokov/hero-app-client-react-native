import appColors from "@/assets/colors";
import { ScrollView } from "react-native";
import { ProfileOption } from "../components/ProfileOption";
import { strings } from "@/assets/strings";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() : React.JSX.Element {
    var safeArea = useSafeAreaInsets();
    return (
        <ScrollView
            contentContainerStyle={{
                paddingTop: 20,
                paddingBottom: safeArea.bottom,
            }}
            style={{
                backgroundColor: appColors.primary,
            }}>
            <ProfileOption name={strings.language} />
            <ProfileOption name={strings.leaveFeedback} />
            <ProfileOption name={strings.supportProject} />
            <ProfileOption name={strings.faq} style={{marginTop: 20}} />
            <ProfileOption name={strings.termsConditions} />
            <ProfileOption name={strings.privacyPolicy} />
        </ScrollView>
    )
}