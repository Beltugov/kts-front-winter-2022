import { RepoItem } from "../../store/ReposListStore/types";

export type ReposContext = {
  list: RepoItem[];
  isLoading: boolean;
  load: (input: string | null) => void;
};
