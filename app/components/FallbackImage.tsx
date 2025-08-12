import { defaultImages } from "@/assets/images";
import { Image } from "expo-image";
import { useState } from "react";
import { ImageStyle, StyleProp } from "react-native";

export default function FallbackImage(
    {imageUrl, defaultImageType, style, defaultImageStyle}:
    {imageUrl:string, defaultImageType: string, style?: StyleProp<ImageStyle>, defaultImageStyle?: StyleProp<ImageStyle>}
): React.JSX.Element {
    const [errorOnLoading, setErrorOnLoading] = useState(imageUrl == undefined || imageUrl == '');

    return (
        <Image
            cachePolicy={"disk"}
            source={errorOnLoading ? defaultImages[defaultImageType] : imageUrl}
            onError={(data) => {
                setErrorOnLoading(true);
            }}
            style={[style, errorOnLoading ? defaultImageStyle : {}]}/>
    )
}