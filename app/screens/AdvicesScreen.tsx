import appColors from "@/assets/colors";
import { defaultViewStyles, labelStyles } from "@/assets/styles";
import { Advice } from "@/db/schema";
import { iocContainer } from "@/ioc/inversify.config";
import { TYPES } from "@/ioc/TypesRegistrations";
import { ISupportService } from "@/services/Support/ISupportService";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinkText from "../components/LinkText";
import LoadingIndicator from "../components/LoadingIndicator";

export default function AdvicesScreen(): React.JSX.Element {
    const supportService = iocContainer.get<ISupportService>(TYPES.SupportService);
    const [advices, setAdvices] = useState(Array<Advice>);
    const [isLoading, setIsLoading] = useState(false);
    const [activeSections, setActiveSections] = useState<Array<number>>([]);
    const fetchAdvices = () => {
        setIsLoading(true);
        supportService.getAdvices()
            .then(advices => setAdvices(advices))
            .finally(() => setIsLoading(false));
    }

    useEffect(() => fetchAdvices(), []);

    return (
        <View style={defaultViewStyles.container}>
            { 
                isLoading
                ? <LoadingIndicator/>
                : <ScrollView
                    contentContainerStyle={{
                        paddingBottom: useSafeAreaInsets().bottom
                    }}>
                    <Accordion
                        sections={advices}
                        activeSections={activeSections}
                        onChange={(sections) => setActiveSections(sections)}
                        renderHeader={(section) => {
                            return (
                                <Text style={[
                                    labelStyles.body,
                                    styles.authorLabel]}>
                                    {section.author}
                                </Text>)
                        }}
                        renderContent={(section) => {
                            return (
                                <View>
                                    {section.advices.map((item, index) => 
                                        <LinkText
                                            key={index}
                                            text={item}
                                            textStyle={{
                                                paddingVertical: 5,
                                                paddingHorizontal: 10,
                                                lineHeight: 20,
                                                color: appColors.textPrimary,
                                                fontSize: 16
                                            }}/>
                                    )}
                                </View>
                            )
                        }}/>
                </ScrollView> 
            }
        </View>
    );
}

const styles = StyleSheet.create({
    authorLabel: {
        backgroundColor: appColors.cardBackground,
        borderBottomColor: appColors.backgroundPrimary,
        borderBottomWidth: 2,
        fontWeight: "bold",
        padding: 10,
        lineHeight: 20
    }
})