import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { updateHorizontalLayoutScrollTop } from "utils";
let ele;

export const PageContainer = ({ children }) => (
  <Scrollbars
    id="page-container"
    autoHide
    universal
    autoHideTimeout={1000}
    autoHideDuration={200}
    style={{ height: "100%" }}
    ref={el => (ele = el)}
    onScroll={e => updateHorizontalLayoutScrollTop(ele.getScrollTop())}
  >
    {children}
  </Scrollbars>
);
