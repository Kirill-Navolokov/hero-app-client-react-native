import appColors from "@/assets/colors";
import { WodDetailsNavigationProp } from "@/navigation-types/WodsStackNavigationParams";
import { HeaderBackButton } from "@react-navigation/elements";
import { NavigationProp } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { Platform } from "react-native";

const ICON_SIZE = Platform.OS === 'ios' ? 21 : 24;

export default function BlurredBackButton(navigation:NavigationProp<any>) {
    return (
        <BlurView
            onTouchStart={() => null}
            tint="dark" 
            intensity={70} 
            style={{
                overflow:"hidden",
                borderRadius: ICON_SIZE
            }}>
            <HeaderBackButton
                tintColor={appColors.white}
                onPress={navigation.goBack}/>
        </BlurView>
    )
}