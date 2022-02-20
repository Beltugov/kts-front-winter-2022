import React from "react";

import { IAvatar } from "../../types/types";

const Avatar: React.FC<IAvatar> = ({ src, alt, letter }) => {
  if (src) {
    return <img src={src} alt={alt} width={80} height={80} />;
  } else {
    return <span className="letter">{letter}</span>;
  }
};

export default Avatar;
