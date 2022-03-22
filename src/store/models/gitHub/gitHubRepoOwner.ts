export type GitHubOwnerApi = {
  id: number;
  url: string;
  avatar_url: string;
  login: string;
  name: string;
};

export type GitHubOwnerModel = {
  id: number;
  url: string;
  avatarUrl: string;
  login: string;
  name: string;
};

export const normalizeGitHubRepoOwner = (
  from: GitHubOwnerApi
): GitHubOwnerModel => ({
  id: from.id,
  url: from.url,
  avatarUrl: from.avatar_url,
  login: from.login,
  name: from.name,
});
