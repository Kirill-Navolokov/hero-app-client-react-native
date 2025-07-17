import appColors from "@/assets/colors";
import { ActivityIndicator, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

export default function LoadingIndicator(
    {containerStyle}:{containerStyle?: StyleProp<ViewStyle>}): React.JSX.Element {
    return (
        <View style={containerStyle ?? styles.fullScreenContainer}>
            <ActivityIndicator size={"large"} color={appColors.blue}/>
            <ActivityIndicator size={"large"} color={appColors.yellow}/>
        </View>
    );
}

const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})