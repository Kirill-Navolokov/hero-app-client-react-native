import WodsScreen from "./WodsScreen";
import ProfileScreen from "./ProfileScreen";
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import appColors from "@/assets/colors";
import { Image } from "react-native";
import { tabImages } from "@/assets/images";
import { useNavigation } from "expo-router";

const Tab = createBottomTabNavigator();

export default function MainScreen() : React.JSX.Element {
    const navigation = useNavigation();
    return (
        <Tab.Navigator
            safeAreaInsets={{bottom:0}}
            screenOptions={({route}) => ({
                tabBarInactiveTintColor: appColors.lightGray,
                tabBarActiveTintColor: appColors.white,
                tabBarActiveBackgroundColor: appColors.darkGray,
                tabBarInactiveBackgroundColor: appColors.darkGray,
                tabBarShowLabel: false,
                tabBarIconStyle: {
                    marginTop:5
                },
                tabBarStyle: {
                    height: 83,
                },
                tabBarIcon: ({focused, color, size}) => {
                    return <Image 
                        source={tabImages[route.name]}
                        style={{width: size, height: size}}
                        tintColor={color}/>
                }
            })}>
            <Tab.Screen name="tab_shield" component={() => WodsScreen(navigation)} options={{
                headerShown: false
            }}/>
            <Tab.Screen name="tab_profile" component={ProfileScreen}/>
        </Tab.Navigator>
    );
}