import appColors from "@/assets/colors";
import { Wod } from "@/models/Wod";
import { Image, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { WodsNavigationProp } from "@/navigation-types/WodsStackNavigationParams";
import { dateFormatOptions } from "@/utils/DateFormatOptions";
import { labelStyles } from "@/assets/styles";
import { strings } from "@/assets/strings";

export default function wodListItem(
    wod: Wod,
    navigation: WodsNavigationProp
) {
    const onWodSelected = () => {
        navigation.navigate("WodDetailsScreen", {
            wod: wod,
            title: wod.name
        })
    }

    return (
        <TouchableHighlight
            onPress={onWodSelected}
            underlayColor={appColors.cardBackground}
            style={styles.clickableView}>
                <View style={styles.container}>
                <Image source={{uri: wod.imageUrl}} style={styles.image}/>
                <View style={styles.infoContainer}>
                    <Text style={labelStyles.title}>{wod.name}</Text>
                    <Text style={[labelStyles.subtitle, {marginTop: 5}]}>
                        {wod.wodDate.toLocaleDateString(strings.locale, dateFormatOptions)}
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    clickableView: {
        padding: 10,
    },
    container: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center"
    },
    image: {
        height: 80,
        width: 80,
        borderRadius: 40
    },
    infoContainer: {
        flex:1,
        justifyContent: "center",
        marginLeft: 10,
    }
})