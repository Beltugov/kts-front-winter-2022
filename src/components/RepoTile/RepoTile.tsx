import React from "react";

import Avatar from "@components/Avatar";
import StarIcon from "@components/StarIcon";
import "./RepoTile.scss";
import { REPOS_ROUTE } from "@utils/routes";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";

import { IRepoTile } from "./types";

const RepoTile: React.FC<IRepoTile> = ({ item, showDrawer }) => {
  return (
    <div className="wrapper">
      <div className="cart">
        <Link className="cart__link" to={`${REPOS_ROUTE}/:${item.name}`}>
          <div className="cart__avatar">
            <Avatar
              src={item.owner.avatarUrl}
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
              <span className="star-counter">{item.stargazersCount}</span>
              <span className="star-data-update">
                Update {dateFormat(item.updatedAt, "dd.mm.yyyy")}
              </span>
            </div>
          </div>
        </Link>
      </div>
      <button
        className="cart__button-drawer"
        onClick={() => showDrawer(item.name)}
      >
        Посмотреть ветки репозитория
      </button>
    </div>
  );
};

export default RepoTile;
