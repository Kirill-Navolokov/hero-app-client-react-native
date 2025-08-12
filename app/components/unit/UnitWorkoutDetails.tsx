import appColors from "@/assets/colors";
import { strings } from "@/assets/strings";
import { labelStyles } from "@/assets/styles";
import { RouteProp } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Separator from "../Separator";

export default function UnitWorkoutDetails({route}:{route: RouteProp<any>}): React.JSX.Element {
    return (
        <ScrollView
            contentContainerStyle={{
                paddingBottom: useSafeAreaInsets().bottom,
            }}
            contentInset={{bottom: useSafeAreaInsets().bottom}}
            style={{
                backgroundColor:appColors.backgroundPrimary
            }}>
                <Separator/>
                <Text style={[
                    labelStyles.body,
                    styles.label]}>{route?.params?.description}</Text>
                <Text style={[
                    labelStyles.footer,
                    styles.label,
                    { textAlign: "center", marginBottom: useSafeAreaInsets().bottom }
                ]}>{strings.getSweatOrDie}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    label: {
        marginTop: 10,
        marginHorizontal: 20
    }
})