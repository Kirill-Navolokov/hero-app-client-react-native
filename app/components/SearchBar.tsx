import appColors from "@/assets/colors";
import { strings } from "@/assets/strings";
import { TextInput } from "react-native";

export default function SearchBar(
    {searchText, onTextChanged}:
    {searchText: string|undefined, onTextChanged: (newText: string)=> void}
): React.JSX.Element {
    return (
        <TextInput
            placeholder={strings.search}
            placeholderTextColor={appColors.textSecondary}
            value={searchText}
            onChangeText={onTextChanged}
            style={{
                backgroundColor: appColors.cardBackground,
                color: appColors.textPrimary,
                height: 40,
                borderRadius: 8,
                marginBottom: 10,
                marginHorizontal:10,
                paddingHorizontal: 10,
            }}/>
    )
}