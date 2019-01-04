import { encodeParams, urlToObject } from "./src/paramsParser";
import {
  calcSize,
  DESKTOP,
  initialWidth,
  LAPTOP,
  MOBILE,
  TABLET
} from "./src/widthCalculator";
import {
  showCommonNetWorkErrorTip,
  showTip,
  COMMON_NET_WORK_ERROR,
  subscribeGlobalTipHandler
} from "./src/globalTipHelper";
import authHelper from "./src/authHelper";
import { animateScroll } from "./src/scrollHelper";
import isBrowser from "./src/isBrowser";
import Hammer from "./src/hammer";
import {
  getTheShowingStrategy,
  STRATEGY_ACTIVE,
  STRATEGY_FAIL,
  STRATEGY_STAND_BY,
  STRATEGY_SUCCESS,
  STRATEGY_TREND_TO_SUCCESS,
  STRATEGY_TREND_TO_FAIL,
  STRATEGY_USELESS,
  calcStrategyStatus,
  isValidStrategy,
  isUsefulStrategy,
  generateUpdateStrategiesActions
} from "./src/strategiesHelper";
import {
  sortAnalysesIdSetByCreatedTime,
  sortAnalysesIdSetByLikeCount,
  sortAnalysesIdSetByUpdatedTime,
  sortAnalysesIdSetByCommentCount,
  sortAnalysesIdSetByViewCount,
  sortAnalysesIdSetByFavoriteCount
} from "./src/analysesSorter";
import {
  generateAnalysisUrl,
  getAnalysisIdFromPathname
} from "./src/analysisUrlHelper";
import customisedSuggestionsFilter from "./src/richEditorHelper";
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
  showCommonNetWorkErrorTip,
  showTip,
  generateAnalysisUrl,
  getAnalysisIdFromPathname,
  COMMON_NET_WORK_ERROR,
  subscribeGlobalTipHandler,
  isBrowser,
  animateScroll,
  authHelper,
  getTheShowingStrategy,
  calcStrategyStatus,
  isValidStrategy,
  isUsefulStrategy,
  STRATEGY_ACTIVE,
  STRATEGY_FAIL,
  STRATEGY_STAND_BY,
  STRATEGY_SUCCESS,
  STRATEGY_USELESS,
  STRATEGY_TREND_TO_SUCCESS,
  STRATEGY_TREND_TO_FAIL,
  sortAnalysesIdSetByCreatedTime,
  sortAnalysesIdSetByLikeCount,
  sortAnalysesIdSetByUpdatedTime,
  sortAnalysesIdSetByCommentCount,
  sortAnalysesIdSetByViewCount,
  sortAnalysesIdSetByFavoriteCount,
  generateUpdateStrategiesActions,
  customisedSuggestionsFilter,
  getHorizontalLayoutScrollTop,
  updateHorizontalLayoutScrollTop,
  registerScrollTopHandler,
  metaLinkParser,
  chooseMetaData
};
