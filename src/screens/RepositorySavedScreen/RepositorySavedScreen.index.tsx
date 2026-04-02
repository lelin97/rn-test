import { useCallback } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { useFavoritesStore } from "../../store/favoritesStore";
import { EmptyState } from "../../components/EmptyState/EmptyState.index";
import { LoadingState } from "../../components/LoadingState/LoadingState.index";
import { RootStackParamList } from "../../navigation/types";
import type { FavoriteRepository } from "../../types/repository";
import { SavedRepositoryCard } from "./components/SavedRepositoryCard/SavedRepositoryCard.index";
import { repositorySavedScreenStyles as styles } from "./RepositorySavedScreen.styles";

export function RepositorySavedScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const favorites = useFavoritesStore((state) => state.favorites);
  const isLoadingFavorites = useFavoritesStore((state) => state.isLoadingFavorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const openRepository = useCallback(
    (repository: FavoriteRepository) => {
      navigation.navigate("RepositoryDetail", {
        owner: repository.owner.login ?? "",
        repo: repository.name,
      });
    },
    [navigation],
  );

  const removeRepository = useCallback(
    (repository: FavoriteRepository) => {
      toggleFavorite(repository);
    },
    [toggleFavorite],
  );

  const renderRepository = useCallback(
    ({ item }: { item: FavoriteRepository }) => (
      <SavedRepositoryCard repository={item} onPress={openRepository} onRemove={removeRepository} />
    ),
    [openRepository, removeRepository],
  );

  const renderContent = useCallback(() => {
    if (isLoadingFavorites) {
      return <LoadingState message="Loading favorites..." />;
    }

    if (favorites.length === 0) {
      return (
        <EmptyState
          title="No saved repositories"
          description="Repositories you save will appear here."
        />
      );
    }

    return (
      <>
        <Text style={styles.subtitle}>
          {favorites.length} {favorites.length === 1 ? "repository" : "repositories"}
        </Text>

        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderRepository}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <View style={styles.swipeHint}>
              <Ionicons name="arrow-back-outline" size={16} color="#64748b" />
              <Text style={styles.swipeHintText}>Swipe left to remove</Text>
            </View>
          }
        />
      </>
    );
  }, [isLoadingFavorites, favorites, renderRepository]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Saved</Text>

        {renderContent()}
      </View>
    </SafeAreaView>
  );
}
