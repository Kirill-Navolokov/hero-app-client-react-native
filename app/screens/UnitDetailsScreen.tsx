import appColors from "@/assets/colors";
import { strings } from "@/assets/strings";
import { labelStyles } from "@/assets/styles";
import { UnitDetailsNavigationProp, UnitDetailsRouteProp } from "@/navigation-types/UnitsStackNavigationParams";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import UnitWorkouts from "../components/unit/UnitWorkouts";
import UnitAbout from "../components/unit/UnitAbout";
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view'
import { useNavigation } from "expo-router";
import FallbackImage from "../components/FallbackImage";

export default function UnitDetailsScreen(
    {navigation, route}:{navigation:UnitDetailsNavigationProp, route: UnitDetailsRouteProp}
) : React.JSX.Element {
    const unit = route.params.unit;
    
    const {width} = Dimensions.get("window");
    return (
        <Tabs.Container
            containerStyle={styles.container}
            renderHeader={() => (
                <View style={[styles.header]}>
                    <FallbackImage
                        imageUrl={unit.imageUrl}
                        defaultImageType='wod'
                        defaultImageStyle={{
                            tintColor: appColors.backgroundPrimary,
                            backgroundColor: appColors.white,
                        }}
                        style={{
                            width: width,
                            height: width / 2,
                        }} />
                    <View style={{margin:10}}>
                        <Text style={labelStyles.title}>{unit.name}</Text>
                        <Text style={labelStyles.caption}>Засновано: {unit.foundationDate.toLocaleDateString(strings.locale)}</Text>
                    </View>
                </View>
            )}
            renderTabBar={(props) => (
                <MaterialTabBar
                    {...props}
                    style={{backgroundColor:appColors.backgroundPrimary}}
                    indicatorStyle={{backgroundColor: appColors.blue}}
                    activeColor={appColors.textPrimary}
                    inactiveColor={appColors.textPrimary}/>
            )}>
            <Tabs.Tab name="Тренування">
                <UnitWorkouts unit={unit} navigation={useNavigation()} />
            </Tabs.Tab>
            <Tabs.Tab name="Опис">
                <Tabs.ScrollView>
                    <UnitAbout unit={unit} />
                </Tabs.ScrollView>
            </Tabs.Tab>
        </Tabs.Container>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: appColors.backgroundPrimary
    },
    header: {
        backgroundColor: appColors.backgroundPrimary,
    }
})