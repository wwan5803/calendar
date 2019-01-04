import { UPDATE_ACCOUNT, CLEAR_ACCOUNT } from "./types";
import { generateCombinedReducer, COMBINED_ACTIONS } from "../combinedHelper";
import { createReducer } from "redux-create-reducer";

function initDomain() {
  return {
    authenticated: !!0
  };
}

function handler(domain, { payload }) {
  return {
    ...domain,
    ...payload
  };
}

export const account = createReducer(initDomain(), {
  [UPDATE_ACCOUNT]: handler,
  [CLEAR_ACCOUNT]: () => initDomain(),
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_ACCOUNT,
      handler
    }
  ])
});
