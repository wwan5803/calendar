import { UPDATE_FULL_PAGE_ECONOMIC_CALENDAR_DATA, SET_PERIOD_FILTER } from "./types";
import { oneWeekInMS, oneDayInMS, oneHourInMS, defaultOffset } from "utils";

function updatePeriodFilter({domain, payload}) {
  const { start, end } = payload;
  return {
    start, end
  };
}

function updatePeriod({ domain, content }) {
  const { start, end } = content;
  return {
    ...domain,
    period: {
      start,
      end
    }
  };
}

function updateData({ domain, content }) {
  return {
    ...domain,
    data: content
  };
}

function updateTimezone({ domain, content }) {
  return {
    ...domain,
    timezone: content
  };
}

function updateImportance({ domain, content }) {
  return {
    ...domain,
    importance: content
  };
}

function updateCountries({ domain, content }) {
  return {
    ...domain,
    countries: content
  };
}

export function fullPageEconomicCalendar(

  domain = {

      timezone: defaultOffset,
      period: {
          ...(() => {
              // const today = new Date(new Date().setHours(0,0,0,0)).getTime();
              // return {
              //     start: today - oneWeekInMS,
              //     end: today + 2 * oneWeekInMS
              // };
              const weekStart =
                  parseInt(new Date().getTime() / oneWeekInMS, 10) * oneWeekInMS -
                  4 * oneDayInMS;

              return {
                  start: weekStart,
                  end: weekStart + oneWeekInMS
              };
              // const weekStart =
              //     parseInt(new Date().getTime() / oneWeekInMS, 10) * oneWeekInMS -
              //     4 * oneDayInMS;

              // return {
              //     start: weekStart - oneWeekInMS,
              //     end: weekStart + 2 * oneWeekInMS
              // };
          })()
      },
      countries: [],
      // data: []
  },
  action
) {
  const { type, payload } = action;
  if (type === UPDATE_FULL_PAGE_ECONOMIC_CALENDAR_DATA) {
    const { updateField, content } = payload;
    switch (updateField) {
      case "period":
        return updatePeriod({ domain, content });
      case "timezone":
        return updateTimezone({ domain, content });
      /* case "data":
        return updateData({ domain, content }); */
      case "countries":
        return updateCountries({ domain, content });
      case "importance":
        return updateImportance({ domain, content });
      default:
        return domain;
    }
  }

  return domain;
}

export function fullPageEconomicCalendarPeriodFilter(domain = {}, action) {
    const { type, payload } = action;
    switch(type) {
      case SET_PERIOD_FILTER: {
        return updatePeriodFilter({ domain, payload }); 
      }
      default:
        return domain;
        
    }
}
