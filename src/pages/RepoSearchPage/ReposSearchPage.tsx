import React, { useEffect, useState } from "react";

import Button from "@components/Button";
import Error from "@components/Error/Error";
import Input from "@components/Input";
import Loading from "@components/Loading/Loading";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";
import "./RepoSearchPage.scss";
import InputStore from "@store/InputStore/InputStore";
import { GitHubRepoBranchesModel } from "@store/models/gitHub/gitHubRepoBranches";
import { RepoItemModel } from "@store/models/gitHub/repoItem";
import RepoBranchesStore from "@store/RepoBranchesStore";
import ReposListStore from "@store/ReposListStore/ReposListStore";
import useLocalStore from "@store/rootStore/hooks/UseLocalStore";
import { useQueryParamsStoreInit } from "@store/rootStore/hooks/useQueryParamsStoreInit";
import { Meta } from "@utils/meta";
import { Drawer } from "antd";
import { observer } from "mobx-react-lite";

export const ReposSearchPage: React.FC = () => {
  useQueryParamsStoreInit();
  const [visible, setVisible] = useState(false);
  const reposListStore = useLocalStore(() => new ReposListStore());
  const inputStore = useLocalStore(() => new InputStore());
  const repoBranchesStore = useLocalStore(() => new RepoBranchesStore());
  const showDrawer = (repo: string) => {
    getBranches(repo);
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const getRepos = () => {
    inputStore.input !== "" &&
      reposListStore.getOrganizationReposList({
        organizationName: inputStore.input,
      });
  };
  const getBranches = (repo: string) => {
    repoBranchesStore.getRepoBranches(inputStore.input, repo);
  };
  useEffect(() => {
    getRepos();
  }, [reposListStore]);
  return (
    <div className="repo">
      <div className="repo__search">
        <Input
          value={inputStore.input}
          onChange={(event) => inputStore.setInput(event.currentTarget.value)}
          placeholder="Введите название организации"
        />
        <Button
          isDisabled={reposListStore.meta === Meta.loading}
          onClick={getRepos}
          inputValue={inputStore.input}
        >
          <SearchIcon />
        </Button>
      </div>
      <ul className="repo__list">
        {reposListStore.meta === Meta.loading ? (
          <Loading />
        ) : reposListStore.meta === Meta.error ? (
          <Error />
        ) : (
          reposListStore.list.map((item: RepoItemModel) => (
            <RepoTile key={item.id} item={item} showDrawer={showDrawer} />
          ))
        )}
      </ul>
      <Drawer
        title="Ветки репозитория"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <ul className="branches__list">
          {repoBranchesStore.branch.map((item: GitHubRepoBranchesModel) => (
            <li className="branches__list-item">{item.name}</li>
          ))}
        </ul>
      </Drawer>
    </div>
  );
};

export default observer(ReposSearchPage);
