import { create } from "zustand";

import type { FavoriteRepository } from "../types/repository";
import { loadFavoriteRepositories as loadFavoriteRepositoriesFromStorage, saveFavoriteRepositories } from "../storage/favoritesStorage";

type FavoritesStoreState = {
  favorites: FavoriteRepository[];
  isLoadingFavorites: boolean;
  loadFavoriteRepositories: () => Promise<void>;
  toggleFavorite: (repository: FavoriteRepository) => Promise<void>;
};

export const useFavoritesStore = create<FavoritesStoreState>((set, get) => ({
  favorites: [],
  isLoadingFavorites: true,
  loadFavoriteRepositories: async () => {
    set({ isLoadingFavorites: true });

    const storedFavorites = await loadFavoriteRepositoriesFromStorage();

    set({ favorites: storedFavorites, isLoadingFavorites: false });
  },
  toggleFavorite: async (repository: FavoriteRepository) => {
    const currentFavorites = get().favorites;
    const repositoryAlreadyFavorited = currentFavorites.some((item) => item.id === repository.id);

    const updatedFavorites = repositoryAlreadyFavorited
      ? currentFavorites.filter((item) => item.id !== repository.id)
      : [...currentFavorites, repository];

    set({ favorites: updatedFavorites });
    await saveFavoriteRepositories(updatedFavorites);
  },
}));

export function useIsFavorite(repositoryId?: number) {
  return useFavoritesStore((state) => {
    
    if (!repositoryId) {
      return false;
    }

    return state.favorites.some((item) => item.id === repositoryId);
  });
}
