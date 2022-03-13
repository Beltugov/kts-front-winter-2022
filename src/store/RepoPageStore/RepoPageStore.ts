import { GetOrganizationRepo, GitHubOwner } from "@store/RepoPageStore/types";
import { RepoItem } from "@store/ReposListStore/types";
import ApiStore from "@store/rootStore/ApiStore";
import { HTTPMethod } from "@store/rootStore/ApiStore/types";
import { Meta } from "@utils/meta";
import { computed, makeObservable, observable } from "mobx";

const BASE_URL = "https://api.github.com";

type PrivateFields = "_repo" | "_meta";

export default class RepoPageStore {
  private readonly _apiStore = new ApiStore(BASE_URL);

  private _repo: GitHubOwner = {
    id: 0,
    url: "",
    avatar_url: "",
    login: "",
    name: "",
  };
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<RepoPageStore, PrivateFields>(this, {
      _repo: observable,
      _meta: observable,
      repo: computed,
      meta: computed,
    });
  }

  get repo(): GitHubOwner {
    return this._repo;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getOrganizationRepo(params: GetOrganizationRepo): Promise<void> {
    this._meta = Meta.loading;
    this._repo = {
      id: 0,
      url: "",
      avatar_url: "",
      login: "",
      name: "",
    };

    const response = await this._apiStore.request<RepoItem[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/repos/${params.owner}/${params.repo}`,
    });
    const repoInfo = await response.data;
    if (response.success) {
      this._meta = Meta.success;
      this._repo = {
        id: repoInfo.owner.id,
        url: repoInfo.owner.url,
        avatar_url: repoInfo.owner.avatar_url,
        login: repoInfo.owner.login,
        name: repoInfo.name,
      };
      return;
    }
    this._meta = Meta.error;
  }

  destroy(): void {}
}
