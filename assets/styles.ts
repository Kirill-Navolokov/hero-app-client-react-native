import { StyleSheet } from "react-native";
import appColors from "./colors";

export const labelStyles = StyleSheet.create({
    header: {
        color: appColors.textPrimary,
        fontSize: 28,
        fontWeight: "bold",
    },
    title: {
        color: appColors.textPrimary,
        fontSize: 24,
        fontWeight: "bold",
    },
    subtitle: {
        color: appColors.textPrimary,
        fontSize: 22,
        fontWeight:"500",
    },
    body: {
        color: appColors.textPrimary,
        fontSize: 18,
        lineHeight: 30
    },
    caption: {
        color: appColors.textPrimary,
        fontSize: 16,
        lineHeight: 25
    },
    footer: {
        color: appColors.textSecondary,
        fontSize: 14,
    }
})