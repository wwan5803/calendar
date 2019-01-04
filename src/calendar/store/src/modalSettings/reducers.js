import {
  NOT_IN_SETTING_PHRASE,
  UPDATE_SETTING_PHRASE,
  FAVOURITES_SETTING_PHRASE
} from "./types";
import { generateCombinedReducer, COMBINED_ACTIONS } from "../combinedHelper";
import { createReducer } from "redux-create-reducer";

export const settingPhrase = createReducer(NOT_IN_SETTING_PHRASE, {
  [UPDATE_SETTING_PHRASE]: (domain, action) => action.payload,
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_SETTING_PHRASE,
      handler: (domain, action) => action.payload
    }
  ])
});
