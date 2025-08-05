import { BusinessDto } from "@/api/dtos/BusinessDto";
import { iocContainer } from "@/ioc/inversify.config";
import { TYPES } from "@/ioc/TypesRegistrations";
import { BusinessesNavigationProp } from "@/navigation-types/BusinessesStackNavigationParams";
import { IBusinessesService } from "@/services/Businesses/IBusinessesService";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DropDownPicker from 'react-native-dropdown-picker';
import appColors from "@/assets/colors";
import { defaultViewStyles, labelStyles } from "@/assets/styles";
import { strings } from "@/assets/strings";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "../components/SearchBar";
import businessItem from "../components/ BusinessItem";
import ListLoadingEmptyStateView from "../components/ListLoadingEmptyStateView";

export function BusinessesScreen({navigation}:{navigation: BusinessesNavigationProp}) {
    const businessesService = iocContainer.get<IBusinessesService>(TYPES.BusinessesService);
    const [businesses, setBusinesses] = useState(Array<BusinessDto>);
    const [categories, setCategories] = useState(Array<{value:string, label:string}>);
    const [selectedCategories, setSelectedCategories] = useState(Array<string>());
    const [isRefresing, setRefreshing] = useState(false);
    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState<string|undefined>(undefined);
    const [isInitialLoading, setIsInitialLoading] = useState(false);
    const [isInitialyLoaded, setIsInitialLoaded] = useState(false);
    const safeArea = useSafeAreaInsets();
    const fetchBusinesses = (forced: boolean) => {
        if(!isInitialyLoaded)
            setIsInitialLoading(true);

        businessesService.getBusinesses()
            .then(response => {
                setCategories(response.availableCategories.map(c => {
                    return {
                        value: c,
                        label: c
                    }
                }));
                setBusinesses(response.businesses);
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
        fetchBusinesses(true);
        setRefreshing(false);
    };

    const searchBusinessChanged = async (newSearch: string) => {
        let oldSearch = searchText;
        setSearchText(newSearch);

        if(newSearch.length < 3 && (oldSearch == undefined || oldSearch.length < 3)) {
            return;
        }
        
        let searchName = oldSearch != undefined && oldSearch.length >=3 && newSearch.length < 3
            ? ""
            : newSearch;

        let businesses = await businessesService.search(searchName, selectedCategories);
        setBusinesses(businesses);
    };

    const categoriesChanged = async (categories: Array<string>) => {
        let businesses = await businessesService.search(searchText == undefined ? "" : searchText, categories);
        setBusinesses(businesses);
    };

    useEffect(() => {
        fetchBusinesses(false);
    }, []);

    return (
        <View
            style={[defaultViewStyles.container, {
                paddingTop: safeArea.top,
                paddingHorizontal: 10
            }]}>
            <SearchBar
                searchText={searchText}
                onTextChanged={searchBusinessChanged}
                style={{marginHorizontal: 0}}/>
            <DropDownPicker
                multiple={true}
                mode="BADGE"
                open={open}
                setOpen={setOpen}
                value={selectedCategories}
                setValue={setSelectedCategories}
                onChangeValue={categoriesChanged}
                placeholder={strings.categories}
                items={categories}
                ArrowDownIconComponent={() => DropDownComponentIcon("chevron-down")}
                ArrowUpIconComponent={() => DropDownComponentIcon("chevron-up")}
                itemSeparator={true}
                listItemLabelStyle={[labelStyles.caption, {fontWeight: "bold"}]}
                TickIconComponent={() => DropDownComponentIcon("checkmark-sharp")}
                badgeDotColors={appColors.cardBackground}
                style={{
                    backgroundColor: appColors.cardBackground,
                    borderColor: appColors.cardBackground
                }}
                dropDownContainerStyle={{
                    backgroundColor: appColors.cardBackground
                }}
                placeholderStyle={[labelStyles.caption, {fontWeight: "bold"}]} />
            <FlatList
                data={businesses}
                numColumns={2}
                contentContainerStyle={{
                   paddingBottom: safeArea.bottom,
                   flexGrow: 1
                }}
                style={{marginTop:10, flex: 1}}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <ListLoadingEmptyStateView
                        isLoading={isInitialLoading}
                        emptyText={strings.oopsSomethingLost}/>
                }
                renderItem={(item) => businessItem(item.item)}
                refreshControl={<RefreshControl
                    refreshing={isRefresing}
                    onRefresh={onRefresh}
                    tintColor={appColors.white}/>
                }/>
        </View>
    )
}

function DropDownComponentIcon(name:string): React.JSX.Element {
    return (
        <Ionicons 
            name={name}
            size={20}
            color={appColors.textPrimary} />
    )
}