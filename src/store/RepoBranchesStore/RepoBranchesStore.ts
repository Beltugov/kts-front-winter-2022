import {
  GitHubRepoBranchesApi,
  GitHubRepoBranchesModel,
} from "@store/models/gitHub/gitHubRepoBranches";
import {
  normalizeGitHubRepoItem,
  RepoItemApi,
  RepoItemModel,
} from "@store/models/gitHub/repoItem";
import { IRepoBranchesStore } from "@store/RepoBranchesStore/types";
import { BASE_URL } from "@store/ReposListStore/ReposListStore";
import {
  GetOrganizationReposListParams,
  IReposListStore,
} from "@store/ReposListStore/types";
import { ILocalStore } from "@store/rootStore/hooks/UseLocalStore";
import { Meta } from "@utils/meta";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import ApiStore from "../rootStore/ApiStore";
import { HTTPMethod } from "../rootStore/ApiStore/types";

type PrivateFields = "_branch" | "_meta";

export default class RepoBranchesStore
  implements IRepoBranchesStore, ILocalStore
{
  private readonly _apiStore = new ApiStore(BASE_URL);

  private _branch: GitHubRepoBranchesModel[] = [];
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<RepoBranchesStore, PrivateFields>(this, {
      _branch: observable.ref,
      _meta: observable,
      branch: computed,
      meta: computed,
      getRepoBranches: action,
    });
  }

  get branch(): GitHubRepoBranchesModel[] {
    return this._branch;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getRepoBranches(owner: string, repo: string): Promise<void> {
    this._meta = Meta.loading;
    this._branch = [];
    const response = await this._apiStore.request<GitHubRepoBranchesApi[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/repos/${owner}/${repo}/branches`,
    });
    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }
      try {
        this._branch = response.data;
        this._meta = Meta.success;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        this._meta = Meta.error;
        this._branch = [];
      }
    });
  }

  destroy(): void {}
}
