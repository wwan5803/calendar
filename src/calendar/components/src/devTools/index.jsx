import React from "react";
import { createDevTools } from "redux-devtools";
import LogMonitor from "redux-devtools-log-monitor";
import DockMonitor from "redux-devtools-dock-monitor";
// import FilterableLogMonitor from "redux-devtools-filterable-log-monitor";
import SliderMonitor from "redux-slider-monitor";
// import DiffMonitor from "redux-devtools-diff-monitor";
// import Dispatcher from "redux-devtools-dispatch";
// import Inspector from "redux-devtools-inspector";

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-w"
    changeMonitorKey="ctrl-m"
    defaultIsVisible={false}
  >
    <LogMonitor />
    {/*<FilterableLogMonitor />*/}
    <SliderMonitor keyboardEnabled />
    {/*<DiffMonitor />*/}
    {/*<Dispatcher />*/}
    {/*<Inspector />*/}
  </DockMonitor>
);

export default DevTools;
