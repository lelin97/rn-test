import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { searchRepositories } from "../../api/searchRepositories";
import { EmptyState } from "../../components/EmptyState/EmptyState.index";
import { LoadingState } from "../../components/LoadingState/LoadingState.index";
import { RepositorySearchResultCard } from "./components/RepositorySearchResultCard/RepositorySearchResultCard.index";
import { SearchInput } from "../../components/SearchInput/SearchInput.index";
import { useDebounce } from "../../hooks/useDebounce";
import { RootStackParamList, SearchStackParamList } from "../../navigation/types";
import type { RepositoryCardItem, RepositoryResponseObject } from "../../types/repository";
import { repositorySearchScreenStyles as styles } from "./RepositorySearchScreen.styles";

type RepositorySearchScreenProps = CompositeScreenProps<
  NativeStackScreenProps<SearchStackParamList, "RepositorySearch">,
  NativeStackScreenProps<RootStackParamList>
>;

export function RepositorySearchScreen({ navigation }: RepositorySearchScreenProps) {
  const [searchRepository, setSearchRepository] = useState("");
  const [repositories, setRepositories] = useState<RepositoryResponseObject[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const repositoriesRef = useRef<RepositoryResponseObject[]>([]);

  const debouncedQuery = useDebounce(searchRepository.trim(), { delayMs: 500 });

  const shownTotal = Math.min(totalCount, 1000);

  const clearSearch = useCallback(() => {
    repositoriesRef.current = [];
    setPage(0);
    setRepositories([]);
    setTotalCount(0);
    setHasMore(false);
    setErrorMessage(null);
    setIsLoading(false);
    setIsLoadingMore(false);
  }, []);

  const runSearchRepository = useCallback(async (query: string, page: number, append: boolean) => {
    if (append) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
      setPage(0);
    }

    setErrorMessage(null);

    try {
      const result = await searchRepositories(query, page);

      if (result.success) {
        const cappedTotal = Math.min(result.totalCount, 1000);
        const nextList = append ? [...repositoriesRef.current, ...result.items] : result.items;

        repositoriesRef.current = nextList;
        setRepositories(nextList);
        setTotalCount(result.totalCount);
        setPage(page);

        const fullPage = result.items.length === 20;
        setHasMore(nextList.length < cappedTotal && fullPage);
      } else {
        setErrorMessage(result.message);

        if (!append) {
          repositoriesRef.current = [];
          setRepositories([]);
          setTotalCount(0);
          setHasMore(false);
        }
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");

      if (!append) {
        repositoriesRef.current = [];
        setRepositories([]);
        setTotalCount(0);
        setHasMore(false);
      }
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  const loadNextPage = useCallback(() => {
    if (!debouncedQuery || isLoadingMore || !hasMore) {
      return;
    }

    runSearchRepository(debouncedQuery, page + 1, true);
  }, [debouncedQuery, hasMore, isLoadingMore, page, runSearchRepository]);

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
    <RepositorySearchResultCard repository={item} onPress={openRepository} />
  );

  const renderListFooter = () => {
    if (!hasMore) {
      return null;
    }

    return (
      <View style={styles.loadMoreWrap}>
        <Pressable
          style={({ pressed }) => [styles.loadMoreButton, pressed && styles.loadMoreButtonPressed]}
          onPress={loadNextPage}
          disabled={isLoadingMore}
        >
          {isLoadingMore ? (
            <ActivityIndicator color="#818cf8" />
          ) : (
            <Text style={styles.loadMoreText}>Load more</Text>
          )}
        </Pressable>
      </View>
    );
  };

  const renderContent = () => {
    if (!searchRepository.trim()) {
      return (
        <EmptyState
          title="Explore repositories"
          description="Type a name, topic, or owner to search GitHub."
        />
      );
    }

    if (isLoading) {
      return <LoadingState message="Searching repositories..." />;
    }

    if (errorMessage) {
      return <EmptyState title="Something went wrong" description={errorMessage} />;
    }

    if (repositories.length === 0) {
      return (
        <EmptyState
          title="No repositories found"
          description="Try another keyword or owner name."
        />
      );
    }

    return (
      <FlatList
        data={repositories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRepository}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.resultSummary}>
            {repositories.length} of {shownTotal} repositories
          </Text>
        }
        ListFooterComponent={renderListFooter}
      />
    );
  };

  useEffect(() => {
    if (!debouncedQuery) {
      clearSearch();
      return;
    }

    runSearchRepository(debouncedQuery, 1, false);
  }, [debouncedQuery, runSearchRepository, clearSearch]);

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
