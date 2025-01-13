import appColors from "@/assets/colors";
import { iocContainer } from "@/ioc/inversify.config";
import { TYPES } from "@/ioc/TypesRegistrations";
import { Wod } from "@/models/Wod";
import { IWodService } from "@/services/Wods/IWodService";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import wodListItem from "../components/WodItem";
import { WodsNavigationProp } from "@/navigation-types/WodsStackNavigationParams";
import { Separator } from "../components/Separator";

export default function WodsScreen ({navigation}:{navigation: WodsNavigationProp}) {
    const wodsService = iocContainer.get<IWodService>(TYPES.WodService);
    const [wods, setWods] = useState(Array<Wod>);
    const [isRefresing, setRefreshing] = useState(false);
    const fetchWods = () => {
        wodsService.getWods()
            .then(wods => setWods(wods));
    }

    const onRefresh = () => {
        setRefreshing(true);
        fetchWods();
        setRefreshing(false);
    };

    useEffect(() => {
        console.log('useEffect called')
        fetchWods();
    }, [])

    var safeArea = useSafeAreaInsets();

    return (
        <FlatList
            contentContainerStyle={{
                paddingTop: safeArea.top,
                paddingBottom: safeArea.bottom
            }}
            style={{backgroundColor: appColors.primary}}
            data={wods}
            renderItem={({item}) => wodListItem(item, navigation)}
            ItemSeparatorComponent={() => <Separator />}
            refreshControl={<RefreshControl
                progressViewOffset={safeArea.top}
                refreshing={isRefresing}
                onRefresh={onRefresh}
                tintColor={appColors.white}/>}>
        </FlatList>
    )
}