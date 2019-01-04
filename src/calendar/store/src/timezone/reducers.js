import { UPDATE_TIMEZONE_STATE } from "./type";
import { createReducer } from "redux-create-reducer";
import Immutable from "immutable";

export const timezoneState = createReducer(Immutable.Map(), {
  [UPDATE_TIMEZONE_STATE]: (state, { payload }) => Immutable.fromJS(payload)
});
