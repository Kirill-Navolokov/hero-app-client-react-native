import appColors from "@/assets/colors";
import { iocContainer } from "@/ioc/inversify.config";
import { TYPES } from "@/ioc/TypesRegistrations";
import { IWodService } from "@/services/Wods/IWodService";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import wodListItem from "../components/WodItem";
import { WodsNavigationProp } from "@/navigation-types/WodsStackNavigationParams";
import { Separator } from "../components/Separator";
import { Wod } from "@/db/schema";
import { labelStyles } from "@/assets/styles";
import SearchBar from "../components/SearchBar";

export default function WodsScreen ({navigation}:{navigation: WodsNavigationProp}) {
    const wodsService = iocContainer.get<IWodService>(TYPES.WodService);
    const [wods, setWods] = useState(Array<Wod>);
    const [isRefresing, setRefreshing] = useState(false);
    const [searchText, setSearchText] = useState<string|undefined>(undefined);
    const [isInitialLoading, setIsInitialLoading] = useState(false);
    const [isInitialyLoaded, setIsInitialLoaded] = useState(false);
    const safeArea = useSafeAreaInsets();
    const fetchWods = (forced: boolean) => {
        if(!isInitialyLoaded)
            setIsInitialLoading(true);

        wodsService.getWods(forced)
            .then(wods => setWods(wods))
            .finally(() => {
                if(!isInitialyLoaded) {
                    setIsInitialLoaded(true);
                    setIsInitialLoading(false);
                }
            });
    }

    const onRefresh = () => {
        setRefreshing(true);
        fetchWods(true);
        setRefreshing(false);
    };

    useEffect(() => {
        fetchWods(false);
    }, []);

    const searchWodChanged = async (newSearch: string) => {
        var oldSearch = searchText;
        setSearchText(newSearch);

        if(newSearch.length < 3 && (oldSearch == undefined || oldSearch.length < 3)) {
            return;
        }
        
        var searchName = oldSearch != undefined && oldSearch.length >=3 && newSearch.length < 3
            ? ""
            : newSearch;
 
        var wods = searchName == ""
            ? await wodsService.getWods(false)
            : await wodsService.searchByName(searchName);
        setWods(wods);
    };

    return (
        <View
            style={[styles.container, {
                paddingTop: safeArea.top,
                paddingBottom: safeArea.bottom,
            }]}>
            <SearchBar
                searchText={searchText}
                onTextChanged={searchWodChanged}/>
            <FlatList
                contentContainerStyle={{
                    paddingBottom: safeArea.bottom
                }}
                style={{backgroundColor: appColors.backgroundPrimary}}
                data={wods}
                renderItem={({item}) => wodListItem(item, navigation)}
                ListEmptyComponent={EmptyListView(isInitialLoading, "Упс, схоже, щось загубилось...")}
                ItemSeparatorComponent={() => <Separator />}
                refreshControl={<RefreshControl
                    progressViewOffset={safeArea.top}
                    refreshing={isRefresing}
                    onRefresh={onRefresh}
                    tintColor={appColors.white}/>}>
            </FlatList>
        </View>
    )
}

function EmptyListView(isLoading: boolean, emptyText: string): React.JSX.Element {
    return (
         isLoading
        ? <View 
            style={styles.emptyListContainer}>
            <ActivityIndicator size={"large"} color={appColors.blue}/>
            <ActivityIndicator size={"large"} color={appColors.yellow}/>
        </View>
        : <View
            style={styles.emptyListContainer}>
            <Image
                tintColor={appColors.textPrimary}
                source={require('../../assets/images/weightlifting.png')}/>
            <Text style={[labelStyles.caption, {marginTop: 10}]}>{emptyText}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flexGrow: 1,
        backgroundColor: appColors.backgroundPrimary
    },
    emptyListContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})