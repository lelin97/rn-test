import type { SearchRepositoriesResponse, SearchRepositoriesResult } from "../types/repository";
import { GitHubApiError, fetchGitHubRepositories } from "./client";

export async function searchRepositories(
  query: string,  
  page: number = 1,
): Promise<SearchRepositoriesResult> {
  const path = `/search/repositories?q=${encodeURIComponent(query.trim())}&per_page=20&page=${page}`;

  try {
    const data = await fetchGitHubRepositories<SearchRepositoriesResponse>(path);

    if (!Array.isArray(data.items)) {
      return { success: false, message: "Unexpected response from GitHub." };
    }

    if (typeof data.total_count !== "number") {
      return { success: false, message: "Unexpected response from GitHub." };
    }

    return {
      success: true,
      items: data.items,
      totalCount: data.total_count,
      page,
    };
  } catch (error) {
    if (error instanceof GitHubApiError) {
      return { success: false, message: error.message };
    }

    return { success: false, message: "Network error. Check your connection and try again." };
  }
}
