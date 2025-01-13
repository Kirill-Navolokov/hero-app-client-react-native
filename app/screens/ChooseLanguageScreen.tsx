import appColors from "@/assets/colors";
import { labelStyles } from "@/assets/styles";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Separator } from "../components/Separator";
import { Ionicons } from "@expo/vector-icons";

export default function ChooseLanguageScreen() : React.JSX.Element {
    return (
        <ScrollView
            style={styles.container}>
            <TouchableHighlight
                onPress={() => {}}
                underlayColor={appColors.secondary}
                style={styles.clickableView}>
                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <View style={styles.optionContainer}>
                    <Ionicons
                        name="rocket-outline"
                        size={24} 
                        color={appColors.lightGray}
                        />
                    <Text style={[
                        labelStyles.regular,
                        {
                            color: appColors.white,
                            fontWeight: "bold"
                        }]}>
                            Українська
                        </Text>
                </View>
                <Ionicons
                    name="checkmark-sharp"
                    size={20}
                    color={appColors.white}/>
                </View>
            </TouchableHighlight>
            <Separator/>
            <TouchableHighlight
                onPress={() => {}}
                underlayColor={appColors.secondary}
                style={styles.clickableView}>
                <View style={styles.optionContainer}>
                    <Image
                        tintColor={appColors.lightGray} 
                        source={require("../../assets/images/vomit.png")}/>
                    <Text style={labelStyles.regular}>російська</Text>
                </View>
            </TouchableHighlight>
            <Separator/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: appColors.primary,
        paddingTop: 20,
    },
    clickableView: {
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    optionContainer: {
        flexDirection:"row",
        columnGap: 15,
        alignItems:"center"
    }

})