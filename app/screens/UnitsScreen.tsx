import { iocContainer } from "@/ioc/inversify.config";
import { TYPES } from "@/ioc/TypesRegistrations";
import { UnitsNavigationProp } from "@/navigation-types/UnitsStackNavigationParams";
import { IUnitsService } from "@/services/Units/IUnitsService";
import { useEffect, useRef, useState } from "react";
import { RefreshControl, StyleSheet, Text, View, SectionList, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import appColors from "@/assets/colors";
import { UnitListItem } from "../components/unit/UnitItem";
import { Unit } from "@/db/schema";
import { defaultViewStyles, labelStyles } from "@/assets/styles";
import { SectionData } from "@/utils/SectionData";

export function UnitsScreen({navigation}:{navigation: UnitsNavigationProp}) {
    const unitsService = iocContainer.get<IUnitsService>(TYPES.UnitsService);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [units, setUnits] = useState<SectionData<Unit>[]>([])
    const [communities, setCommunities] = useState<SectionData<Unit>[]>([])
    const [isRefresing, setRefreshing] = useState(false);
    const ALPHABET = 'АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЮЯ'.split('');
    const alphabaetSet = new Set<string>(ALPHABET);
    const restSection = "#";
    const safeArea = useSafeAreaInsets();
    const sectionListRef = useRef<SectionList>(null);

    const fetchUnits = (forced: boolean) => {
        unitsService.getUnits(forced)
            .then(result => {
                var groupedUnits = getGroupedUnits(
                    result[0], alphabaetSet, restSection);
                var groupedCommunities = getGroupedUnits(
                    result[1], alphabaetSet, restSection);
                var sortedSections = getSortedGroupedSections(
                    groupedUnits, groupedCommunities, alphabaetSet, restSection);

                setUnits(sortedSections[0]);
                setCommunities(sortedSections[1]);
            });
    };
    
    const scrollToSection = (letter: string) => {
        const index = units.findIndex(s => s.title === letter);
        if (index !== -1 && sectionListRef.current)
            sectionListRef.current.scrollToLocation({
                sectionIndex: index,
                itemIndex: 1,
                animated: false});
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchUnits(true);
        setRefreshing(false);
    };

    useEffect(() => {
        fetchUnits(false);
    }, [])

    return (
        <View
            style={[defaultViewStyles.container, {
                paddingTop: safeArea.top
            }]}>
            <SegmentedControl
                values={['Підрозділи','Спільноти']}
                selectedIndex={selectedIndex}
                activeFontStyle={styles.activeSegmentTitle}
                fontStyle={styles.inactiveSegmentTitle}
                onChange={(event) => {
                    setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
                }}
                style={{
                    marginHorizontal: 10
                }}/>
            <View
                style={{ flex: 1, flexDirection: 'row' }}>
                <SectionList
                    ref={sectionListRef}
                    sections={selectedIndex == 0 ? units : communities}
                    keyExtractor={(item:Unit, index:number) => item.name + index}
                    renderItem={({item}) => UnitListItem(item, navigation)}
                    refreshControl={<RefreshControl
                        refreshing={isRefresing}
                        onRefresh={onRefresh}
                        tintColor={appColors.white}/>}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={styles.header}>
                            <Text style={[labelStyles.caption, {fontWeight:"bold"}]}>{title}</Text>
                        </View>
                    )}
                    indicatorStyle="white"
                    style={{marginTop: 20}}
                    stickySectionHeadersEnabled/>
                <View style={styles.indexContainer}>
                {
                    ALPHABET.concat(restSection).map(letter => (
                        <TouchableOpacity key={letter} onPress={() => scrollToSection(letter)}>
                            <Text style={styles.indexLetter}>{letter}</Text>
                        </TouchableOpacity>
                ))}
                </View>
            </View>
        </View>
    )
}

function getGroupedUnits(
    units: Unit[],
    alphabaetSet: Set<string>,
    restSection: string
): Record<string, Unit[]> {
    var groupedUnits = units.reduce<Record<string, Unit[]>>((acc, item) => {
        const letter = item.name[0].toUpperCase();
        var groupHeader = alphabaetSet.has(letter) ? letter : restSection;
        if (!acc[groupHeader]) 
            acc[groupHeader] = [];
            acc[groupHeader].push(item);
                    
        return acc;
    }, {});

    return groupedUnits;
}

function getSortedGroupedSections(
    groupedUnits: Record<string, Unit[]>,
    groupedCommunities: Record<string, Unit[]>,
    alphabaetSet: Set<string>,
    restSection: string
): [Array<SectionData<Unit>>, Array<SectionData<Unit>>] {
    var sortedUnitsSections = Array<SectionData<Unit>>();
    var sortedCommunitiesSections = Array<SectionData<Unit>>();
    for(var c of alphabaetSet) {
        if(groupedUnits[c])
            sortedUnitsSections.push({
                title: c,
                data: groupedUnits[c]
            })
        if(groupedCommunities[c])
            sortedCommunitiesSections.push({
                title: c,
                data: groupedCommunities[c]
            })
    }
    if(groupedUnits[restSection])
        sortedUnitsSections.push({
            title: restSection,
            data: groupedUnits[restSection]
        })
    if(groupedCommunities[restSection])
        sortedCommunitiesSections.push({
            title: restSection,
            data: groupedCommunities[restSection]
    });

    return [sortedUnitsSections, sortedCommunitiesSections];
}

const styles = StyleSheet.create({
    activeSegmentTitle: {
        color: appColors.black,
        fontSize: 16
    },
    inactiveSegmentTitle: {
        color: appColors.textSecondary,
        fontSize: 16
    },
    header: {
        backgroundColor: appColors.backgroundPrimary,
        borderBottomWidth: 1,
        borderBottomColor: appColors.cardBackground,
        paddingVertical: 4,
        paddingHorizontal: 10,
        marginRight: 20
    },
    headerText: {
        fontWeight: 'bold',
        color: appColors.textPrimary,
        fontSize: 16,
    },
    indexContainer: {
        position: 'absolute',
        right: 4,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        paddingVertical: 10
    },
    indexLetter: {
        fontSize: 12,
        paddingVertical: 2,
        fontWeight: "bold",
        color: appColors.textPrimary,
        textAlign: 'center',
        width: 20
    }
})