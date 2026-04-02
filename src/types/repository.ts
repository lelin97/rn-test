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

export type RepositoryCardItem = Pick<RepositoryResponseObject, "id" | "name" | "owner" | "language" | "stargazers_count">;

export type FavoriteRepository = RepositoryCardItem;

export type RepositoryDetailObject = RepositoryResponseObject;

export type RepositoryDetailInfoCardModel = Pick<RepositoryDetailObject, "name" | "owner" | "description" | "stargazers_count" | "forks_count" | "open_issues_count" | "language">;

export type RepositoryDetailTopicsSectionModel = Pick<RepositoryDetailObject, "topics">;

export type SearchRepositoriesResult =
  | { success: true; data: RepositoryResponseObject[] }
  | { success: false; message: string };

export type SingleRepositoryResult =
  | { success: true; data: RepositoryDetailObject }
  | { success: false; message: string };
