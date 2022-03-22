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
  const getRepos = (): void => {
    // repoPageStore.getRepo(owner, repo);
  };

  useEffect(() => {
    getRepos();
  }, [repoPageStore]);

  return (
    <div className="repo">Здесь должен быть репозиторий но его пока нет...</div>
  );
};

export default observer(ReposPage);
