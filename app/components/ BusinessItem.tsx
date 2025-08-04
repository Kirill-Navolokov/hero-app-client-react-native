import { BusinessDto } from "@/api/dtos/BusinessDto";
import appColors from "@/assets/colors";
import { StyleSheet, Text, View } from "react-native";
import FallbackImage from "./FallbackImage";
import { labelStyles } from "@/assets/styles";

export default function businessItem(item: BusinessDto): React.JSX.Element {
    return (
        <View
            style={styles.container}>
            <FallbackImage
                style={styles.logo}
                defaultImageType='business'
                imageUrl={item.imageUrl} />
            <Text
                style={[labelStyles.subtitle, styles.name]}>
                    {item.name}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:"column",
        backgroundColor: appColors.cardBackground,
        margin: 5,
        borderRadius: 15
    },
    logo: {
        width:"100%",
        aspectRatio: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    name: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        textAlign: "center",
        fontWeight: "bold"
    }
})