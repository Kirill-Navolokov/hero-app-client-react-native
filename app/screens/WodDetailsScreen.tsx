import appColors from "@/assets/colors";
import { WodDetailsNavigationProp, WodDetailsRouteProp } from "@/navigation-types/WodsStackNavigationParams";
import { dateFormatOptions } from "@/utils/DateFormatOptions";
import { useState } from "react";
import { GestureResponderEvent, Image, NativeSyntheticEvent, ScrollView, StyleSheet, Text, TextLayoutEventData, TouchableHighlight, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Separator } from "../components/Separator";
import { labelStyles } from "@/assets/styles";
import { strings } from "@/assets/strings";

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
            contentContainerStyle={{
                paddingBottom: safeArea.bottom,
            }}
            style={styles.container}>
            <View style={[styles.header]}>
                <Image
                    source={{uri: wod.imageUrl}}
                    style={styles.backgourdImage} />
                <View style={{margin: 10}}>
                    <Text style={labelStyles.title}>{wod.name}</Text>
                    <Text style={[labelStyles.subtitle, {marginTop: 5}]}>
                        {wod.executionDate.toLocaleDateString(strings.locale, dateFormatOptions)}
                    </Text>
                </View>
            </View>
            <Separator/>
            <Text style={[labelStyles.body, {margin: 10}]}>{wod.scheme}</Text>
            <Separator/>
            <Text
                numberOfLines={numOfLines}
                onTextLayout={onDescriptionLoaded}
                onPress={onDescriptionPressed}
                style={[labelStyles.caption, {margin: 10}]}>
                    {wod.description}
            </Text>
            {isExpandable && 
                <TouchableHighlight
                    underlayColor={appColors.transparent}
                    onPress={onDescriptionPressed}>
                    <Text
                        style={[labelStyles.caption, {
                            color: appColors.blue,
                            marginLeft: 10,
                            marginTop: -9
                        }]}>{isExpanded != true ? strings.more : strings.less}</Text>
                </TouchableHighlight>
            }
            <Text style={styles.footer}>{strings.getSweatOrDie}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: appColors.backgroundPrimary,
    },
    header: {
        flex:1,
        flexDirection: "column"
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
        borderColor: appColors.backgroundPrimary,
        borderStyle: "solid",
        borderWidth: 4
    },
    footer: {
        color: appColors.textSecondary,
        alignSelf: "center",
        marginTop: 10,
        fontSize: 14,
    }
})