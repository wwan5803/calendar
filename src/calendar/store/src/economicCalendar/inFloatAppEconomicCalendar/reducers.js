import { oneWeekInMS, oneDayInMS } from "utils";
import { UPDATE_IN_FLOAT_APP_ECONOMIC_CALENDAR_DATA } from "./types";

function updateData({ domain, content }) {
  return {
    ...domain,
    data: content
  };
}

function updateCountries({ domain, content }) {
  return {
    ...domain,
    countries: content
  };
}

function updateTimezone({ domain, content }) {
  return {
    ...domain,
    timezone: content
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

export function inFloatAppEconomicCalendar(
  domain = {
    timezone: 0,
    period: {
      ...(() => {
        const weekStart =
          parseInt(new Date().getTime() / oneWeekInMS, 10) * oneWeekInMS -
          4 * oneDayInMS;

        return {
          start: weekStart - oneWeekInMS,
          end: weekStart + 2 * oneWeekInMS
        };
      })()
    },
    countries: []
    // data: []
  },
  action
) {
  const { type, payload } = action;
  if (type === UPDATE_IN_FLOAT_APP_ECONOMIC_CALENDAR_DATA) {
    const { updateField, content } = payload;
    switch (updateField) {
      /* case "data":
        return updateData({ domain, content }); */
      case "timezone":
        return updateTimezone({ domain, content });
      case "countries":
        return updateCountries({ domain, content });
      case "period":
        return updatePeriod({ domain, content });
      default:
        return domain;
    }
  }

  return domain;
}
