import React, { createContext, useEffect, useState } from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";
import "./RepoSearchPage.scss";
import GitHubStore from "@store/ReposListStore/ReposListStore";
import { RepoItem } from "@store/ReposListStore/types";
import useLocalStore from "@store/rootStore/hooks/UseLocalStore";
import { Meta } from "@utils/meta";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import { REPOS_ROUTE } from "../../routes";
import { ReposContext } from "./type";

export const context = createContext<ReposContext | null>(null);

export const ReposSearchPage: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const gitHubStore = useLocalStore(() => new GitHubStore());

  const getRepos = (input: string | null): void => {
    gitHubStore.getOrganizationReposList({
      organizationName: "ktsstudio",
    });
  };

  useEffect(() => {
    getRepos(null);
  }, [gitHubStore]);

  return (
    <div className="repo">
      <div className="repo__search">
        <Input
          value={searchInput}
          onChange={handleInput}
          placeholder={"Введите название организации"}
        />
        <Button
          isDisabled={gitHubStore.meta === Meta.loading}
          onClick={getRepos}
          inputValue={searchInput}
        >
          <SearchIcon />
        </Button>
      </div>
      <ul className="repo__list">
        {(gitHubStore.meta === Meta.loading && <div>Загрузка...</div>) ||
          (gitHubStore.meta === Meta.error && (
            <div>Что-то пошло не так...</div>
          ))}
        {gitHubStore.list.map((item: RepoItem) => (
          <Link to={REPOS_ROUTE + `/:${item.name}`}>
            <RepoTile key={item.id} item={item} onClick={() => {}} />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default observer(ReposSearchPage);
