export interface IRepoStore {
  getRepo(owner: string, repo: string | undefined): Promise<void>;
}
