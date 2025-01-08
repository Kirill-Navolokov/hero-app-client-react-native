import WodsScreen from "./WodsScreen";
import ProfileScreen from "./ProfileScreen";
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import appColors from "@/assets/colors";
import { Image } from "react-native";
import { tabImages } from "@/assets/images";

const Tab = createBottomTabNavigator();

export default function MainScreen() : React.JSX.Element {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarInactiveTintColor: appColors.lightGray,
                tabBarActiveTintColor: appColors.white,
                tabBarShowLabel: false,
                tabBarIconStyle: {
                    marginTop:5
                },
                tabBarStyle: {
                    backgroundColor:appColors.darkGray
                },
                tabBarIcon: ({focused, color, size}) => {
                    return <Image 
                        source={tabImages[route.name]}
                        style={{width: size, height: size}}
                        tintColor={color}/>
                }
            })}>
            <Tab.Screen name="tab_shield" component={WodsScreen} options={{
                headerShown: false
            }}/>
            <Tab.Screen name="tab_profile" component={ProfileScreen}/>
        </Tab.Navigator>
    );
}