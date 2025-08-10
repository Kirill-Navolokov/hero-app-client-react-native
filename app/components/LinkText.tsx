import { openUrlModally } from "@/utils/helperFunctions";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

const urlRegex = /(https?:\/\/[^\s]+)/g;

export default function LinkText(
    {text, textStyle}:
    {text: string, textStyle?: StyleProp<TextStyle>}
): React.JSX.Element {
    const parts = text.split(urlRegex);

    return (
        <Text style={textStyle}>
            {parts.map((part, index) => {
                if (urlRegex.test(part)) {
                    return (
                        <Text
                            key={index}
                            style={[textStyle, styles.link]}
                            onPress={async() => await openUrlModally(part)}>
                            {part}
                        </Text>
                    );
                }
                return <Text key={index}>{part}</Text>;
            })}
        </Text>
    );
}

const styles = StyleSheet.create({
  link: {
    color: "#4DA8DA",
  },
});