import { Meta } from "@utils/meta";
import { computed, makeObservable, observable } from "mobx";

import ApiStore from "../rootStore/ApiStore";
import { HTTPMethod } from "../rootStore/ApiStore/types";
import {
  GetOrganizationReposListParams,
  IGitHubStore,
  RepoItem,
} from "./types";

const BASE_URL = "https://api.github.com";

type PrivateFields = "_list" | "_meta";

export default class ReposListStore implements IGitHubStore {
  private readonly _apiStore = new ApiStore(BASE_URL);

  private _list: RepoItem[] = [];
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ReposListStore, PrivateFields>(this, {
      _list: observable,
      _meta: observable,
      list: computed,
      meta: computed,
    });
  }

  get list(): RepoItem[] {
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

    const response = await this._apiStore.request<RepoItem[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/orgs/${params.organizationName}/repos`,
    });

    const repoArr = await response.data;

    if (response.success) {
      this._meta = Meta.success;
      this._list = repoArr;
      return;
    }
    this._meta = Meta.error;
  }

  destroy(): void {}
}
