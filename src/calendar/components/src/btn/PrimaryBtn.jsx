import React from "react";
import classNames from "classnames";
import "./primary.scss";

export default ({ children, className, ...props }) => (
  <a styleName="btn" className={classNames(className)} {...props}>
    {children}
  </a>
);
