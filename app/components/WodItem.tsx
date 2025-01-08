import appColors from "@/assets/colors";
import { Wod } from "@/models/Wod";
import { Image, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { WodsNavigationProp } from "@/navigation-types/WodsStackNavigationParams";
import { dateFormatOptions } from "@/utils/DateFormatOptions";

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
            underlayColor={appColors.darkGray}
            style={styles.clickableView}>
                <View style={styles.container}>
                <Image source={{uri: wod.imageUrl}} style={styles.image}/>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{wod.name}</Text>
                    <Text style={styles.wodDate}>
                        {wod.wodDate.toLocaleDateString("uk-UA", dateFormatOptions)}
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    clickableView: {
        backgroundColor: appColors.secondary,
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 15,
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
        marginLeft: 10,
        height: 80
    },
    title: {
        color: appColors.white,
        fontSize: 24,
        fontWeight: "bold",
    },
    wodDate: {
        marginTop: 10,
        color: appColors.white,
        fontSize: 18,
        fontWeight: "500"
    }
})