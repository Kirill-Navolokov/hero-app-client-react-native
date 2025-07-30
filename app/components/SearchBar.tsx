import appColors from "@/assets/colors";
import { strings } from "@/assets/strings";
import { StyleProp, TextInput, TextStyle } from "react-native";

export default function SearchBar(
    {searchText, style, onTextChanged}:
    {searchText: string|undefined, style?: StyleProp<TextStyle>, onTextChanged: (newText: string)=> void}
): React.JSX.Element {
    return (
        <TextInput
            placeholder={strings.search}
            placeholderTextColor={appColors.textSecondary}
            value={searchText}
            onChangeText={onTextChanged}
            style={[{
                backgroundColor: appColors.cardBackground,
                color: appColors.textPrimary,
                height: 40,
                borderRadius: 8,
                marginBottom: 10,
                marginHorizontal:10,
                paddingHorizontal: 10,
            }, style]}/>
    )
}