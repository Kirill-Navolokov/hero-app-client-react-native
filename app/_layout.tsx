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

const RootStack = createNativeStackNavigator();
export const AuthContext = createContext<AuthContextType | null>(null);

export default function App() {
    const [state, dispatch] = useReducer(
        (prevState: any, action: any) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                return {
                    ...prevState,
                    authToken: action.token,
                    isLoading: false,
                };
                case 'SIGN_IN':
                return {
                    ...prevState,
                    isSignout: false,
                    authToken: action.token,
                };
                case 'SIGN_OUT':
                return {
                    ...prevState,
                    isSignout: true,
                    authToken: null,
                };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            authToken: null,
        });

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let authToken;

            try {
                // Restore token stored in `SecureStore` or any other encrypted storage
                var secureStorage = iocContainer.get<ISecureStorage>(TYPES.SecureStorage);
                authToken = await secureStorage.getSecret(secretsNames.authToken);
            } catch (e) {
                // Restoring token failed
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: 'RESTORE_TOKEN', token: authToken });
        };

        bootstrapAsync();
    }, []);
    var authService = iocContainer.get<IAuthService>(TYPES.AuthService);

    const authContext = useMemo(
        () => ({
            googleSignIn: async () => {
                
                var isSignedId = await authService.googleSignIn();

                if(isSignedId)
                    dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
            signIn: async (email: string, password: string) => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
                // In the example, we'll use a dummy token

                console.log(email, password);
                await authService.signIn(email, password);
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
            signOut: async () => {
                await authService.logout();
                dispatch({ type: 'SIGN_OUT' });
            },
            signUp: async (data:any) => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
                // In the example, we'll use a dummy token

                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
        }),
        []);

    return (
        <AuthContext.Provider value={authContext}>
            <RootStack.Navigator
                screenOptions={{
                    //animationDuration: 10
                }}>
                {state.isLoading
                    ? (<RootStack.Screen
                        name='Splash'
                        component={SplashScreen}
                        options={{headerShown: false}}/>)
                    : (state.authToken != null ? MainScreens() : AuthScreens())}
            </RootStack.Navigator>
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
                options={({navigation, route}:{navigation:WodDetailsNavigationProp, route: WodDetailsRouteProp}) => ({
                    title: null,
                    headerTransparent: true,
                    headerLeft: (props) => BlurredBackButton(navigation)
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

//A76EB906-ACCD-4FE1-921E-7E7092A26825
//D25A280F-B97F-4658-92EB-FE0E5D8D1DF4
//https://sarunw.com/posts/dark-color-cheat-sheet/
//npx expo start --ios