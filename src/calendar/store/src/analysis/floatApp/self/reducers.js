import {
  UPDATE_FLOATAPP_SELF_ANALYSES,
  UPDATE_FLOATAPP_SELF_LATEST_UPDATED_ANALYSES,
  UPDATE_FLOATAPP_SELF_MOST_COMMENT_ANALYSES,
  UPDATE_FLOATAPP_SELF_MOST_LIKED_ANALYSES,
  UPDATE_FLOATAPP_SELF_MOST_SHARED_ANALYSES,
  UPDATE_FLOATAPP_SELF_MOST_VIEW_ANALYSES,
  UPDATE_FLOATAPP_SELF_MOST_FAVORITE_ANALYSES,
  UPDATE_FLOATAPP_SELF_ANALYSES_BY_DATE
} from "./types";
import { oneDayInMS } from "utils";
import { CLEAR_ACCOUNT, UPDATE_ACCOUNT } from "../../../account/types";
import Immutable from "immutable";
import { createReducer } from "redux-create-reducer";
import {
  generateCombinedReducer,
  COMBINED_ACTIONS
} from "../../../combinedHelper";

function analysesHandler(domain, action) {
  const { resultSet, ...rest } = action.payload;

  return {
    ...rest,
    resultSet: domain.resultSet.union(resultSet)
  };
}

function analysesByDateHandler(domain, action) {
  const { resultSet, ...rest } = action.payload;

  if (domain.from === action.payload.from) {
    return {
      ...rest,
      resultSet: domain.resultSet.union(resultSet)
    };
  }
  return {
    ...rest,
    resultSet: resultSet
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

export const floatAppSelfAnalyses = createReducer(initDomain(), {
  [UPDATE_FLOATAPP_SELF_ANALYSES]: analysesHandler,
  [UPDATE_ACCOUNT]: (domain, action) =>
    action.payload.authenticated ? initDomain() : domain,
  [CLEAR_ACCOUNT]: () => initDomain(),
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_FLOATAPP_SELF_ANALYSES,
      handler: analysesHandler
    }
  ])
});

export const floatAppSelfMostSharedAnalyses = createReducer(initDomain(), {
  [UPDATE_FLOATAPP_SELF_MOST_SHARED_ANALYSES]: analysesHandler,
  [UPDATE_ACCOUNT]: (domain, action) =>
    action.payload.authenticated ? initDomain() : domain,
  [CLEAR_ACCOUNT]: () => initDomain(),
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_FLOATAPP_SELF_MOST_SHARED_ANALYSES,
      handler: analysesHandler
    }
  ])
});

export const floatAppSelfMostLikedAnalyses = createReducer(initDomain(), {
  [UPDATE_FLOATAPP_SELF_MOST_LIKED_ANALYSES]: analysesHandler,
  [UPDATE_ACCOUNT]: (domain, action) =>
    action.payload.authenticated ? initDomain() : domain,
  [CLEAR_ACCOUNT]: () => initDomain(),
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_FLOATAPP_SELF_MOST_LIKED_ANALYSES,
      handler: analysesHandler
    }
  ])
});

export const floatAppSelfMostViewAnalyses = createReducer(initDomain(), {
  [UPDATE_FLOATAPP_SELF_MOST_VIEW_ANALYSES]: analysesHandler,
  [UPDATE_ACCOUNT]: (domain, action) =>
    action.payload.authenticated ? initDomain() : domain,
  [CLEAR_ACCOUNT]: () => initDomain(),
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_FLOATAPP_SELF_MOST_VIEW_ANALYSES,
      handler: analysesHandler
    }
  ])
});

export const floatAppSelfMostCommentAnalyses = createReducer(initDomain(), {
  [UPDATE_FLOATAPP_SELF_MOST_COMMENT_ANALYSES]: analysesHandler,
  [UPDATE_ACCOUNT]: (domain, action) =>
    action.payload.authenticated ? initDomain() : domain,
  [CLEAR_ACCOUNT]: () => initDomain(),
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_FLOATAPP_SELF_MOST_COMMENT_ANALYSES,
      handler: analysesHandler
    }
  ])
});

export const floatAppSelfMostFavoriteAnalyses = createReducer(initDomain(), {
  [UPDATE_FLOATAPP_SELF_MOST_FAVORITE_ANALYSES]: analysesHandler,
  [UPDATE_ACCOUNT]: (domain, action) =>
    action.payload.authenticated ? initDomain() : domain,
  [CLEAR_ACCOUNT]: () => initDomain(),
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_FLOATAPP_SELF_MOST_FAVORITE_ANALYSES,
      handler: analysesHandler
    }
  ])
});

export const floatAppSelfLatestUpdateAnalyses = createReducer(initDomain(), {
  [UPDATE_FLOATAPP_SELF_LATEST_UPDATED_ANALYSES]: analysesHandler,
  [UPDATE_ACCOUNT]: (domain, action) =>
    action.payload.authenticated ? initDomain() : domain,
  [CLEAR_ACCOUNT]: () => initDomain(),
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_FLOATAPP_SELF_LATEST_UPDATED_ANALYSES,
      handler: analysesHandler
    }
  ])
});

function initDomainByDate() {
  return {
    updated_time: new Date(),
    resultSet: Immutable.Set(),
    has_more: false,
    next_page_url: "",
    from: new Date().toISOString().substr(0, 10),
    to: new Date(new Date().getTime() + oneDayInMS).toISOString().substr(0, 10)
  };
}

export const floatAppSelfAnalysesByDate = createReducer(initDomainByDate(), {
  [UPDATE_FLOATAPP_SELF_ANALYSES_BY_DATE]: analysesByDateHandler,
  [UPDATE_ACCOUNT]: (domain, action) =>
    action.payload.authenticated ? initDomainByDate() : domain,
  [CLEAR_ACCOUNT]: () => initDomainByDate(),
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_FLOATAPP_SELF_ANALYSES_BY_DATE,
      handler: analysesByDateHandler
    }
  ])
});
