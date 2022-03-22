import {
  GitHubOwnerApi,
  GitHubOwnerModel,
  normalizeGitHubRepoOwner,
} from "@store/models/gitHub/gitHubRepoOwner";

export type RepoItemApi = {
  id: number;
  url: string;
  name: string;
  stargazers_count: number;
  updated_at: string;
  description: string;
  owner: GitHubOwnerApi;
};

export type RepoItemModel = {
  id: number;
  url: string;
  name: string;
  stargazersCount: number;
  updatedAt: Date;
  description: string;
  owner: GitHubOwnerModel;
};

export const normalizeGitHubRepoItem = (from: RepoItemApi): RepoItemModel => ({
  id: from.id,
  url: from.url,
  name: from.name,
  stargazersCount: from.stargazers_count,
  updatedAt: new Date(from.updated_at),
  description: from.description,
  owner: normalizeGitHubRepoOwner(from.owner),
});
