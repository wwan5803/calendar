import { createReducer } from "redux-create-reducer";
import { UPDATE_FOLLOWED_USERS_ANALYSIS } from "./types";
import { CLEAR_ACCOUNT, UPDATE_ACCOUNT } from "../../account/types";
import Immutable from "immutable";
import {
  generateCombinedReducer,
  COMBINED_ACTIONS
} from "../../combinedHelper";

function handler(domain, action) {
  const { resultSet, ...rest } = action.payload;

  return {
    ...rest,
    resultSet: domain.resultSet.union(resultSet)
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

export const followedUsersAnalyses = createReducer(initDomain(), {
  [UPDATE_FOLLOWED_USERS_ANALYSIS]: handler,
  [UPDATE_ACCOUNT]: (domain, action) =>
    action.payload.authenticated ? initDomain() : domain,
  [CLEAR_ACCOUNT]: () => initDomain(),
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_FOLLOWED_USERS_ANALYSIS,
      handler
    }
  ])
});
