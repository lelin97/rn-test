import { TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { searchInputStyles } from "./SearchInput.styles";

type SearchInputProps = {
  value: string;
  onChangeText: (value: string) => void;
};

export function SearchInput({ value, onChangeText }: SearchInputProps) {
  return (
    <View style={searchInputStyles.wrapper}>
      <Ionicons
        name="search"
        size={18}
        color="#64748b"
        style={searchInputStyles.icon}
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search repositories..."
        placeholderTextColor="#64748b"
        autoCapitalize="none"
        autoCorrect={false}
        style={searchInputStyles.input}
      />
    </View>
  );
}
