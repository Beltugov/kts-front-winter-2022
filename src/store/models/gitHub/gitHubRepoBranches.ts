export type GitHubRepoBranchesApi = {
  name: string;
};

export type GitHubRepoBranchesModel = {
  name: string;
};

export const normalizeGitHubRepoBranches = (
  from: GitHubRepoBranchesApi
): GitHubRepoBranchesModel => ({
  name: from.name,
});
