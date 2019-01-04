import { createReducer } from "redux-create-reducer";
import Immutable from "immutable";
import { UPDATE_BROWSER_ENVIRONMENT, CLEAR_BROWSER_ENVIRONMENT } from "./types";
import { generateCombinedReducer, COMBINED_ACTIONS } from "../combinedHelper";

function handler(domain, action) {
  return domain.merge(action.payload);
}

export const browserEnvironment = createReducer(Immutable.Map({}), {
  [UPDATE_BROWSER_ENVIRONMENT]: handler,
  [CLEAR_BROWSER_ENVIRONMENT]: () => Immutable.map({}),
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_BROWSER_ENVIRONMENT,
      handler
    }
  ])
});
