import { UPDATE_ECONOMIC_CALENDAR, REPLACE_ECONOMIC_CALENDAR } from "./types";
import { createReducer } from "redux-create-reducer";
import Immutable from "immutable";

function mergeEcoCalendar(domain, action) {
  return domain.merge(action.payload);
}

export const economicCalendar = createReducer(Immutable.Map(), {
  [UPDATE_ECONOMIC_CALENDAR]: mergeEcoCalendar,
  [REPLACE_ECONOMIC_CALENDAR]: (domain, { payload }) => payload
});
