import AsyncStorage from "@react-native-async-storage/async-storage";

import { FAVORITES_STORAGE_KEY } from "../constants/storage";
import type { FavoriteRepository } from "../types/repository";

function isFavoriteRepository(value: FavoriteRepository) {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Record<string, unknown>;

  if (!item.owner || typeof item.owner !== "object") {
    return false;
  }

  const owner = item.owner as Record<string, unknown>;

  return (
    typeof item.id === "number" &&
    typeof item.name === "string" &&
    (typeof owner.login === "string" || owner.login === null) &&
    (typeof item.language === "string" || item.language === null) &&
    typeof item.stargazers_count === "number"
  );
}

export async function loadFavoriteRepositories(): Promise<FavoriteRepository[]> {
  try {
    const rawData = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);

    if (!rawData) {
      return [];
    }

    const parsedData: unknown = JSON.parse(rawData);

    if (!Array.isArray(parsedData)) {
      return [];
    }

    return parsedData.filter(isFavoriteRepository);
  } catch {
    return [];
  }
}

export async function saveFavoriteRepositories(items: FavoriteRepository[]): Promise<void> {
  await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(items));
}
