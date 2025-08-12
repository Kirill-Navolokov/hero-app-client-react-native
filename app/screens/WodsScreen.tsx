import appColors from "@/assets/colors";
import { iocContainer } from "@/ioc/inversify.config";
import { TYPES } from "@/ioc/TypesRegistrations";
import { IWodService } from "@/services/Wods/IWodService";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import wodListItem from "../components/WodItem";
import { WodsNavigationProp } from "@/navigation-types/WodsStackNavigationParams";
import { Wod } from "@/db/schema";
import { defaultViewStyles } from "@/assets/styles";
import SearchBar from "../components/SearchBar";
import ListLoadingEmptyStateView from "../components/ListLoadingEmptyStateView";
import { strings } from "@/assets/strings";
import Separator from "../components/Separator";

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
    const searchWodChanged = async (newSearch: string) => {
        let oldSearch = searchText;
        setSearchText(newSearch);

        if(newSearch.length < 3 && (oldSearch == undefined || oldSearch.length < 3)) {
            return;
        }
        
        let searchName = oldSearch != undefined && oldSearch.length >=3 && newSearch.length < 3
            ? ""
            : newSearch;
 
        let wods = searchName == ""
            ? await wodsService.getWods(false)
            : await wodsService.searchByName(searchName);
        setWods(wods);
    };

    useEffect(() => {
        fetchWods(false);
    }, []);

    return (
        <View
            style={[defaultViewStyles.container, {
                paddingTop: safeArea.top,
                paddingBottom: safeArea.bottom,
            }]}>
            <SearchBar
                searchText={searchText}
                onTextChanged={searchWodChanged}/>
            <FlatList
                contentContainerStyle={{
                    paddingBottom: safeArea.bottom,
                    flexGrow: 1
                }}
                style={{backgroundColor: appColors.backgroundPrimary}}
                data={wods}
                renderItem={({item}) => wodListItem(item, navigation)}
                ListEmptyComponent={
                    <ListLoadingEmptyStateView
                        isLoading={isInitialLoading}
                        emptyText={strings.oopsSomethingLost}/>
                }
                ItemSeparatorComponent={() => <Separator />}
                refreshControl={<RefreshControl
                    refreshing={isRefresing}
                    onRefresh={onRefresh}
                    tintColor={appColors.white}/>}>
            </FlatList>
        </View>
    )
}