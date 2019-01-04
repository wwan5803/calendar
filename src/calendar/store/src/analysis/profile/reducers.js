import { UPDATE_PROFILE_ANALYSES } from "./types";
import { CLEAR_ACCOUNT, UPDATE_ACCOUNT } from "../../account/types";
import Immutable from "immutable";
import { createReducer } from "redux-create-reducer";
import {
  generateCombinedReducer,
  COMBINED_ACTIONS
} from "../../combinedHelper";

function handler(domain, action) {
  const nextDomain = action.payload;
  if (domain.accountId !== nextDomain.accountId) {
    return nextDomain;
  }

  const { resultSet, ...rest } = nextDomain;

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
    resultSet: Immutable.Set(),
    accountId: void 0
  };
}

export const profileAnalyses = createReducer(initDomain(), {
  [UPDATE_PROFILE_ANALYSES]: handler,
  [UPDATE_ACCOUNT]: (domain, action) =>
    action.payload.authenticated ? initDomain() : domain,
  [CLEAR_ACCOUNT]: () => initDomain(),
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_PROFILE_ANALYSES,
      handler
    }
  ])
});
