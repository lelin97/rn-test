import type { SingleRepositoryResult, RepositoryDetailObject } from "../types/repository";
import { GitHubApiError, fetchGitHubRepositories } from "./client";

export async function getSingleRepository(owner: string, repo: string): Promise< SingleRepositoryResult> {
  const path = `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;

  try {
    const data = await fetchGitHubRepositories<RepositoryDetailObject>(path);

    return { success: true, data };
  } catch (error) {

    if (error instanceof GitHubApiError) {
      return { success: false, message: error.message };
    }
    
    return { success: false, message: "Network error. Check your connection and try again." };
  }
}
