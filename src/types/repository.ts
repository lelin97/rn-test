export type RepositoryResponseObject = {
  id: number;
  name: string;
  description: string | null;
  owner: { login: string | null };
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  topics?: string[];
};

export type SearchRepositoriesResponse = { items: RepositoryResponseObject[] };

export type RepositoryCardItem = Pick< RepositoryResponseObject, "id" | "name" | "owner" | "language" | "stargazers_count">;

export type RepositoryDetailObject = RepositoryResponseObject;

export type SearchRepositoriesResult =
  | { success: true; data: RepositoryResponseObject[] }
  | { success: false; message: string };
