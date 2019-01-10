import { encodeParams, urlToObject } from "./src/paramsParser";
import {
  calcSize,
  DESKTOP,
  initialWidth,
  LAPTOP,
  MOBILE,
  TABLET
} from "./src/widthCalculator";
import { animateScroll } from "./src/scrollHelper";
import isBrowser from "./src/isBrowser";
import Hammer from "./src/hammer";
import {
  getHorizontalLayoutScrollTop,
  updateHorizontalLayoutScrollTop,
  registerScrollTopHandler
} from "./src/horizontalLayoutScrollHelper";
import metaLinkParser from "./src/metaLinkParser";
import chooseMetaData from './src/metaHelper';

export polyfill from "./src/polyfill";
export const oneDayInMS = 24 * 3600 * 1000;
export const oneWeekInMS = 7 * 24 * 3600 * 1000;
export const defaultOffset = -(new Date().getTimezoneOffset() / 60);
export const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
export {
  Hammer,
  calcSize,
  DESKTOP,
  initialWidth,
  LAPTOP,
  MOBILE,
  TABLET,
  encodeParams,
  urlToObject,
  isBrowser,
  animateScroll,
  getHorizontalLayoutScrollTop,
  updateHorizontalLayoutScrollTop,
  registerScrollTopHandler,
  metaLinkParser,
  chooseMetaData
};
