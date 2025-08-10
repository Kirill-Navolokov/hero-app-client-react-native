import appColors from "@/assets/colors";
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppBlueButton } from "../components/AppBlueButton";
import { useState } from "react";
import React from "react";
import { AuthContext } from "../_layout";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LoginScreen(): React.JSX.Element {
    // useEffect(() => {
    //     GoogleSignin.configure({
    //         iosClientId: '617406272995-1bu9q0osjm2269om1kbk3l96fm9u9mh6.apps.googleusercontent.com',
    //         scopes: ['profile', 'email']
    //     });
    // });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignInEnabled, setSignInEnabled] = useState(false);
    const [isPasswordHidden, setPasswordHidden] = useState(false);
    const updateSignInEnabled = (email: string, password: string) => {
        let isEnabled = email.length > 0 && password.length > 0;
        setSignInEnabled(isEnabled);
    }

    const { signIn } = React.useContext(AuthContext)!;
    const safeAreaInsets = useSafeAreaInsets();
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
                    <TextInput
                        textContentType="emailAddress"
                        style={[styles.textInput, styles.textInputContainer]}
                        placeholder="email@example.com"
                        onChangeText={(text) => { 
                            setEmail(text);
                            updateSignInEnabled(text, password);
                        }}
                        placeholderTextColor={appColors.textSecondary}/>
                    <View
                        style={[styles.passwordInputContainer, styles.textInputContainer]}>
                        <TextInput
                            textContentType="password"
                            secureTextEntry={isPasswordHidden}
                            style={[styles.textInput, {flex: 1}]}
                            placeholder="пароль"
                            onChangeText={(text) => {
                                setPassword(text);
                                updateSignInEnabled(email, text);
                            }}
                            placeholderTextColor={appColors.textSecondary}/>
                            <MaterialCommunityIcons
                                name={isPasswordHidden ? 'eye': 'eye-off'}
                                size={24}
                                color={appColors.textPrimary}
                                style={styles.icon}
                                onPress={() => setPasswordHidden(!isPasswordHidden)}/>
                    </View>
                    <TouchableOpacity
                        onPress={() => isSignInEnabled ? signIn(email, password) : null}
                        style={[styles.buttonContainer, isSignInEnabled ? {opacity: 1} : {opacity: 0.5}]}>
                        <Text style={[styles.buttonLabel]}>Увійти</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bgImage: {
        flex: 1,
        justifyContent:'flex-end'
    },
    buttonsContainer: {
        flexDirection: "column",
    },
    buttton: {
        color: appColors.textPrimary
    },
    textInputContainer: {
        backgroundColor: appColors.cardBackground,
        borderRadius: 10,
        marginBottom: 10,
    },
    textInput: {
        color: appColors.textPrimary,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 15,
    },
    passwordInputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
    },
    buttonContainer: {
        backgroundColor: appColors.blue,
        borderRadius: 12,
        paddingVertical: 14
    },
    buttonLabel: {
        color: appColors.textPrimary,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign:'center'
    },
    icon: {
        marginRight: 15
    }
})