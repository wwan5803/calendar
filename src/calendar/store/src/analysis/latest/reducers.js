import { UPDATE_LATEST_ANALYSES } from "./types";
import { CLEAR_ACCOUNT, UPDATE_ACCOUNT } from "../../account/types";
import Immutable from "immutable";
import {
  generateCombinedReducer,
  COMBINED_ACTIONS
} from "../../combinedHelper";
import { createReducer } from "redux-create-reducer";

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
    previous_page_url: "",
    resultSet: Immutable.Set()
  };
}

export const latestAnalyses = createReducer(initDomain(), {
  [UPDATE_LATEST_ANALYSES]: handler,
  [UPDATE_ACCOUNT]: (domain, action) =>
    action.payload.authenticated || action.payload.language
      ? initDomain()
      : domain,
  [CLEAR_ACCOUNT]: () => initDomain(),
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_LATEST_ANALYSES,
      handler
    }
  ])
});
