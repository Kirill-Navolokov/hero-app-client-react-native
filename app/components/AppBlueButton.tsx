import appColors from "@/assets/colors";
import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

export function AppBlueButton(
    {title, onPress, containerStyle, labelStyle}:
    {title: string, onPress: () => void, containerStyle?: StyleProp<ViewStyle>, labelStyle?: StyleProp<TextStyle>}) : React.JSX.Element {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, containerStyle]}>
            <Text style={[styles.label, labelStyle]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: appColors.blue,
        borderRadius: 12,
        paddingVertical: 14
    },
    label: {
        color: appColors.textLight,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign:'center'
    }
});