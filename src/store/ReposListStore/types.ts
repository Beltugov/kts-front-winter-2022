export type GetOrganizationReposListParams = {
  organizationName: string;
};

export interface IReposListStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams,
    page: number
  ): Promise<void>;
}
