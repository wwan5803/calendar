import {
  UPDATE_SELF_ANALYSES,
  UPDATE_SELF_MOST_COMMENT_ANALYSES,
  UPDATE_SELF_MOST_LIKED_ANALYSES,
  UPDATE_SELF_MOST_SHARED_ANALYSES,
  UPDATE_SELF_MOST_VIEW_ANALYSES,
  UPDATE_SELF_LATEST_UPDATED_ANALYSES,
  UPDATE_SELF_MOST_FAVORITE_ANALYSES,
  UPDATE_SELF_ANALYSES_BY_DATE
} from "./types";
import { CLEAR_ACCOUNT, UPDATE_ACCOUNT } from "../../account/types";
import Immutable from "immutable";
import { createReducer } from "redux-create-reducer";
import {
  generateCombinedReducer,
  COMBINED_ACTIONS
} from "../../combinedHelper";

function initDomain() {
  return {
    updated_time: new Date(),
    has_more: !!0,
    next_page_url: "",
    resultSet: Immutable.Set()
  };
}

function handler(domain, action) {
  const { resultSet, ...rest } = action.payload;

  return {
    ...rest,
    resultSet: domain.resultSet.union(resultSet)
  };
}

function regenerateAnalysisByDate(domain, action) {
  const { resultSet, from, ...rest } = action.payload;

  return {
    ...rest,
    resultSet:
      from === domain.from ? domain.resultSet.union(resultSet) : resultSet
  };
}

export const selfAnalyses = createReducer(initDomain(), {
  [UPDATE_SELF_ANALYSES]: handler,
  [UPDATE_ACCOUNT]: (domain, action) =>
    action.payload.authenticated ? initDomain() : domain,
  [CLEAR_ACCOUNT]: () => initDomain(),
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_SELF_ANALYSES,
      handler
    }
  ])
});

export const selfMostSharedAnalysis = createReducer(initDomain(), {
  [UPDATE_SELF_MOST_SHARED_ANALYSES]: handler,
  [UPDATE_ACCOUNT]: (domain, action) =>
    action.payload.authenticated ? initDomain() : domain,
  [CLEAR_ACCOUNT]: () => initDomain(),
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_SELF_MOST_SHARED_ANALYSES,
      handler
    }
  ])
});

export const selfMostLikedAnalyses = createReducer(initDomain(), {
  [UPDATE_SELF_MOST_LIKED_ANALYSES]: handler,
  [UPDATE_ACCOUNT]: (domain, action) =>
    action.payload.authenticated ? initDomain() : domain,
  [CLEAR_ACCOUNT]: () => initDomain(),
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_SELF_MOST_LIKED_ANALYSES,
      handler
    }
  ])
});

export const selfMostViewAnalyses = createReducer(initDomain(), {
  [UPDATE_SELF_MOST_VIEW_ANALYSES]: handler,
  [UPDATE_ACCOUNT]: (domain, action) =>
    action.payload.authenticated ? initDomain() : domain,
  [CLEAR_ACCOUNT]: () => initDomain(),
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_SELF_MOST_VIEW_ANALYSES,
      handler
    }
  ])
});

export const selfMostCommentAnalyses = createReducer(initDomain(), {
  [UPDATE_SELF_MOST_COMMENT_ANALYSES]: handler,
  [UPDATE_ACCOUNT]: (domain, action) =>
    action.payload.authenticated ? initDomain() : domain,
  [CLEAR_ACCOUNT]: () => initDomain(),
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_SELF_MOST_COMMENT_ANALYSES,
      handler
    }
  ])
});

export const selfMostFavoriteAnalyses = createReducer(initDomain(), {
  [UPDATE_SELF_MOST_FAVORITE_ANALYSES]: handler,
  [UPDATE_ACCOUNT]: (domain, action) =>
    action.payload.authenticated ? initDomain() : domain,
  [CLEAR_ACCOUNT]: () => initDomain(),
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_SELF_MOST_FAVORITE_ANALYSES,
      handler
    }
  ])
});

export const selfLatestUpdateAnalyses = createReducer(initDomain(), {
  [UPDATE_SELF_LATEST_UPDATED_ANALYSES]: handler,
  [UPDATE_ACCOUNT]: (domain, action) =>
    action.payload.authenticated ? initDomain() : domain,
  [CLEAR_ACCOUNT]: () => initDomain(),
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_SELF_LATEST_UPDATED_ANALYSES,
      handler
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
    to: new Date(new Date().getTime() + 3600 * 1000 * 24)
      .toISOString()
      .substr(0, 10)
  };
}

export const selfAnalysesByDate = createReducer(initDomainByDate(), {
  [UPDATE_SELF_ANALYSES_BY_DATE]: regenerateAnalysisByDate,
  [UPDATE_ACCOUNT]: (domain, action) =>
    action.payload.authenticated ? initDomainByDate() : domain,
  [CLEAR_ACCOUNT]: () => initDomainByDate(),
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_SELF_ANALYSES_BY_DATE,
      handler: regenerateAnalysisByDate
    }
  ])
});
