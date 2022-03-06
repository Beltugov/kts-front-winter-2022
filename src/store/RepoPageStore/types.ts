export type GetOrganizationRepo = {
  owner: string;
  repo: string | undefined;
};

export type GitHubOwner = {
  id: number;
  url: string;
  avatar_url: string;
  login: string;
  name: string;
};
