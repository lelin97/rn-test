import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { searchRepositories } from "../api/searchRepositories";
import { EmptyState } from "../components/EmptyState/EmptyState.index";
import { LoadingState } from "../components/LoadingState/LoadingState.index";
import { RepositoryCard } from "../components/RepositoryCard/RepositoryCard.index";
import { SearchInput } from "../components/SearchInput/SearchInput.index";
import { useDebounce } from "../hooks/useDebounce";
import { SearchStackParamList } from "../navigation/types";
import type { RepositoryCardItem, RepositoryResponseObject } from "../types/repository";

type Props = NativeStackScreenProps<SearchStackParamList, "SearchList">;

export function SearchScreen({ navigation }: Props) {
  const [searchRepository, setSearchRepository] = useState("");
  const [repositories, setRepositories] = useState<RepositoryResponseObject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const debouncedQuery = useDebounce(searchRepository.trim(), { delayMs: 500 });

  const clearSearch = useCallback(() => {
    setRepositories([]);
    setErrorMessage(null);
    setIsLoading(false);
  }, []);

  const runSearchRepository = useCallback(async (query: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await searchRepositories(query);

      if (result.success) {
        setRepositories(result.data);
      } else {
        setErrorMessage(result.message);
        setRepositories([]);
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setRepositories([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!debouncedQuery) {
      clearSearch();
      return;
    }

    runSearchRepository(debouncedQuery);
  }, [debouncedQuery, runSearchRepository, clearSearch]);

  const openRepository = useCallback(
    (repository: RepositoryCardItem) => {
      navigation.navigate("RepositoryDetail", {
        owner: repository.owner.login ?? "",
        repo: repository.name,
      });
    },
    [navigation],
  );

  const renderRepository = ({ item }: { item: RepositoryResponseObject }) => (
    <RepositoryCard repository={item} onPress={openRepository} />
  );

  const renderContent = () => {
    if (!searchRepository.trim()) {
      return <EmptyState title="Explore repositories" description="Type a name, topic, or owner to search GitHub." />;
    }

    if (isLoading) {
      return <LoadingState message="Searching repositories..." />;
    }

    if (errorMessage) {
      return <EmptyState title="Something went wrong" description={errorMessage} />;
    }

    if (repositories.length === 0) {
      return <EmptyState title="No repositories found" description="Try another keyword or owner name." />;
    }

    return (
      <FlatList
        data={repositories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRepository}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Explore</Text>

        <SearchInput value={searchRepository} onChangeText={setSearchRepository} />

        <View style={styles.resultsArea}>{renderContent()}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090d1a",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  title: {
    color: "#f8fafc",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 16,
  },
  resultsArea: {
    flex: 1,
    marginTop: 14,
  },
  listContent: {
    paddingBottom: 24,
  },
});
