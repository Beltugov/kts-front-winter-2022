import React from "react";

import ReactLoading from "react-loading";
import "./Loading.scss";

const Loading = () => {
  return (
    <ReactLoading
      className="loading"
      type={"spin"}
      color={"#FF5555"}
      height={100}
      width={100}
    />
  );
};

export default Loading;
