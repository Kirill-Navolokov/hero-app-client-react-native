import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import WodDetailsScreen from './screens/WodDetailsScreen';
import { WodDetailsNavigationProp, WodDetailsRouteProp } from '@/navigation-types/WodsStackNavigationParams';
import React from 'react';
import BlurredBackButton from './components/BluredBackButton';
import ChooseLanguageScreen from './screens/ChooseLanguageScreen';
import { strings } from '@/assets/strings';
import appColors from '@/assets/colors';

const RootStack = createNativeStackNavigator();

export default function App() {
    return (
        <RootStack.Navigator
            screenOptions={{
                //animationDuration: 10
            }}>
            <RootStack.Screen
                name="Main"
                component={MainScreen}
                options={{headerShown: false}}/>
            <RootStack.Screen
                name="WodDetailsScreen"
                component={WodDetailsScreen}
                options={({navigation, route}:{navigation:WodDetailsNavigationProp, route: WodDetailsRouteProp}) => ({
                    title: null,
                    headerTransparent: true,
                    headerLeft: (props) => BlurredBackButton(navigation)
                })}/>
                <RootStack.Screen
                    name="ChooseLanguageScreen"
                    component={ChooseLanguageScreen}
                    options={{
                        title: strings.language,
                        headerStyle: {
                            backgroundColor: appColors.primary
                        },
                        headerBackVisible:true,
                        headerTintColor: appColors.white,
                        headerTitleStyle: {
                            color: appColors.white,
                        fontSize: 20,
                        fontWeight: "bold"
                        },
                        headerBackButtonDisplayMode: "minimal",
                    }}/>
        </RootStack.Navigator>
    );
}



//A76EB906-ACCD-4FE1-921E-7E7092A26825
//D25A280F-B97F-4658-92EB-FE0E5D8D1DF4
//https://sarunw.com/posts/dark-color-cheat-sheet/