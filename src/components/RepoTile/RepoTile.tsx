import React from "react";

import Avatar from "@components/Avatar";
import StarIcon from "@components/StarIcon";
import "./RepoTile.scss";
import { Link } from "react-router-dom";

import { REPOS_ROUTE } from "../../routes";
import { IRepoTile } from "./types";

const RepoTile: React.FC<IRepoTile> = ({ item }) => {
  return (
    <Link to={`${REPOS_ROUTE}/:${item.name}`}>
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
    </Link>
  );
};

export default RepoTile;
