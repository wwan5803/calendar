import { UPDATE_PROFILE_PAGE_USER } from "./types";
import { CLEAR_ACCOUNT, UPDATE_ACCOUNT } from "../../account/types";
import { createReducer } from "redux-create-reducer";
import {
  generateCombinedReducer,
  COMBINED_ACTIONS
} from "../../combinedHelper";

function handler(domain, action) {
  return action.payload;
}

export const profilePageUser = createReducer(
  { userId: void 0, updated_time: new Date() },
  {
    [UPDATE_PROFILE_PAGE_USER]: handler,
    [UPDATE_ACCOUNT]: (domain, action) =>
      action.payload.authenticated
        ? { userId: void 0, updated_time: new Date() }
        : domain,
    [CLEAR_ACCOUNT]: (domain, action) => ({
      userId: void 0,
      updated_time: new Date()
    }),
    [COMBINED_ACTIONS]: generateCombinedReducer([
      {
        type: UPDATE_PROFILE_PAGE_USER,
        handler
      }
    ])
  }
);
