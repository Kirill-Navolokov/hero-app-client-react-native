import appColors from "@/assets/colors";
import { WodDetailsNavigationProp, WodDetailsRouteProp } from "@/navigation-types/WodsStackNavigationParams";
import { dateFormatOptions } from "@/utils/DateFormatOptions";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WodDetailsScreen(
    {navigation, route}:{navigation:WodDetailsNavigationProp, route: WodDetailsRouteProp}
) : React.JSX.Element {
    const wod = route.params.wod;
    var safeArea = useSafeAreaInsets();
    return (
        <ScrollView
            bounces={false}
            contentContainerStyle={{
                paddingBottom: safeArea.bottom,
            }}
            style={styles.container}>
            <Image source={{uri: wod.imageUrl}} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{wod.name}</Text>
                <View style={styles.separator} />
                <Text style={[styles.title, styles.date]}>{wod.wodDate.toLocaleDateString("uk-UA", dateFormatOptions)}</Text>
                <View style={styles.separator} />
                <Text style={[styles.title, styles.scheme]}>{wod.scheme}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={[styles.title, styles.description]} >{wod.description}</Text>
            </View>
            <Text style={styles.footer}>Потій або помри &copy;OTOY</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: appColors.primary,
    },
    image: {
        aspectRatio:1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    infoContainer: {
        margin: 10,
        backgroundColor: appColors.secondary,
        borderRadius: 20,
        padding: 20
    },
    title: {
        color: appColors.white,
        fontSize: 24,
        fontWeight: "bold",
    },
    date: {
        fontSize: 20,
        fontWeight: "500",
    },
    scheme: {
        fontSize: 18,
        marginLeft: 10,
        fontWeight: "400",
    },
    description: {
        fontSize: 16,
        fontWeight:"400"
    },
    separator: {
        backgroundColor: appColors.lightGray,
        height: 1,
        marginVertical: 10
    },
    footer: {
        color: appColors.lightGray,
        alignSelf: "center",
        marginTop: 10,
        fontSize: 14,
    }
})