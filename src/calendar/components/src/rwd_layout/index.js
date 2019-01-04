import React from "react";
import classNames from "classnames";
function generateGlobalClassDivComponent(name) {
  return ({ children, className, ...props }) => (
    <div className={classNames(name, className)} {...props}>
      {children}
    </div>
  );
}

export const Container = ({
  smallContainer,
  children,
  className,
  ...props
}) => (
  <div
    className={classNames(
      smallContainer ? "container small-container" : "container",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
export const Row = generateGlobalClassDivComponent("row");
export const Col = generateGlobalClassDivComponent("col");
