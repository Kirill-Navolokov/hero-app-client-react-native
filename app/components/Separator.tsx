import appColors from "@/assets/colors";
import { View } from "react-native";

export function Separator() : React.JSX.Element {
    return (
        <View style={{
            backgroundColor: appColors.secondary,
            height: 1
        }} />
    )
}