import React from "react";
import { ImageBackground, View } from "react-native";

export default function SplashScreen(): React.JSX.Element {
    return (
        <ImageBackground
            source={require('../../assets/images/splash_image.png')}
            resizeMode="cover"
            style={{flex: 1}}/>
    )
}