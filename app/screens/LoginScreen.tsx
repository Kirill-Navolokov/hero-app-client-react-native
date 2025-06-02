import appColors from "@/assets/colors";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppBlueButton } from "../components/AppBlueButton";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useEffect } from "react";

export default function LoginScreen(): React.JSX.Element {
    useEffect(() => {
        GoogleSignin.configure({
            iosClientId: '617406272995-1bu9q0osjm2269om1kbk3l96fm9u9mh6.apps.googleusercontent.com',
            scopes: ['profile', 'email']
        });
    });

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            await GoogleSignin.signIn()
            //.then(responce => {
                var token = GoogleSignin.getTokens().then(tokens => {
                    var a  = tokens.accessToken;
                    var b = tokens.idToken;

                    console.log(a);
                    console.log(b);
                })
            //});

            //console.log(userInfo);
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User cancelled the login flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Signing in');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play services not available');
            } else {
                console.log('Some other error happened');
                console.log(error.message);
                console.log(error.code);
            }
        }
    };

    var safeAreaInsets = useSafeAreaInsets();
    return (
        <View
            style={styles.container}>
            <ImageBackground
                source={require('../../assets/images/splash_image.png')}
                resizeMode="cover"
                style={styles.bgImage}>
                <View
                    id="buttons-container"
                    style={{
                        marginBottom: safeAreaInsets.bottom,
                        marginRight: 20,
                        marginLeft: 20}}>
                    <Text>Оберіть спосвіб входу</Text>
                    <AppBlueButton
                        title="Google"
                        containerStyle={{marginBottom:10}}
                        onPress={signIn}/>
                    {/*<AppBlueButton
                        title="Facebook"
                        containerStyle={{marginBottom:10}}/>
                    <AppBlueButton
                        title="Мейл та пароль"
                        containerStyle={{marginBottom:10}}/>
                    <Text>Нема акаунту?</Text>
                    <AppBlueButton
                        title="Зареєструватись"
                        containerStyle={{marginBottom:10}}/>
                    <AppBlueButton
                        title="Забувся пароль"
                        containerStyle={{marginBottom:10}}/> */}
                    {/* <GoogleSigninButton
                        style={{
                            backgroundColor: appColors.blue,
                            borderRadius: 12,
                            paddingVertical: 14
                        }}
                        onPress={signIn}
                        /> */}
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        //backgroundColor: "red",
        flex: 1
    },
    bgImage: {
        flex: 1,
        //flexDirection:'column',
        //alignContent:'flex-end',
        //alignItems:'flex-end'
        justifyContent:'flex-end'
    },
    buttonsContainer: {
        flexDirection: "column",
    },
    buttton: {
        color: appColors.textLight
    }
})