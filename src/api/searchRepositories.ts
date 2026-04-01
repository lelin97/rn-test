import type { SearchRepositoriesResponse, SearchRepositoriesResult } from "../types/repository";
import { GitHubApiError, fetchGitHubRepositories } from "./client";

export async function searchRepositories(query: string): Promise<SearchRepositoriesResult> {
  const path = `/search/repositories?q=${encodeURIComponent(query.trim())}&per_page=20`;

  try {
    const data = await fetchGitHubRepositories<SearchRepositoriesResponse>(path);

    if (!Array.isArray(data.items)) {
      return { success: false, message: "Unexpected response from GitHub." };
    }

    return { success: true, data: data.items };
  } catch (error) {
    if (error instanceof GitHubApiError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Network error. Check your connection and try again." };
  }
}
