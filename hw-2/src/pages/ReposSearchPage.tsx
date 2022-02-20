import React, { useEffect, useState } from "react";

import Button from "../components/Button";
import Input from "../components/Input";
import RepoTile from "../components/RepoTile";
import SearchIcon from "../components/SearchIcon";
import GitHubStore from "../store/GitHubStore/GitHubStore";
import { RepoItem } from "../store/GitHubStore/types";

const ReposSearchPage = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reposArr, setReposArr] = useState<RepoItem[]>([]);
  const isDisabledSearch: boolean = false;
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const gitHubStore = new GitHubStore();
  useEffect(() => {
    const fetchRepos = async () => {
      setIsLoading(true);
      const arr = await gitHubStore
        .getOrganizationReposList({
          organizationName: "ktsstudio",
        })
        .then((res: any) => {
          return res.data;
        });
      setReposArr(arr);
      setIsLoading(false);
    };
    fetchRepos();
  }, []);

  return (
    <div className="repo">
      <div className="repo__search">
        <Input
          value={searchInput}
          onChange={handleInput}
          placeholder={"Введите название организации"}
        />
        <Button isDisabled={isDisabledSearch}>{<SearchIcon />}</Button>
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
