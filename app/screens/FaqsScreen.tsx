import appColors from "@/assets/colors";
import { labelStyles } from "@/assets/styles";
import { Faq } from "@/db/schema";
import { iocContainer } from "@/ioc/inversify.config";
import { TYPES } from "@/ioc/TypesRegistrations";
import { ISupportService } from "@/services/Support/ISupportService";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Accordion from 'react-native-collapsible/Accordion';
import LinkText from "../components/LinkText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LoadingIndicator from "../components/LoadingIndicator";

export default function FaqsScreen(): React.JSX.Element {
    const supportService = iocContainer.get<ISupportService>(TYPES.SupportService);
    const [faqs, setFaqs] = useState(Array<Faq>);
    const [isLoading, setIsLoading] = useState(false);
    const [activeSections, setActiveSections] = useState<Array<number>>([]);
    const fetchFaqs = () => {
        setIsLoading(true);
        supportService.getFaqs()
            .then(faqs => setFaqs(faqs))
            .finally(() => setIsLoading(false));
    }

    useEffect(() => fetchFaqs(), []);

    return (
        <View style={{
            backgroundColor: appColors.backgroundPrimary,
            flex:1
        }}>
            { 
                isLoading
                ? <LoadingIndicator/>
                : <ScrollView
                    contentContainerStyle={{
                        paddingBottom: useSafeAreaInsets().bottom
                    }}>
                    <Accordion
                        sections={faqs}
                        activeSections={activeSections}
                        onChange={(sections) => setActiveSections(sections)}
                        renderHeader={(section) => {
                            return (
                                <Text style={[
                                    labelStyles.body,
                                    styles.questionLabel]}>
                                    {section.question}
                                </Text>)
                        }}
                        renderContent={(section) => {
                            return <LinkText
                                text={section.answer}
                                textStyle={{
                                    padding: 10,
                                    lineHeight: 20,
                                    color: appColors.textPrimary,
                                    fontSize: 16
                                }}/>
                        }}/>
                </ScrollView> 
            }
        </View>
    );
}

const styles = StyleSheet.create({
    questionLabel: {
        backgroundColor: appColors.cardBackground,
        borderBottomColor: appColors.backgroundPrimary,
        borderBottomWidth: 2,
        fontWeight: "bold",
        padding: 10,
        lineHeight: 20
    }
})