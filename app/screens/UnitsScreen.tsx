import { iocContainer } from "@/ioc/inversify.config";
import { TYPES } from "@/ioc/TypesRegistrations";
import { Unit } from "@/models/Unit";
import { UnitsNavigationProp } from "@/navigation-types/UnitsStackNavigationParams";
import { IUnitsService } from "@/services/Units/IUnitsService";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import appColors from "@/assets/colors";
import { Separator } from "../components/Separator";
import { UnitListItem } from "../components/unit/UnitItem";

export function UnitsScreen({navigation}:{navigation: UnitsNavigationProp}) {
    const unitsService = iocContainer.get<IUnitsService>(TYPES.UnitsService);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [units, setUnits] = useState(Array<Unit>);
    const [communities, setCommunities] = useState(Array<Unit>);
    const [isRefresing, setRefreshing] = useState(false);
    const fetchUnits = () => {
        unitsService.getUnits()
            .then(units => {
                setUnits(unitsService.units);
                setCommunities(unitsService.communities);
            });
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
        <View
            style={{
                paddingTop: safeArea.top,
                paddingBottom: safeArea.bottom,
                backgroundColor: appColors.backgroundPrimary,
                flex:1
            }}>
            <SegmentedControl
                values={['Підрозділи','Спільноти']}
                selectedIndex={selectedIndex}
                activeFontStyle={styles.activeSegmentTitle}
                fontStyle={styles.inactiveSegmentTitle}
                onChange={(event) => {
                    setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
                }}/>
                {
                    selectedIndex == 0
                    ? <FlatList
                        data={units}
                        renderItem={({item}) => UnitListItem(item, navigation)}
                        ItemSeparatorComponent={() => <Separator />}
                        refreshControl={<RefreshControl
                            progressViewOffset={safeArea.top}
                            refreshing={isRefresing}
                            onRefresh={onRefresh}
                            tintColor={appColors.white}/>}/>
                    : <FlatList
                        data={communities}
                        renderItem={({item}) => UnitListItem(item, navigation)}
                        ItemSeparatorComponent={() => <Separator />}
                        refreshControl={<RefreshControl
                            progressViewOffset={safeArea.top}
                            refreshing={isRefresing}
                            onRefresh={onRefresh}
                            tintColor={appColors.white}/>}/>
                    }
        </View>
    )
}

const styles = StyleSheet.create({
    activeSegmentTitle: {
        color: appColors.black,
        fontSize: 16
    },
    inactiveSegmentTitle: {
        color: appColors.textSecondary,
        fontSize: 16
    }
})