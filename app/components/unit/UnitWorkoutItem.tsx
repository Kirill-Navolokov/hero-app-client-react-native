import appColors from "@/assets/colors";
import { strings } from "@/assets/strings";
import { labelStyles } from "@/assets/styles";
import { Workout } from "@/models/Workout";
import { NavigationProp } from "@react-navigation/native";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

export default function unitWorkoutListItem(
    workout: Workout,
    navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'>
): React.JSX.Element {
    let workoutName = workout.name != undefined
        ? workout.name + " - " + workout.date.toLocaleDateString(strings.locale)
        : workout.date.toLocaleDateString(strings.locale);
    return (
        <TouchableHighlight
            underlayColor={appColors.cardBackground}
            style={styles.clickableView}
            onPress={() => {
                navigation.navigate(
                    'components/unit/UnitWorkoutDetails', {
                        title: workoutName,
                        description: workout.description
                    }
                )
            }}>
            <Text style={labelStyles.body}>{workoutName}</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    clickableView: {
        padding: 10,
    }
})