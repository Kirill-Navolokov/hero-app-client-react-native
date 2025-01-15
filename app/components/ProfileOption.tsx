import React from "react";
import { StyleProp, StyleSheet, Text, TouchableHighlight, View, ViewStyle } from "react-native";
import appColors from "@/assets/colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export function ProfileOption(
    {name, iconName, onSelected, style}:
    {name: string, iconName: string, onSelected: () => void, style?: StyleProp<ViewStyle>}
) : React.JSX.Element {
    return (
        <TouchableHighlight
            onPress={onSelected}
            underlayColor={appColors.secondary}
            style={style}>
            <View style={styles.container}>
                <View style={{flexDirection:"row", columnGap: 10}}>
                    <MaterialIcons
                        name={iconName}
                        color={appColors.white}
                        size={20} />
                    <Text style={[styles.optionName]}>{name}</Text>
                </View>
                <Ionicons 
                    name="chevron-forward"
                    size={15}
                    color={appColors.darkGray}
                    style={{alignSelf:"center"}} />
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