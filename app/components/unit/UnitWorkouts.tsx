import appColors from "@/assets/colors";
import { strings } from "@/assets/strings";
import { labelStyles } from "@/assets/styles";
import { iocContainer } from "@/ioc/inversify.config";
import { TYPES } from "@/ioc/TypesRegistrations";
import { Unit } from "@/models/Unit";
import { Workout } from "@/models/Workout";
import { IUnitsService } from "@/services/Units/IUnitsService";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, ActivityIndicator, RefreshControl } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";

export default function UnitWorkouts({unit}:{unit: Unit}): React.JSX.Element {
    var unitsService = iocContainer.get<IUnitsService>(TYPES.UnitsService);

    const [workouts, setWorkouts] = useState(Array<Workout>)
    const [isInitialLoading, setIsInitialLoading] = useState(false);
    const [isInitialyLoaded, setIsInitialLoaded] = useState(false);
    const [isRefresing, setIsRefreshing] = useState(false);

    const fetchUnitWorkouts = () => {
        if(isInitialyLoaded)
            setIsRefreshing(true);
        else
            setIsInitialLoading(true);

        unitsService.getUnitWorkouts(unit.id)
            .then(workouts => setWorkouts(workouts))
            .finally(() => {
                if(isInitialyLoaded)
                    setIsRefreshing(false);
                else {
                    setIsInitialLoaded(true);
                    setIsInitialLoading(false);
                }
            });
    };

    useEffect(fetchUnitWorkouts, []);

    return (
        <Tabs.FlatList
            data={workouts}
            refreshControl={<RefreshControl
                progressViewOffset={10}
                refreshing={isRefresing}
                onRefresh={fetchUnitWorkouts}
                tintColor={appColors.white}/>
            }
            ListEmptyComponent={EmptyTrainingsList(isInitialLoading)}
            renderItem={(item) => {
                return item.item.name != undefined
                    ? <Text>{item.item.name}</Text>
                    : <Text>{item.item.date.toLocaleDateString(strings.locale)}</Text>
            }}/>
    )
}

function EmptyTrainingsList(isLoading: boolean): React.JSX.Element {
    return (
        isLoading
        ? <View style={{marginTop:60}}>
            <ActivityIndicator size={"large"} color={appColors.blue}/>
            <ActivityIndicator size={"large"} color={appColors.yellow}/>
        </View>
        : <View
            style={styles.emptyListContainer}>
            <Image
                tintColor={appColors.textPrimary}
                source={require('../../../assets/images/weightlifting.png')}/>
            <Text style={[labelStyles.caption, {marginTop: 10}]}>Очікуємо перше тренування</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    emptyListContainer: {
        alignItems:"center",
        marginVertical: 60,
        marginHorizontal: 60
    }
})