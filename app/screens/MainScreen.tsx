import WodsScreen from "./WodsScreen";
import ProfileScreen from "./ProfileScreen";
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import appColors from "@/assets/colors";
import { Image } from "react-native";
import { tabImages } from "@/assets/images";
import { strings } from "@/assets/strings";
import { UnitsScreen } from "./UnitsScreen";
import { BusinessesScreen } from "./BusinessesScreen";

const Tab = createBottomTabNavigator();

export default function MainScreen() : React.JSX.Element {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarInactiveTintColor: appColors.cardBackground,
                tabBarActiveTintColor: appColors.white,
                tabBarShowLabel: false,
                tabBarIconStyle: {
                    marginTop:5
                },
                tabBarStyle: {
                    backgroundColor:appColors.backgroundPrimary,
                    borderColor: appColors.cardBackground,
                    borderTopWidth: 1
                },
                tabBarIcon: ({focused, color, size}) => {
                    size = 30;
                    return <Image 
                        source={tabImages[route.name]}
                        style={{width: size, height: size}}
                        tintColor={color}/>
                }
            })}>
            <Tab.Screen 
                name="tab_shield"
                component={WodsScreen}
                options={{
                    headerShown: false
                }}/>
            <Tab.Screen 
                name="tab_units"
                component={UnitsScreen}
                options={{
                    headerShown: false
                }}/>
            <Tab.Screen 
                name="tab_businesses"
                component={BusinessesScreen}
                options={{
                    headerShown: false
                }}/>
            <Tab.Screen 
                name="tab_profile"
                component={ProfileScreen}
                options={{
                    title: strings.profieTab,
                    headerTitleStyle: {
                        color: appColors.white,
                        fontSize: 20,
                        fontWeight: "bold"
                    },
                    headerStyle: {
                        backgroundColor: appColors.backgroundPrimary
                    }
                }}/>
        </Tab.Navigator>
    );
}