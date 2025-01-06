import { Wod } from "@/models/Wod";
import { NavigationProp } from "@react-navigation/native";
import { View } from "react-native";

export default function WodDetailsScreen(
    wod: Wod,
    navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'>
) : React.JSX.Element {
    return (
        <View></View>
    )
}