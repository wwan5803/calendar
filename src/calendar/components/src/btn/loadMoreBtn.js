import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import "./secondary.scss";
import langContent from "language";

const LoadMoreBtn = ({ className, language, onClick }) => {
  return (
    <a styleName="btn" className={classNames(className)} onClick={onClick}>
      {langContent[language].components.userBehavior.loadMore}
    </a>
  );
};

export default LoadMoreBtn
