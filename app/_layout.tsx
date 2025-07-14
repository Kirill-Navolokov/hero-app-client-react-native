import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import WodDetailsScreen from './screens/WodDetailsScreen';
import { WodDetailsNavigationProp, WodDetailsRouteProp } from '@/navigation-types/WodsStackNavigationParams';
import { createContext, useEffect, useMemo, useReducer, useState } from 'react';
import BlurredBackButton from './components/BluredBackButton';
import ChooseLanguageScreen from './screens/ChooseLanguageScreen';
import { strings } from '@/assets/strings';
import appColors from '@/assets/colors';
import LoginScreen from './screens/LoginScreen';
import { iocContainer } from '@/ioc/inversify.config';
import { ISecureStorage } from '@/services/ISecureStorage';
import { TYPES } from '@/ioc/TypesRegistrations';
import { secretsNames } from '@/utils/appConstants';
import { IAuthService } from '@/services/Auth/IAuthService';
import { AuthContextType } from './AuthContextType';
import SplashScreen from './screens/SplashScreen';
import UnitDetailsScreen from './screens/UnitDetailsScreen';
import { UnitDetailsNavigationProp, UnitDetailsRouteProp } from '@/navigation-types/UnitsStackNavigationParams';
import { Button, StyleSheet, View } from 'react-native';
import { labelStyles } from '@/assets/styles';
import UnitWorkoutDetails from './components/unit/UnitWorkoutDetails';
import { CacheLastSyncs } from '@/utils/cacheExpirations';

import { Suspense } from 'react';
import { ActivityIndicator } from 'react-native';
import { SQLiteProvider, openDatabaseSync } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '@/drizzle/migrations';
import * as schema from '@/db/schema';
import { DbConnection } from '@/db/DbConnection';

const RootStack = createNativeStackNavigator();
export const AuthContext = createContext<AuthContextType | null>(null);

export default function App() {
    const [state, dispatch] = useReducer(
        (prevState: any, action: any) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                return {
                    ...prevState,
                    isLoggedIn: action.loggedIn,
                    isLoading: false,
                };
                case 'SIGN_IN':
                return {
                    ...prevState,
                    isSignout: false,
                    isLoggedIn: action.loggedIn,
                };
                case 'SIGN_OUT':
                return {
                    ...prevState,
                    isSignout: true,
                    isLoggedIn: false,
                };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            isLoggedIn: false,
        });
    var authService = iocContainer.get<IAuthService>(TYPES.AuthService);

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            var isTokensValid = await authService.verifyTokens();
            var secureStorage = iocContainer.get<ISecureStorage>(TYPES.SecureStorage);

            await secureStorage.verifyCacheLastSyncs();

            // After restoring token, we may need to validate it in production apps
            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: 'RESTORE_TOKEN', loggedIn: isTokensValid });
        };

        bootstrapAsync();
    }, []);
    

    const authContext = useMemo(
        () => ({
            googleSignIn: async () => {
                
                var isSignedId = await authService.googleSignIn();

                if(isSignedId)
                    dispatch({ type: 'SIGN_IN', loggedIn: true });
            },
            signIn: async (email: string, password: string) => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
                // In the example, we'll use a dummy token

                await authService.signIn(email, password);
                dispatch({ type: 'SIGN_IN', loggedIn: true });
            },
            signOut: async () => {
                await authService.logout();
                dispatch({ type: 'SIGN_OUT', loggedIn: false });
            },
            signUp: async (data:any) => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
                // In the example, we'll use a dummy token
                dispatch({ type: 'SIGN_IN', loggedIn: true });
            },
        }),
        []);

    const expoDb = openDatabaseSync("hero_book");
    const db = drizzle(expoDb);
    const { success, error } = useMigrations(db, migrations);
    var dbConnection = iocContainer.get<DbConnection>(TYPES.DbConnection);
    dbConnection.init(db);

    return (
        <AuthContext.Provider value={authContext}>
            <SQLiteProvider
                databaseName='hero_book'>
            <RootStack.Navigator
                screenOptions={{
                    //animationDuration: 10
                }}>
                {state.isLoading
                    ? (<RootStack.Screen
                        name='Splash'
                        component={SplashScreen}
                        options={{headerShown: false}}/>)
                    : (state.isLoggedIn ? MainScreens() : AuthScreens())}
            </RootStack.Navigator>
            </SQLiteProvider>
        </AuthContext.Provider>
    )
}

function AuthScreens() {
    return (
        <>
            <RootStack.Screen
                name='Login'
                component={LoginScreen}
                options={{headerShown: false}}/>
        </>
    )
}

function MainScreens() {
    return (
        <>
            <RootStack.Screen
                name='Main'
                component={MainScreen}
                options={{headerShown: false}}/>
            <RootStack.Screen
                name='WodDetailsScreen'
                component={WodDetailsScreen}
                options={({navigation, route}:{navigation:WodDetailsNavigationProp, route: WodDetailsRouteProp}) =>
                    defaultHeaderOptions(route.params.title)
                }/>
            <RootStack.Screen
                name='UnitDetailsScreen'
                component={UnitDetailsScreen}
                options={({navigation, route}:{navigation:UnitDetailsNavigationProp, route: UnitDetailsRouteProp}) =>
                    defaultHeaderOptions(route.params.title)
                }/>
            <RootStack.Screen
                name='components/unit/UnitWorkoutDetails'
                component={UnitWorkoutDetails}
                options={({navigation, route}) => ({
                    presentation:"modal",
                    title: route.params.title,
                    headerTitleStyle: {
                        color: appColors.textPrimary
                    },
                    headerStyle: {
                        backgroundColor: appColors.backgroundPrimary,
                    },
                    headerLeft: () => (
                       <Button onPress={() => {navigation.goBack();}} title={strings.close} />
                    )
                })}/>
            <RootStack.Screen
                name='ChooseLanguageScreen'
                component={ChooseLanguageScreen}
                options={{
                    title: strings.language,
                    headerStyle: {
                        backgroundColor: appColors.backgroundPrimary
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
        </>
    )
}

function defaultHeaderOptions(title?: string) {
    return {
        title: title,
        headerTitleStyle: {
            fontSize: 22
        },
        headerStyle: {
            backgroundColor: appColors.backgroundPrimary
        },
        headerTitle: labelStyles.title,
        headerTintColor: appColors.textPrimary,
        headerBackButtonDisplayMode: "minimal"
    }
}

//A76EB906-ACCD-4FE1-921E-7E7092A26825
//D25A280F-B97F-4658-92EB-FE0E5D8D1DF4
//https://sarunw.com/posts/dark-color-cheat-sheet/
//npx expo start --ios