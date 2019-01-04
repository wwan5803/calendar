import { UPDATE_HOT_ANALYSIS } from "./types";
import { createReducer } from "redux-create-reducer";
import { CLEAR_ACCOUNT, UPDATE_ACCOUNT } from "../../account/types";
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

export const hotAnalysis = createReducer(initDomain(), {
  [UPDATE_HOT_ANALYSIS]: (domain, action) => action.payload,
  [UPDATE_ACCOUNT]: (domain, action) =>
    action.payload.authenticated || action.payload.language
      ? initDomain()
      : domain,
  [CLEAR_ACCOUNT]: () => initDomain(),
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_HOT_ANALYSIS,
      handler: (domain, action) => action.payload
    }
  ])
});
