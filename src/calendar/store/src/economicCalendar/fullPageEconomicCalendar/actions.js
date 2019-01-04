import { UPDATE_FULL_PAGE_ECONOMIC_CALENDAR_DATA, SET_PERIOD_FILTER } from "./types";
import {
  utcTimeToEconomicDataDateFormat,
  addStartTimeInUTCMSField
} from "../utils";
import { fetchFullPageEconomicCalendarData } from "./service";
import { parseEcoEntities } from "../adapter";
import { updateEconomicCalendar } from "../actions";
import { oneDayInMS } from "utils";
import moment from "moment";

export function updatePeriodFilter({start, end}) {
  return {
    type: SET_PERIOD_FILTER,
    payload: {start, end }
  };
}

export function updateFullPageEconomicCalendarDataPeriod({ start, end }) {
  return {
    type: UPDATE_FULL_PAGE_ECONOMIC_CALENDAR_DATA,
    payload: {
      updateField: "period",
      content: { start, end }
    }
  };
}

export function updateFullPageEconomicCalendarDataCountries(countries) {
  return {
    type: UPDATE_FULL_PAGE_ECONOMIC_CALENDAR_DATA,
    payload: {
      updateField: "countries",
      content: countries
    }
  };
}

export function updateFullPageEconomicCalendarDataTimezone(timezone) {
  return {
    type: UPDATE_FULL_PAGE_ECONOMIC_CALENDAR_DATA,
    payload: {
      updateField: "timezone",
      content: timezone
    }
  };
}

export function updateFullPageEconomicCalendarDataImportance(importance) {
  return {
    type: UPDATE_FULL_PAGE_ECONOMIC_CALENDAR_DATA,
    payload: {
      updateField: "importance",
      content: importance
    }
  };
}

export function updateFullPageEconomicCalendarData(dataList) {
  return {
    type: UPDATE_FULL_PAGE_ECONOMIC_CALENDAR_DATA,
    payload: {
      updateField: "data",
      content: dataList
    }
  };
}

export async function createAcquireFullPageEcoCalData({
  page,
  perPage,
  start,
  end
}) {
  let source;
  const actions = [];
  try {
    if (!page && !perPage) {
      source = await fetchFullPageEconomicCalendarData({
        start: utcTimeToEconomicDataDateFormat(start - oneDayInMS),
        end: utcTimeToEconomicDataDateFormat(end + oneDayInMS)
      });
    } else {
      source = await fetchFullPageEconomicCalendarData({
        page,
        perPage
      });
    }

    const adjustedData = addStartTimeInUTCMSField(source.data);

    if (page || perPage) {
      const startTime = source.data[source.data.length - 1].StartDateTime;
      const endTime = source.data[0].StartDateTime;
      actions.push(
        updateFullPageEconomicCalendarDataPeriod({
          start: moment(startTime).valueOf(),
          end: moment(endTime).valueOf()
        })
      );
    } else {
      actions.push(
        updateFullPageEconomicCalendarDataPeriod({
          start,
          end
        })
      );
    }

    const { economicCalendar } = parseEcoEntities(adjustedData);


    actions.push(updateEconomicCalendar(economicCalendar));
    return Promise.resolve(actions);
  } catch (err) {
    console.log('err', err)
    return Promise.reject(err);
  }
}

export const acquireFullPageEconomicCalendarData = ({
  page,
  perPage,
  start,
  end,
  fin_callback
}) => async dispatch => {
  try {
    const actions = await createAcquireFullPageEcoCalData({
      page,
      perPage,
      start,
      end
    });
    actions.forEach(action => dispatch(action));
    fin_callback && fin_callback();
  } catch (err) {
    fin_callback && fin_callback();
  }
};
