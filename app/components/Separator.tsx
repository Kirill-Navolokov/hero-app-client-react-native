import appColors from "@/assets/colors";
import { View } from "react-native";

export default function Separator() : React.JSX.Element {
    return (
        <View style={{
            backgroundColor: appColors.cardBackground,
            height: 1
        }} />
    )
}