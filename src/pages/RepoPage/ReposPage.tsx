import React, { useContext } from "react";

import "./ReposPage.scss";
import { context } from "../RepoSearchPage/ReposSearchPage";

const ReposPage = () => {
  const someContext = useContext(context);

  return <div>{someContext?.list}</div>;
};

export default ReposPage;
