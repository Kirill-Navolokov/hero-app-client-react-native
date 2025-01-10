import React from "react";
import { StyleProp, StyleSheet, Text, TouchableHighlight, View, ViewStyle } from "react-native";
import appColors from "@/assets/colors";
import { Ionicons } from "@expo/vector-icons";

export function ProfileOption(
    {name, style}:{name: string, style?: StyleProp<ViewStyle>}
) : React.JSX.Element {
    return (
        <TouchableHighlight
            onPress={() => {}}
            underlayColor={appColors.secondary}
            style={style}>
            <View style={styles.container}>
                <Text style={[styles.optionName]}>{name}</Text>
                <Ionicons 
                    name="chevron-forward"
                    size={15}
                    color={appColors.darkGray}
                    style={styles.detailsIcon}/>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        //backgroundColor: "red",
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent:"space-between"
    },
    optionName: {
        //backgroundColor:"red"
        color: appColors.white,
        fontSize: 16,
        fontWeight: "700"
    },
    detailsIcon: {
        alignSelf:"center",
        justifyContent:"center"
    }
})