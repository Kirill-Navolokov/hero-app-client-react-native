import { BusinessDto } from "@/api/dtos/BusinessDto";
import appColors from "@/assets/colors";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import FallbackImage from "./FallbackImage";
import { labelStyles } from "@/assets/styles";
import { openUrlModally } from "@/utils/helperFunctions";

export default function businessItem(item: BusinessDto): React.JSX.Element {
    return (
        <TouchableHighlight
            onPress={async () => await openUrlModally(item.link)}
            underlayColor={appColors.backgroundPrimary}
            style={styles.container}>
            <View>
                <FallbackImage
                    style={styles.logo}
                    defaultImageType='business'
                    imageUrl={item.imageUrl} />
                <Text
                    style={[labelStyles.subtitle, styles.name]}>
                        {item.name}
                </Text>
            </View>
        </TouchableHighlight>
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