import { createReducer } from "redux-create-reducer";
import { UPDATE_IN_SLIDER_PICKS_ANALYSES } from "./types";
import { CLEAR_ACCOUNT, UPDATE_ACCOUNT } from "../../account/types";
import Immutable from "immutable";
import {
  generateCombinedReducer,
  COMBINED_ACTIONS
} from "../../combinedHelper";

function initDomain() {
  return {
    resultList: Immutable.List(),
    updated_time: new Date()
  };
}

function handler(domain, action) {
  return {
    updated_time: new Date(),
    ...action.payload
  };
}

export const inSliderPicksAnalyses = createReducer(initDomain(), {
  [UPDATE_IN_SLIDER_PICKS_ANALYSES]: handler,
  [UPDATE_ACCOUNT]: (domain, action) =>
    action.payload.authenticated || action.payload.language
      ? initDomain()
      : domain,
  [CLEAR_ACCOUNT]: () => initDomain(),
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_IN_SLIDER_PICKS_ANALYSES,
      handler
    }
  ])
});
