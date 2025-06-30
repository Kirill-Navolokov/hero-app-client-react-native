import appColors from "@/assets/colors";
import { labelStyles } from "@/assets/styles";
import { Unit } from "@/db/schema";
import { SocialNetworkType } from "@/enums/SocialNetworkType";
import { SocialNetwork } from "@/models/SocialNetwork";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Linking, Text, TouchableHighlight, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function UnitAbout({unit}:{unit: Unit}): React.JSX.Element {
    var socialNetworks: SocialNetwork[] = JSON.parse(unit.socialNetworks);
    return (
        <View
            style={{marginBottom: useSafeAreaInsets().bottom}}>
            <FlatList
                scrollEnabled={false}
                data={socialNetworks}
                horizontal={false}
                numColumns={2}
                renderItem={({item})=> SocialNetworkItem(item)}/>
            <Text style={[
                    labelStyles.caption,
                    { margin: 10 }
                ]}>{unit.description}</Text>
        </View>
    )
}

const getSocialNetworkMapping = (type: SocialNetworkType) => {
    switch(type) {
        case SocialNetworkType.website:
            return {icon: "globe-outline", name: "Сайт" };
        case SocialNetworkType.spotify:
            return {icon: "link", name: "Spotify"};
        case SocialNetworkType.instagram:
            return {icon: "logo-instagram", name: "Instagram"};
        case SocialNetworkType.appleMusic:
            return {icon: "link", name: "Apple Music"};
        case SocialNetworkType.youtube:
            return {icon: "logo-youtube", name: "YouTube"};
        default:
            return {icon: "link", name: "Посилання"};
    }
}

function SocialNetworkItem(item: SocialNetwork): React.JSX.Element {
    var mapping = getSocialNetworkMapping(item.type);
    return (
        <TouchableHighlight
            style={{
                flex:1,
                marginHorizontal:10, marginVertical:5}}
            onPress={() => {Linking.openURL(item.link)}}>
            <View style={{flex:1, flexDirection:"row", alignItems:"center"}}>
                <Ionicons
                    size={25}
                    color={appColors.textPrimary}
                    name={mapping.icon}/>
                <Text style={[labelStyles.body, {marginLeft: 10}]}>{mapping.name}</Text>
            </View>
        </TouchableHighlight>
    )
}