import React from "react";

import { IAvatar } from "./types";

const Avatar: React.FC<IAvatar> = ({ src, alt, letter }) => {
  return src ? (
    <img src={src} alt={alt} width={80} height={80} />
  ) : (
    <span className="letter">{letter}</span>
  );
};

export default React.memo(Avatar);
