import { StyleSheet } from "react-native";
import appColors from "./colors";

export const labelStyles = StyleSheet.create({
    header: {
        color: appColors.textPrimary,
        fontSize: 24,
        fontWeight: "bold",
    },
    title: {
        color: appColors.textPrimary,
        fontSize: 24,
        fontWeight: "bold",
    },
    subtitle: {
        color: appColors.textPrimary,
        fontSize: 20,
        fontWeight: "500",
    },
    regular: {
        color: appColors.textPrimary,
        fontSize: 18,
        fontWeight: "500",
    },
    body: {
        color: appColors.textSecondary,
        fontSize: 16,
        fontWeight:"500",
        lineHeight: 20.5
    }
})