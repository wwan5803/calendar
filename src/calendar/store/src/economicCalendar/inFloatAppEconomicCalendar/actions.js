import { UPDATE_IN_FLOAT_APP_ECONOMIC_CALENDAR_DATA } from "./types";
import { fetchInFloatAppEconomicCalendarData } from "./service";
import {
  utcTimeToEconomicDataDateFormat,
  addStartTimeInUTCMSField
} from "../utils";
import { parseEcoEntities } from "../adapter";
import { updateEconomicCalendar } from "../actions";
import { oneDayInMS, oneWeekInMS } from "utils";

export function updateInFloatAppEconomicCalendarData(data) {
  return {
    type: UPDATE_IN_FLOAT_APP_ECONOMIC_CALENDAR_DATA,
    payload: {
      updateField: "data",
      content: data
    }
  };
}

export function updateInFloatAppEconomicCalendarDataPeriod() {
  const weekStart =
    parseInt(new Date().getTime() / oneWeekInMS, 10) * oneWeekInMS -
    4 * oneDayInMS;

  const start = weekStart - oneWeekInMS;
  const end = weekStart + 2 * oneWeekInMS;

  return {
    type: UPDATE_IN_FLOAT_APP_ECONOMIC_CALENDAR_DATA,
    payload: {
      updateField: "period",
      content: { start, end }
    }
  };
}

export function updateInFloatAppEconomicCalendarDataTimezone(timezone) {
  return {
    type: UPDATE_IN_FLOAT_APP_ECONOMIC_CALENDAR_DATA,
    payload: {
      updateField: "timezone",
      content: timezone
    }
  };
}

export function updateInFloatAppEconomicCalendarDataCountries(countries) {
  return {
    type: UPDATE_IN_FLOAT_APP_ECONOMIC_CALENDAR_DATA,
    payload: {
      updateField: "countries",
      content: countries
    }
  };
}

export const acquireInFloatAppEconomicCalendarData = ({
  start,
  end
}) => async dispatch => {
  try {
    const source = await fetchInFloatAppEconomicCalendarData({
      start: utcTimeToEconomicDataDateFormat(start),
      end: utcTimeToEconomicDataDateFormat(end)
    });
    const adjustedData = addStartTimeInUTCMSField(source.data);

    const { economicCalendar } = parseEcoEntities(adjustedData);

    dispatch(updateEconomicCalendar(economicCalendar));
  } catch (err) {}
};
