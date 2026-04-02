import { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { getSingleRepository } from "../../api/getSingleRepository";
import { EmptyState } from "../../components/EmptyState/EmptyState.index";
import { LoadingState } from "../../components/LoadingState/LoadingState.index";
import { useFavoritesStore, useIsFavorite } from "../../store/favoritesStore";
import { RootStackParamList } from "../../navigation/types";
import { RepositoryDetailInfoCard } from "./components/RepositoryDetailInfoCard/RepositoryDetailInfoCard.index";
import { RepositoryFavoriteToggle } from "./components/RepositoryFavoriteToggle/RepositoryFavoriteToggle.index";
import { RepositoryDetailTopicsSection } from "./components/RepositoryDetailTopicsSection/RepositoryDetailTopicsSection.index";
import { repositoryDetailScreenStyles as styles } from "./RepositoryDetailScreen.styles";
import type { FavoriteRepository, RepositoryDetailObject } from "../../types/repository";

type RepositoryDetailScreenProps = NativeStackScreenProps<RootStackParamList, "RepositoryDetail">;

export function RepositoryDetailScreen({ route, navigation }: RepositoryDetailScreenProps) {
  const { owner, repo } = route.params;
  const isLoadingFavorites = useFavoritesStore((state) => state.isLoadingFavorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const [repository, setRepository] = useState<RepositoryDetailObject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isRepositoryFavorite = useIsFavorite(repository?.id);

  const fetchRepository = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const result = await getSingleRepository(owner, repo);

    if (result.success) {
      setRepository(result.data);
    } else {
      setErrorMessage(result.message);
    }

    setIsLoading(false);
  }, [owner, repo]);

  const handleFavoriteToggle = useCallback(async () => {
    if (!repository) {
      return;
    }

    const favoriteRepository: FavoriteRepository = {
      id: repository.id,
      name: repository.name,
      owner: { login: repository.owner.login ?? "" },
      language: repository.language,
      stargazers_count: repository.stargazers_count,
    };

    await toggleFavorite(favoriteRepository);
  }, [repository, toggleFavorite]);

  useEffect(() => {
    fetchRepository();
  }, [fetchRepository]);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingState message="Loading repository..." />;
    }

    if (errorMessage) {
      return <EmptyState title="Something went wrong" description={errorMessage} />;
    }

    if (!repository) {
      return (
        <EmptyState
          title="Repository not found"
          description="This repository may have been removed or renamed."
        />
      );
    }

    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <RepositoryDetailInfoCard repository={repository} />

        {!isLoadingFavorites && (
          <RepositoryFavoriteToggle
            isFavorite={isRepositoryFavorite}
            onPress={handleFavoriteToggle}
          />
        )}

        <RepositoryDetailTopicsSection repository={repository} />
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Pressable onPress={navigation.goBack} style={styles.backButton} hitSlop={15}>
            <Ionicons name="chevron-back" size={20} color="#818cf8" />
            <Text style={styles.backText}>Results</Text>
          </Pressable>
        </View>

        {renderContent()}
      </View>
    </SafeAreaView>
  );
}
