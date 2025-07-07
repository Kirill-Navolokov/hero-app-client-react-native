import appColors from "@/assets/colors";
import { iocContainer } from "@/ioc/inversify.config";
import { TYPES } from "@/ioc/TypesRegistrations";
import { IWodService } from "@/services/Wods/IWodService";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import wodListItem from "../components/WodItem";
import { WodsNavigationProp } from "@/navigation-types/WodsStackNavigationParams";
import { Separator } from "../components/Separator";
import { AuthContext } from "../_layout";
import { AxiosError } from "axios";
import { Wod } from "@/db/schema";
import { strings } from "@/assets/strings";
import { labelStyles } from "@/assets/styles";
import SearchBar from "../components/SearchBar";

export default function WodsScreen ({navigation}:{navigation: WodsNavigationProp}) {
    const wodsService = iocContainer.get<IWodService>(TYPES.WodService);
    const [wods, setWods] = useState(Array<Wod>);
    const [isRefresing, setRefreshing] = useState(false);
    const [searchText, setSearchText] = useState<string|undefined>(undefined);
    const [isInitialLoading, setIsInitialLoading] = useState(false);
    const [isInitialyLoaded, setIsInitialLoaded] = useState(false);
    const {signOut} = useContext(AuthContext)!;
    const fetchWods = () => {
        if(!isInitialyLoaded)
            setIsInitialLoading(true);

        wodsService.getWods()
            .then(wods => setWods(wods))
            .catch(error => {
                if(error instanceof AxiosError && error.status == 401)
                    signOut();
            })
            .finally(() => {
                if(!isInitialyLoaded) {
                    setIsInitialLoaded(true);
                    setIsInitialLoading(false);
                }
            });
    }

    const onRefresh = () => {
        setRefreshing(true);
        fetchWods();
        setRefreshing(false);
    };

    useEffect(() => {
        fetchWods();
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
 
        var wods = await wodsService.searchByName(searchName);
        setWods(wods);
    };

    var safeArea = useSafeAreaInsets();

    return (
        <FlatList
            contentContainerStyle={{
                paddingTop: safeArea.top,
                paddingBottom: safeArea.bottom,
                flexGrow:1
            }}
            style={{backgroundColor: appColors.backgroundPrimary}}
            data={wods}
            renderItem={({item}) => wodListItem(item, navigation)}
            ListHeaderComponent={<SearchBar
                searchText={searchText}
                onTextChanged={searchWodChanged}/>
            }
            ListEmptyComponent={EmptyListView(isInitialLoading, "Упс, схоже, щось загубилось...")}
            ItemSeparatorComponent={() => <Separator />}
            refreshControl={<RefreshControl
                progressViewOffset={safeArea.top}
                refreshing={isRefresing}
                onRefresh={onRefresh}
                tintColor={appColors.white}/>}>
        </FlatList>
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
    emptyListContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})