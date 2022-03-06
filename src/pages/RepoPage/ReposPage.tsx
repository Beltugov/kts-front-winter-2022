import React, { useEffect } from "react";

import "./ReposPage.scss";
import RepoPageStore from "@store/RepoPageStore";
import useLocalStore from "@store/rootStore/hooks/UseLocalStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

const ReposPage = () => {
  const params = useParams();
  const repoPageStore = useLocalStore(() => new RepoPageStore());
  const repo = params.name?.slice(1);
  const getRepos = (input: string | null): void => {
    repoPageStore.getOrganizationRepo({
      owner: "ktsstudio",
      repo: repo,
    });
  };

  useEffect(() => {
    getRepos(null);
  }, [repoPageStore]);

  return (
    <div>
      <div>Пользователь {repoPageStore.repo.login}</div>
      <div>Репозиторий {repoPageStore.repo.name}</div>
    </div>
  );
};

export default observer(ReposPage);
