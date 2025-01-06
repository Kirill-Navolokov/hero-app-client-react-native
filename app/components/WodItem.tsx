import appColors from "@/assets/colors";
import { Wod } from "@/models/Wod";
import { NavigationProp } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableHighlight, View } from "react-native";

export default function wodListItem(
    wod: Wod,
    navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'>
) {
    const onWodSelected = () => {
        console.log(`Wod: ${wod.name} selected`);
        console.log(`Can go back: ${navigation.canGoBack()}`)
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
                        {wod.wodDate.toLocaleDateString(undefined, dateFormatOptions)}
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

const dateFormatOptions: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric'
};