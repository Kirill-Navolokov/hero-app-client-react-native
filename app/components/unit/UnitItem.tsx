import appColors from "@/assets/colors";
import { labelStyles } from "@/assets/styles";
import { Unit } from "@/models/Unit";
import { UnitsNavigationProp } from "@/navigation-types/UnitsStackNavigationParams";
import { Image, StyleSheet, Text, TouchableHighlight, View } from "react-native";

export function UnitListItem(
    unit: Unit,
    navigation: UnitsNavigationProp
) {
    const onUnitSelected = () => {
        navigation.navigate("UnitDetailsScreen", {
            unit: unit,
            title: unit.name
        })
    }

    return (
        <TouchableHighlight
            onPress={onUnitSelected}
            underlayColor={appColors.cardBackground}
            style={styles.clickableView}>
            <View style={styles.container}>
                <Image source={{uri: unit.imageUrl}} style={styles.image}/>
                <View style={styles.infoContainer}>
                    <Text style={labelStyles.title}>{unit.name}</Text>
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