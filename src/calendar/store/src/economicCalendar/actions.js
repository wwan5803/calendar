import { UPDATE_ECONOMIC_CALENDAR, REPLACE_ECONOMIC_CALENDAR } from "./types";

export function updateEconomicCalendar(payload) {
  return {
    type: UPDATE_ECONOMIC_CALENDAR,
    payload
  };
}

export function replaceEconomicCalendar(payload) {
  return {
    type: REPLACE_ECONOMIC_CALENDAR,
    payload
  };
}
