import { GitHubOwnerModel } from "@store/models/gitHub/gitHubRepoOwner";
import { RepoItemApi } from "@store/models/gitHub/repoItem";
import { IRepoStore } from "@store/RepoPageStore/types";
import ApiStore from "@store/rootStore/ApiStore";
import { HTTPMethod } from "@store/rootStore/ApiStore/types";
import { ILocalStore } from "@store/rootStore/hooks/UseLocalStore";
import { Meta } from "@utils/meta";
import { computed, makeObservable, observable } from "mobx";

const BASE_URL = "https://api.github.com";

type PrivateFields = "_repo" | "_meta";

export default class RepoPageStore implements IRepoStore, ILocalStore {
  private readonly _apiStore = new ApiStore(BASE_URL);

  private _repo: GitHubOwnerModel = {
    id: 0,
    url: "",
    avatarUrl: "",
    login: "",
    name: "",
  };
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<RepoPageStore, PrivateFields>(this, {
      _repo: observable.ref,
      _meta: observable,
      repo: computed,
      meta: computed,
    });
  }

  get repo(): GitHubOwnerModel {
    return this._repo;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getRepo(owner: string, repo: string | undefined): Promise<void> {
    this._meta = Meta.loading;
    this._repo = {
      id: 0,
      url: "",
      avatarUrl: "",
      login: "",
      name: "",
    };

    const response = await this._apiStore.request<RepoItemApi[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/repos/${owner}/${repo}`,
    });
    const repoInfo = await response.data;
    if (response.success) {
      this._meta = Meta.success;
      this._repo = {
        id: repoInfo.owner.id,
        url: repoInfo.owner.url,
        avatarUrl: repoInfo.owner.avatar_url,
        login: repoInfo.owner.login,
        name: repoInfo.name,
      };
      return;
    }
    this._meta = Meta.error;
  }

  destroy(): void {}
}
