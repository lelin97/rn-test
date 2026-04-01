import { BASE_URL, GITHUB_HEADERS } from "./config";

export class GitHubApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

function resolveErrorMessage(status: number, bodyMessage?: string): string {
  if (status === 403 || status === 429) {
    return "GitHub rate limit reached. Wait a minute and try again.";
  }

  if (status === 503) {
    return "GitHub is temporarily unavailable. Try again shortly.";
  }

  return bodyMessage || `Request failed (${status}).`;
}

export async function fetchGitHubRepositories<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, { headers: GITHUB_HEADERS });

  if (!response.ok) {

    let bodyMessage: string | undefined;

    try {
      const body: { message?: string } = await response.json();

      if (typeof body.message === "string" && body.message.length > 0) {
        bodyMessage = body.message;
      }

    } catch {
    }

    throw new GitHubApiError(response.status, resolveErrorMessage(response.status, bodyMessage));
  }

  return (await response.json()) as T;
}
