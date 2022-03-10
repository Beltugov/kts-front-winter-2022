import React, { ChangeEvent, createContext, useEffect, useState } from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";
import "./RepoSearchPage.scss";

import GitHubStore from "../../store/GitHubStore/GitHubStore";
import { RepoItem } from "../../store/GitHubStore/types";
import { ReposContext } from "./type";

export const context = createContext<ReposContext | null>(null);

const ReposSearchPage: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reposArr, setReposArr] = useState<RepoItem[]>([]);

  const [gitHubStore] = useState(() => new GitHubStore());

  async function getRepos(input: string) {
    setIsLoading(true);
    try {
      const response = await gitHubStore.getOrganizationReposList({
        organizationName: input,
      });
      const data = await response.data;
      setReposArr(data);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    searchInput !== "" && getRepos(searchInput);
  }, []);

  return (
    <context.Provider value={{ list: reposArr, isLoading: isLoading }}>
      <div className="repo">
        <div className="repo__search">
          <Input
            value={searchInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchInput(e.target.value)
            }
            placeholder="Введите название организации"
          />
          <Button
            isDisabled={isLoading}
            onClick={getRepos}
            inputValue={searchInput}
          >
            <SearchIcon />
          </Button>
        </div>
        <ul className="repo__list">
          {!isLoading &&
            reposArr.map((item: RepoItem) => (
              <RepoTile key={item.id} item={item} />
            ))}
        </ul>
      </div>
    </context.Provider>
  );
};

export default ReposSearchPage;
