import {
  UPDATE_SEARCH_ANALYSES,
  UPDATE_SEARCH_PROFILE_ANALYSES,
  UPDATE_FAVORITE_PROFILE_ANALYSES
} from "./types";
import { CLEAR_ACCOUNT, UPDATE_ACCOUNT } from "../../account/types";
import Immutable from "immutable";
import {
  generateCombinedReducer,
  COMBINED_ACTIONS
} from "../../combinedHelper";
import { createReducer } from "redux-create-reducer";

function handler(domain, action) {
  if (domain.query_options !== action.payload.query_options)
    return action.payload;
  const { resultSet, ...rest } = action.payload;

  return {
    ...rest,
    resultSet: domain.resultSet.union(resultSet)
  };
}

function handlerSearchProfileAnalyses(domain, action) {
  const nextDomain = action.payload;

  if (
    domain.query_options !== nextDomain.query_options ||
    domain.accountId !== nextDomain.accountId
  )
    return nextDomain;
  const { resultSet, ...rest } = action.payload;

  return {
    ...rest,
    resultSet: domain.resultSet.union(resultSet)
  };
}

function handlerSearchFavoriteAnalyses(domain, action) {
  const nextDomain = action.payload;

  if (
    domain.query_options !== nextDomain.query_options ||
    domain.accountId !== nextDomain.accountId
  )
    return action.payload;
  const { resultSet, ...rest } = action.payload;

  return {
    ...rest,
    resultSet: domain.resultSet.union(resultSet)
  };
}

function initDomain() {
  return {
    query_options: "",
    updated_time: new Date(),
    has_more: !!0,
    next_page_url: "",
    resultSet: Immutable.Set()
  };
}

export const searchAnalyses = createReducer(initDomain(), {
  [UPDATE_SEARCH_ANALYSES]: handler,
  [UPDATE_SEARCH_PROFILE_ANALYSES]: handlerSearchProfileAnalyses,
  [UPDATE_FAVORITE_PROFILE_ANALYSES]: handlerSearchFavoriteAnalyses,
  [UPDATE_ACCOUNT]: (domain, action) =>
    action.payload.authenticated ? initDomain() : domain,
  [CLEAR_ACCOUNT]: () => initDomain(),
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_SEARCH_ANALYSES,
      handler
    }
  ])
});
