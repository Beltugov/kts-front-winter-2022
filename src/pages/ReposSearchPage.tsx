import React, { useEffect, useState } from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";
import "./RepoSearchPage.scss";

import { ApiResponse } from "../shared/store/ApiStore/types";
import GitHubStore from "../store/GitHubStore/GitHubStore";
import { RepoItem } from "../store/GitHubStore/types";

const ReposSearchPage: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reposArr, setReposArr] = useState<RepoItem[]>([]);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const [gitHubStore] = useState(() => new GitHubStore());

  const getRepos = (input: string | null): void => {
    setIsLoading(true);
    gitHubStore
      .getOrganizationReposList({
        organizationName: "ktsstudio",
      })
      .then((res: ApiResponse<RepoItem[], any>) => {
        return res.data;
      })
      .then((res: RepoItem[]) => {
        input !== null
          ? setReposArr(
              res.filter((item) =>
                item.name.toLowerCase().includes(input.toLowerCase())
              )
            )
          : setReposArr(res);
        setIsLoading(false);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e);
      });
  };

  useEffect(() => {
    getRepos(null);
  }, []);

  return (
    <div className="repo">
      <div className="repo__search">
        <Input
          value={searchInput}
          onChange={handleInput}
          placeholder={"Введите название организации"}
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
            <RepoTile key={item.id} item={item} onClick={() => {}} />
          ))}
      </ul>
    </div>
  );
};

export default ReposSearchPage;
