// Здесь необходимо продемонстрировать создание и использование GitHubStore
import { ApiResponse } from "../shared/store/ApiStore/types";
import GitHubStore from "../store/GitHubStore/GitHubStore";
import { RepoItem } from "../store/GitHubStore/types";

const gitHubStore = new GitHubStore();
const EXAMPLE_ORGANIZATION = "ktsstudio";

const root = () => {
  gitHubStore
    .getOrganizationReposList({
      organizationName: EXAMPLE_ORGANIZATION,
    })
    .then((result: ApiResponse<RepoItem[], any>) => {});
};

export default root;
