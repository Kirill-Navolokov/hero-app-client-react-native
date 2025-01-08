import appColors from "@/assets/colors";
import { WodDetailsNavigationProp, WodDetailsRouteProp } from "@/navigation-types/WodsStackNavigationParams";
import { dateFormatOptions } from "@/utils/DateFormatOptions";
import { useState } from "react";
import { GestureResponderEvent, Image, NativeSyntheticEvent, ScrollView, StyleSheet, Text, TextLayoutEventData, TouchableHighlight, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Separator } from "../components/Separator";
import { labelStyles } from "@/assets/styles";

const EXPANDABLE_TEXT_MAX_LINES = 4;

export default function WodDetailsScreen(
    {navigation, route}:{navigation:WodDetailsNavigationProp, route: WodDetailsRouteProp}
) : React.JSX.Element {
    const wod = route.params.wod;
    const safeArea = useSafeAreaInsets();

    const [numOfLines, setNumberOfLines] = useState<number|undefined>(undefined);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isExpandable, setIsExpandable] = useState<boolean|undefined>(undefined);
    const [isInitialized, setIsInitialized] = useState(false);
    
    const onDescriptionLoaded = (event: NativeSyntheticEvent<TextLayoutEventData>) => {
        if(isInitialized)
            return;

        setIsInitialized(true);
        var currentLines = event.nativeEvent.lines.length
        var canExpand = currentLines > EXPANDABLE_TEXT_MAX_LINES;

        setIsExpandable(canExpand);

        if(canExpand) {
            setNumberOfLines(EXPANDABLE_TEXT_MAX_LINES);
            setIsExpanded(false);
        }
    }
    const onDescriptionPressed = (event: GestureResponderEvent) => {
        if(isExpandable != true)
            return;
        
        setNumberOfLines(isExpanded ? EXPANDABLE_TEXT_MAX_LINES : undefined);
        setIsExpanded(!isExpanded);
    }

    return (
        <ScrollView
            bounces={false}
            contentContainerStyle={{
                paddingBottom: safeArea.bottom,
            }}
            style={styles.container}>
            <View style={styles.header}>
                <Image 
                    source={{uri: "https://scontent-waw2-2.xx.fbcdn.net/v/t39.30808-6/411746262_677692874542136_6277054686580970176_n.png?stp=dst-png_p720x720&_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=aju6D2sRzUMQ7kNvgH2DD-i&_nc_zt=23&_nc_ht=scontent-waw2-2.xx&_nc_gid=AUAd7P7zJDszHwVTdqLO6KN&oh=00_AYAzDI5YC-P811NEKbivHtru52z5cuI0UPn9zPrj1K7y8w&oe=67849B8E"}}
                    style={styles.backgourdImage} />
                <View>
                    <Image source={{uri: wod.imageUrl}} style={styles.image} />
                    <View style={{
                        flex: 1,
                        margin: 10,
                        marginLeft: "33%"}}>
                        <Text style={labelStyles.title}>{wod.name}</Text>
                        <Text style={[labelStyles.subtitle, {marginTop: 5}]}>
                            {wod.wodDate.toLocaleDateString("uk-UA", dateFormatOptions)}
                        </Text>
                    </View>
                </View>
            </View>
            <Separator/>
            <Text style={[labelStyles.regular, {margin: 10}]}>Схема:{"\n"}{wod.scheme}</Text>
            <Separator/>
            <Text
                numberOfLines={numOfLines}
                onTextLayout={onDescriptionLoaded}
                onPress={onDescriptionPressed}
                style={[labelStyles.body, {margin: 10}]}>
                    {wod.description}
            </Text>
            {isExpandable && 
                <TouchableHighlight
                    onPress={onDescriptionPressed}>
                    <Text
                        style={[labelStyles.body, {
                            color: appColors.blue,
                            marginLeft: 10,
                            marginTop: -9
                        }]}>{isExpanded != true ? "Більше" : "Менше"}</Text>
                </TouchableHighlight>
            }
            <Text style={styles.footer}>Потій або помри &copy;OTOY</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: appColors.primary,
    },
    header: {
        flex:1,
        flexDirection: "column",
        marginBottom: 10
    },
    backgourdImage: {
        width:"100%",
        aspectRatio: 2
    },
    image: {
        position: "absolute",
        left: 5,
        bottom: 0,
        width: "30%",
        aspectRatio:1,
        borderRadius: "100%",
        borderColor: appColors.primary,
        borderStyle: "solid",
        borderWidth: 4
    },
    footer: {
        color: appColors.secondary,
        alignSelf: "center",
        marginTop: 10,
        fontSize: 14,
    }
})