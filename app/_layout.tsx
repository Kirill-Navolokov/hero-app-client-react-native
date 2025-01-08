import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import WodDetailsScreen from './screens/WodDetailsScreen';
import { WodDetailsNavigationProp, WodDetailsRouteProp } from '@/navigation-types/WodsStackNavigationParams';
import React from 'react';
import BlurredBackButton from './components/BluredBackButton';

const RootStack = createNativeStackNavigator();

export default function App() {
    return (
        <RootStack.Navigator>
            <RootStack.Screen
                name="Main"
                component={MainScreen}
                options={{headerShown: false}}/>
            <RootStack.Screen
                name="WodDetailsScreen"
                component={WodDetailsScreen}
                options={({navigation, route}:{navigation:WodDetailsNavigationProp, route: WodDetailsRouteProp}) => ({
                    title: null,
                    headerTransparent:true,
                    headerLeft:(props) => BlurredBackButton(navigation)
                })}/>
        </RootStack.Navigator>
    );
}



//A76EB906-ACCD-4FE1-921E-7E7092A26825
//D25A280F-B97F-4658-92EB-FE0E5D8D1DF4
//https://sarunw.com/posts/dark-color-cheat-sheet/