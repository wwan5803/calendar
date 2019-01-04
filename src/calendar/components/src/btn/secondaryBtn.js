import React from "react";
import classNames from "classnames";
import "./secondary.scss";

export default ({ children, className, ...props }) => (
    <a styleName="btn" className={classNames(className)} {...props}>
        {children}
    </a>
);
