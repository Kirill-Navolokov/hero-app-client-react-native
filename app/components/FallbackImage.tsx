import { defaultImages } from "@/assets/images";
import { useState } from "react";
import { Image, ImageStyle, StyleProp } from "react-native";

export default function FallbackImage(
    {imageUrl, defaultImageType, style, defaultImageStyle}:
    {imageUrl:string, defaultImageType: string, style?: StyleProp<ImageStyle>, defaultImageStyle?: StyleProp<ImageStyle>}
): React.JSX.Element {
    const [errorOnLoading, setErrorOnLoading] = useState(imageUrl == undefined || imageUrl == '');

    return (<Image
        source={errorOnLoading ? defaultImages[defaultImageType] : {uri: imageUrl}}
        onError={(data) => {
            setErrorOnLoading(true);
        }}
        style={[style, errorOnLoading ? defaultImageStyle : {}]}/>
    )
}