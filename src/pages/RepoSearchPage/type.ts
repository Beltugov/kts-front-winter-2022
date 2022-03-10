import { RepoItem } from "../../store/GitHubStore/types";

export interface ReposContext {
  list: RepoItem[];
  isLoading: boolean;
}
