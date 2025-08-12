import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle, TouchableHighlight, View, ViewStyle } from "react-native";
import appColors from "@/assets/colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function ProfileOption(
    {name, iconName, onSelected, viewStyle, textStyle, showArrow=true}:
    {name: string, iconName: string, onSelected: () => void, viewStyle?: StyleProp<ViewStyle>, textStyle?: StyleProp<TextStyle>, showArrow: boolean}
) : React.JSX.Element {
    return (
        <TouchableHighlight
            onPress={onSelected}
            underlayColor={appColors.cardBackground}
            style={viewStyle}>
            <View style={styles.container}>
                <View style={{flexDirection:"row", columnGap: 10}}>
                    <MaterialIcons
                        name={iconName}
                        color={textStyle == undefined ? appColors.textPrimary : textStyle.color.valueOf()}
                        size={20} />
                    <Text style={[styles.optionName, textStyle]}>{name}</Text>
                </View>
                {showArrow && <Ionicons 
                    name="chevron-forward"
                    size={15}
                    color={appColors.textPrimary}
                    style={{alignSelf:"center"}} />}
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent:"space-between"
    },
    optionName: {
        color: appColors.white,
        fontSize: 16,
        fontWeight: "700"
    }
})