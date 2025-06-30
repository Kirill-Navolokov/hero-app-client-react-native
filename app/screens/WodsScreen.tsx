import appColors from "@/assets/colors";
import { iocContainer } from "@/ioc/inversify.config";
import { TYPES } from "@/ioc/TypesRegistrations";
import { IWodService } from "@/services/Wods/IWodService";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import wodListItem from "../components/WodItem";
import { WodsNavigationProp } from "@/navigation-types/WodsStackNavigationParams";
import { Separator } from "../components/Separator";
import { AuthContext } from "../_layout";
import { AxiosError } from "axios";
import { Wod } from "@/db/schema";

export default function WodsScreen ({navigation}:{navigation: WodsNavigationProp}) {
    const wodsService = iocContainer.get<IWodService>(TYPES.WodService);
    const [wods, setWods] = useState(Array<Wod>);
    const [isRefresing, setRefreshing] = useState(false);
    const {signOut} = useContext(AuthContext)!;
    const fetchWods = () => {
        wodsService.getWods()
            .then(wods => setWods(wods))
            .catch(error => {
                if(error instanceof AxiosError && error.status == 401)
                    signOut();
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

    var safeArea = useSafeAreaInsets();

    return (
        <FlatList
            contentContainerStyle={{
                paddingTop: safeArea.top,
                paddingBottom: safeArea.bottom
            }}
            style={{backgroundColor: appColors.backgroundPrimary}}
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