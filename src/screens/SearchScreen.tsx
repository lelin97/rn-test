import { useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { EmptyState } from "../components/EmptyState/EmptyState.index";
import { LoadingState } from "../components/LoadingState/LoadingState.index";
import { RepositoryCard } from "../components/RepositoryCard/RepositoryCard.index";
import { SearchInput } from "../components/SearchInput/SearchInput.index";
import { SearchStackParamList } from "../navigation/types";
import { RepositoryListItem } from "../types/repository";

type Props = NativeStackScreenProps<SearchStackParamList, "SearchList">;

const MOCK_REPOSITORIES: RepositoryListItem[] = [
  {
    id: 1,
    name: "react-native",
    owner: "facebook",
    language: "TypeScript",
    stars: "121k",
  },
  { id: 2, name: "expo", owner: "expo", language: "TypeScript", stars: "29k" },
  {
    id: 3,
    name: "react-navigation",
    owner: "react-navigation",
    language: "TypeScript",
    stars: "26k",
  },
];

export function SearchScreen({ navigation }: Props) {
  const [searchRepository, setSearchRepository] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const filteredRepositories = useMemo(() => {
    const value = searchRepository.trim().toLowerCase();

    if (!value) {
      return MOCK_REPOSITORIES;
    }

    return MOCK_REPOSITORIES.filter(
      (repository) =>
        repository.name.toLowerCase().includes(value) ||
        repository.owner.toLowerCase().includes(value),
    );
  }, [searchRepository]);

  useEffect(() => {
    const value = searchRepository.trim();

    if (!value) {
      setIsLoading(false);

      return;
    }

    setIsLoading(true);

    const timeout = setTimeout(() => setIsLoading(false), 350);

    return () => clearTimeout(timeout);
  }, [searchRepository]);

  const openRepository = (repository: RepositoryListItem) => {
    navigation.navigate("RepositoryDetail", {
      owner: repository.owner,
      repo: repository.name,
    });
  };

  const renderRepository = ({ item }: { item: RepositoryListItem }) => (
    <RepositoryCard repository={item} onPress={openRepository} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Explore</Text>

        <SearchInput
          value={searchRepository}
          onChangeText={setSearchRepository}
        />

        <View style={styles.resultsArea}>
          {isLoading ? (
            <LoadingState message="Searching repositories..." />
          ) : filteredRepositories.length === 0 ? (
            <EmptyState
              title="No repositories found"
              description="Try another keyword or owner name."
            />
          ) : (
            <FlatList
              data={filteredRepositories}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderRepository}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
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
