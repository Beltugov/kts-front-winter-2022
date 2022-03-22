import {
  normalizeGitHubRepoItem,
  RepoItemApi,
  RepoItemModel,
} from "@store/models/gitHub/repoItem";
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

export const BASE_URL = "https://api.github.com";

type PrivateFields = "_list" | "_meta";

export default class ReposListStore implements IReposListStore, ILocalStore {
  private readonly _apiStore = new ApiStore(BASE_URL);

  private _list: RepoItemModel[] = [];
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ReposListStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      getOrganizationReposList: action,
    });
  }

  get list(): RepoItemModel[] {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void> {
    this._meta = Meta.loading;
    this._list = [];

    const response = await this._apiStore.request<RepoItemApi[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/orgs/${params.organizationName}/repos`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }
      try {
        for (const item of response.data) {
          this._list.push(normalizeGitHubRepoItem(item));
        }
        this._meta = Meta.success;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        this._meta = Meta.error;
        this._list = [];
      }
    });
  }

  destroy(): void {}
}
