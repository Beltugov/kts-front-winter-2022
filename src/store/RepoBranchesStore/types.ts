export interface IRepoBranchesStore {
  getRepoBranches(owner: string, repo: string): Promise<void>;
}
