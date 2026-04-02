import "react-native-gesture-handler";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import { useFavoritesStore } from "./src/store/favoritesStore";
import { RootNavigator } from "./src/navigation/RootNavigator";

export default function App() {
  const loadFavoriteRepositories = useFavoritesStore((state) => state.loadFavoriteRepositories);

  useEffect(() => {
    loadFavoriteRepositories();
  }, [loadFavoriteRepositories]);

  return (
    <>
      <StatusBar style="light" />
      <RootNavigator />
    </>
  );
}
