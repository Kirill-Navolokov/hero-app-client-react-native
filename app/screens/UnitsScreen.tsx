import { iocContainer } from "@/ioc/inversify.config";
import { TYPES } from "@/ioc/TypesRegistrations";
import { Unit } from "@/models/Unit";
import { UnitsNavigationProp } from "@/navigation-types/UnitsStackNavigationParams";
import { IUnitsService } from "@/services/Units/IUnitsService";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
//import SegmentedControl from '@react-native-segmented-control/segmented-control';

export function UnitsScreen({navigation}:{navigation: UnitsNavigationProp}) {
    const unitsService = iocContainer.get<IUnitsService>(TYPES.UnitsService);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [units, setUnits] = useState(Array<Unit>);
    const [isRefresing, setRefreshing] = useState(false);
    const fetchUnits = () => {
        unitsService.getUnits()
            .then(units => { 
                console.log(units);
                setUnits(units);});
    }

    const onRefresh = () => {
        setRefreshing(true);
        fetchUnits();
        setRefreshing(false);
    };

    useEffect(() => {
        fetchUnits();
    }, [])

    var safeArea = useSafeAreaInsets();

    return (
        <SafeAreaView>
            <View>
                {/* <SegmentedControl
                    values={['Підрозділи','Спільноти']}
                    selectedIndex={selectedIndex}
                    onChange={(event) => {
                        setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
                    }}/> */}
            </View>
        </SafeAreaView>
        // <FlatList
        //     contentContainerStyle={{
        //         paddingTop: safeArea.top,
        //         paddingBottom: safeArea.bottom
        //     }}
        //     style={{backgroundColor: appColors.backgroundPrimary}}
        //     data={wods}
        //     renderItem={({item}) => wodListItem(item, navigation)}
        //     ItemSeparatorComponent={() => <Separator />}
        //     refreshControl={<RefreshControl
        //         progressViewOffset={safeArea.top}
        //         refreshing={isRefresing}
        //         onRefresh={onRefresh}
        //         tintColor={appColors.white}/>}>
        // </FlatList>
    )
}