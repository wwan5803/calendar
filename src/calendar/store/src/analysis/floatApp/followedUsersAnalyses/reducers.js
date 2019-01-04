import { UPDATE_FLOATAPP_FOLLOWED_USERS_ANALYSIS } from "./types";
import { CLEAR_ACCOUNT, UPDATE_ACCOUNT } from "../../../account/types";
import Immutable from "immutable";
import { createReducer } from "redux-create-reducer";
import { UN_FOLLOW_AN_USER, FOLLOW_AN_USER } from "../../../users/types";
import {
  generateCombinedReducer,
  COMBINED_ACTIONS
} from "../../../combinedHelper";

function handler(domain, action) {
  const { resultSet, ...rest } = action.payload;

  return {
    ...rest,
    resultSet: domain.resultSet.union(resultSet)
  };
}

function updateAnalysisAfterFollowUser(domain, action) {
  const { resultSet, ...rest } = domain;
  const updatedSet = resultSet.withMutations(tmp => {
    action.analyses.map(analysis => {
      const { creator, id } = analysis.toJS();
      if (creator === action.userId) {
        tmp.add(id);
      }
    });
  });

  return {
    ...rest,
    resultSet: Immutable.is(updatedSet, resultSet) ? resultSet : updatedSet
  };
}

function updateAnalysisAfterUnfollowUser(domain, action) {
  const { resultSet, next_page_url, ...rest } = domain;
  const updatedSet = resultSet.withMutations(tmp => {
    action.analyses.map(analysis => {
      const { creator, id } = analysis.toJS();
      if (creator === action.userId) {
        tmp.delete(id);
      }
    });
  });

  return {
    ...rest,
    next_page_url: next_page_url
      ? next_page_url.replace(/(?!per_)page=(\d*)/g, "page=1")
      : next_page_url,
    resultSet: Immutable.is(updatedSet, resultSet) ? resultSet : updatedSet
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

export const floatAPPFollowedUsersAnalysis = createReducer(initDomain(), {
  [UPDATE_FLOATAPP_FOLLOWED_USERS_ANALYSIS]: handler,
  [FOLLOW_AN_USER]: updateAnalysisAfterFollowUser,
  [UN_FOLLOW_AN_USER]: updateAnalysisAfterUnfollowUser,
  [UPDATE_ACCOUNT]: (domain, action) =>
    action.payload.authenticated ? initDomain() : domain,
  [CLEAR_ACCOUNT]: () => initDomain(),
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_FLOATAPP_FOLLOWED_USERS_ANALYSIS,
      handler
    }
  ])
});
