import { createReducer } from "redux-create-reducer";
import { UPDATE_FLOATAPP_FAVORITE_ANALYSES } from "./types";
import { FAVOURITE_AN_ANALYSIS, UN_FAVOURITE_AN_ANALYSIS } from "../../types";
import { CLEAR_ACCOUNT, UPDATE_ACCOUNT } from "../../../account/types";
import {
  generateCombinedReducer,
  COMBINED_ACTIONS
} from "../../../combinedHelper";
import Immutable from "immutable";

function handler(domain, action) {
  const { resultSet, ...rest } = action.payload;

  return {
    ...rest,
    resultSet: domain.resultSet.union(resultSet)
  };
}

function favoriteAnalysisHandler(domain, action) {
  const analysisId = action.analysisId;
  const { resultSet, ...rest } = domain;

  return {
    ...rest,
    resultSet: resultSet.add(analysisId)
  };
}

function unFavoriteAnalysisHandler(domain, action) {
  const analysisId = action.analysisId;
  const { resultSet, next_page_url, ...rest } = domain;

  return {
    ...rest,
    next_page_url: next_page_url
      ? next_page_url.replace(/(?!per_)page=(\d*)/g, "page=1")
      : next_page_url,
    resultSet: resultSet.remove(analysisId)
  };
}

function initDomain() {
  return {
    updated_time: new Date(),
    has_more: !!0,
    next_page_url: "",
    resultSet: Immutable.Set()
  };
}

export const floatAppFavoriteAnalyses = createReducer(initDomain(), {
  [UPDATE_FLOATAPP_FAVORITE_ANALYSES]: handler,
  [UPDATE_ACCOUNT]: (domain, action) =>
    action.payload.authenticated ? initDomain() : domain,
  [CLEAR_ACCOUNT]: () => initDomain(),
  [FAVOURITE_AN_ANALYSIS]: favoriteAnalysisHandler,
  [UN_FAVOURITE_AN_ANALYSIS]: unFavoriteAnalysisHandler,
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_FLOATAPP_FAVORITE_ANALYSES,
      handler
    }
  ])
});
