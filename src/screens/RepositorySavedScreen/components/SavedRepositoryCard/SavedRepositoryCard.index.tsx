import { useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import type { FavoriteRepository } from "../../../../types/repository";
import { savedRepositoryCardStyles as styles } from "./SavedRepositoryCard.styles";

type SavedRepositoryCardProps = {
  repository: FavoriteRepository;
  onPress: (repository: FavoriteRepository) => void;
  onRemove: (repository: FavoriteRepository) => void;
};

function DeleteAction({ onPress }: { onPress: () => void }) {
  return (
    <Pressable style={styles.deleteAction} onPress={onPress}>
      <Ionicons name="trash-outline" size={22} color="#fca5a5" />
    </Pressable>
  );
}

export function SavedRepositoryCard({ repository, onPress, onRemove }: SavedRepositoryCardProps) {
  const swipeableRef = useRef<Swipeable>(null);

  const handleRemove = () => {
    swipeableRef.current?.close();
    onRemove(repository);
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={() => <DeleteAction onPress={handleRemove} />}
      overshootRight={false}
    >
      <Pressable style={styles.card} onPress={() => onPress(repository)}>
        <View style={styles.cardHeader}>
          <View style={styles.cardContent}>
            <Text style={styles.owner}>{repository.owner.login}</Text>
            <Text style={styles.name}>{repository.name}</Text>

            {repository.description ? (
              <Text style={styles.description} numberOfLines={2}>
                {repository.description}
              </Text>
            ) : null}
          </View>

          <Ionicons name="star" size={20} color="#818cf8" style={styles.starIcon} />
        </View>
      </Pressable>
    </Swipeable>
  );
}
