import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { repositoryFavoriteToggleStyles as styles } from "./RepositoryFavoriteToggle.styles";

type RepositoryFavoriteToggleProps = {
  isFavorite: boolean;
  onPress: () => void;
};

export function RepositoryFavoriteToggle({ isFavorite, onPress }: RepositoryFavoriteToggleProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.favoriteAction,
        isFavorite ? styles.favoriteActionSaved : styles.favoriteActionUnsaved,
      ]}
    >
      <Ionicons
        name={isFavorite ? "star" : "star-outline"}
        size={20}
        color={isFavorite ? "#c4b5fd" : "#818cf8"}
      />

      <Text style={styles.favoriteActionText}>
        {isFavorite ? "Saved to favorites" : "Save to favorites"}
      </Text>
    </Pressable>
  );
}
