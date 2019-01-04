import { UPDATE_DETAIL_ANALYSIS } from "./types";
import { CLEAR_ACCOUNT, UPDATE_ACCOUNT } from "../../account/types";
import { createReducer } from "redux-create-reducer";
import {
  generateCombinedReducer,
  COMBINED_ACTIONS
} from "../../combinedHelper";

function initDomain() {
  return {
    result: void 0,
    updated_time: new Date()
  };
}

export const detailAnalysis = createReducer(initDomain(), {
  [UPDATE_DETAIL_ANALYSIS]: (domain, action) => action.payload,
  [UPDATE_ACCOUNT]: (domain, action) =>
    action.payload.authenticated ? initDomain() : domain,
  [CLEAR_ACCOUNT]: () => initDomain(),
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_DETAIL_ANALYSIS,
      handler: (domain, action) => action.payload
    }
  ])
});
