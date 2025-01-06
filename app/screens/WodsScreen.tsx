import appColors from "@/assets/colors";
import { iocContainer } from "@/ioc/inversify.config";
import { TYPES } from "@/ioc/TypesRegistrations";
import { Wod } from "@/models/Wod";
import { IWodService } from "@/services/Wods/IWodService";
import { useEffect, useState } from "react";
import { StyleSheet, FlatList, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import wodListItem from "../components/WodItem";
import { NavigationProp } from "@react-navigation/native";

export default function WodsScreen(
    navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'>
) : React.JSX.Element {
    const wodsService = iocContainer.get<IWodService>(TYPES.WodService);
    const [wods, setWods] = useState(Array<Wod>);
    const [isRefresing, setRefreshing] = useState(false);
    const fetchWods = () => {
        wodsService.getWods()
        .then(wods => {
            console.log(wods);
            setWods(wods);
        });
    }

    const onRefresh = () => {
        setRefreshing(true);
        fetchWods();
        setRefreshing(false);
    };

    useEffect(() => {
        fetchWods();
    }, [])

    return (
        <SafeAreaView
            style={styles.container}>
            <FlatList
                data={wods}
                renderItem={({item}) => wodListItem(item, navigation)}
                refreshControl={<RefreshControl
                    refreshing={isRefresing}
                    onRefresh={onRefresh}
                    tintColor={appColors.white}/>}>
            </FlatList>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: appColors.primary,
        flex: 1,
        paddingHorizontal: 10
    }
})