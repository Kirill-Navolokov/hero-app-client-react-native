import { BusinessDto } from "@/api/dtos/BusinessDto";
import { iocContainer } from "@/ioc/inversify.config";
import { TYPES } from "@/ioc/TypesRegistrations";
import { BusinessesNavigationProp } from "@/navigation-types/BusinessesStackNavigationParams";
import { IBusinessesService } from "@/services/Businesses/IBusinessesService";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DropDownPicker from 'react-native-dropdown-picker';
import appColors from "@/assets/colors";
import { defaultViewStyles, labelStyles } from "@/assets/styles";
import { strings } from "@/assets/strings";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "../components/SearchBar";
import businessItem from "../components/ BusinessItem";

export function BusinessesScreen({navigation}:{navigation: BusinessesNavigationProp}) {
    const businessesService = iocContainer.get<IBusinessesService>(TYPES.BusinessesService);
    const [businesses, setBusinesses] = useState(Array<BusinessDto>);
    const [categories, setCategories] = useState(Array<{value:string, label:string}>);
    const [value, setValue] = useState(null);
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
        var oldSearch = searchText;
        setSearchText(newSearch);

        if(newSearch.length < 3 && (oldSearch == undefined || oldSearch.length < 3)) {
            return;
        }
        
        var searchName = oldSearch != undefined && oldSearch.length >=3 && newSearch.length < 3
            ? ""
            : newSearch;
        console.log(searchName);
        var businesses = searchName == ""
            ? (await businessesService.getBusinesses()).businesses
            : await businessesService.search(searchName);
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
                value={value}
                setValue={setValue}
                placeholder={strings.categories}
                items={categories}
                ArrowDownIconComponent={() => IconComponent("chevron-down")}
                ArrowUpIconComponent={() => IconComponent("chevron-up")}
                itemSeparator={true}
                listItemLabelStyle={[labelStyles.caption, {fontWeight: "bold"}]}
                TickIconComponent={() => IconComponent("checkmark-sharp")}
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
                   paddingBottom: safeArea.bottom
                }}
                style={{marginTop:10, flex: 1}}
                showsVerticalScrollIndicator={false}
                renderItem={(item) => businessItem(item.item)}
                refreshControl={<RefreshControl
                    refreshing={isRefresing}
                    onRefresh={onRefresh}
                    tintColor={appColors.white}/>
                }/>
        </View>
    )
}

function IconComponent(name:string): React.JSX.Element {
    return (<Ionicons 
        name={name}
        size={20}
        color={appColors.textPrimary} />)
}