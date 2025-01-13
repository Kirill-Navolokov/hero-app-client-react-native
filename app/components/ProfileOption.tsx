import React from "react";
import { StyleProp, StyleSheet, Text, TouchableHighlight, View, ViewStyle } from "react-native";
import appColors from "@/assets/colors";
import { Ionicons } from "@expo/vector-icons";
import { ProfileOptionParameter } from "@/navigation-types/ProfileOptionParameter";

export function ProfileOption(
    {parameter, style}:{parameter: ProfileOptionParameter, style?: StyleProp<ViewStyle>}
) : React.JSX.Element {
    return (
        <TouchableHighlight
            onPress={() => parameter.onSelected(parameter.type)}
            underlayColor={appColors.secondary}
            style={style}>
            <View style={styles.container}>
                <Text style={[styles.optionName]}>{parameter.name}</Text>
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