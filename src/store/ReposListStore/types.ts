import { GitHubOwner } from "@store/RepoPageStore/types";

export type GetOrganizationReposListParams = {
  organizationName: string;
};

export type RepoItem = {
  id: number;
  url: string;
  name: string;
  stargazers_count: number;
  updated_at: string;
  owner: GitHubOwner;
};

export interface IGitHubStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void>;
}
