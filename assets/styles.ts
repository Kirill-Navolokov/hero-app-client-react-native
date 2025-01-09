import { StyleSheet } from "react-native";
import appColors from "./colors";

export const labelStyles = StyleSheet.create({
    title: {
        color: appColors.white,
        fontSize: 24,
        fontWeight: "bold",
    },
    subtitle: {
        color: appColors.lightGray,
        fontSize: 20,
        fontWeight: "500",
    },
    regular: {
        color: appColors.lightGray,
        fontSize: 18,
        fontWeight: "500",
    },
    body: {
        color: appColors.lightGray,
        fontSize: 16,
        fontWeight:"500",
        lineHeight: 20.5
    }
})