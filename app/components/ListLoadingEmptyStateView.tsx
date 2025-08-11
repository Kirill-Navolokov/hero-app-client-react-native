import appColors from "@/assets/colors"
import { labelStyles } from "@/assets/styles"
import { Image, StyleSheet, Text, View } from "react-native"
import LoadingIndicator from "./LoadingIndicator"

export default function ListLoadingEmptyStateView(
    {isLoading, emptyText} :
    {isLoading: boolean, emptyText: string}
): React.JSX.Element {
    return (
         isLoading
        ? <LoadingIndicator/>
        : <View
            style={styles.emptyListContainer}>
            <Image
                tintColor={appColors.textPrimary}
                source={require('@/assets/images/weightlifting.png')}/>
            <Text style={[labelStyles.caption, {marginTop: 10}]}>{emptyText}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    emptyListContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})