import React from "react";
import "./layout.scss";
import classNames from "classnames";

function generateDivComponent(name) {
  return ({ children, className, refHandler, ...props }) => (
    <div
      styleName={name}
      className={classNames(className)}
      ref={refHandler}
      {...props}
    >
      {children}
    </div>
  );
}

export const CMTable = generateDivComponent("table");
export const CMCell = generateDivComponent("cell");
export const CMContent = generateDivComponent("content");

export function CenterMiddle({ children, className, ...props }) {
  return (
    <CMTable className={className} {...props}>
      <CMCell>
        <CMContent>{children}</CMContent>
      </CMCell>
    </CMTable>
  );
}
