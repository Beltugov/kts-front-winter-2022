import React from "react";

import { IRepoTile } from "../../types/types";
import Avatar from "../Avatar";
import StarIcon from "../StarIcon";

import "./RepoTile.css";

const RepoTile: React.FC<IRepoTile> = ({ item, onClick }) => {
  // console.log(item);
  return (
    <li className="cart">
      <div className="cart__avatar">
        <Avatar
          src={item.owner.avatar_url}
          alt={"Avatar"}
          letter={item.name[0].toUpperCase()}
        />
      </div>
      <div className="cart-info">
        <div className="cart-info__title">{item.name}</div>
        <div className="cart-info__org-link">
          <a href="#">{item.name}</a>
        </div>
        <div className="cart-info__star">
          <span className="star-icon">
            <StarIcon />
          </span>
          <span className="star-counter">{item.stargazers_count}</span>
          <span className="star-data-update">
            Update {item.updated_at.slice(0, 10)}
          </span>
        </div>
      </div>
    </li>
  );
};

export default RepoTile;
