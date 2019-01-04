import { authHelper, isBrowser } from "utils";
import { Map, fromJS } from "immutable";
import {
  groupEconomicDataListByDay,
  groupEconomicDataListByCountry,
  groupEconomicDataListByTime,
  filterEconomicCalendarByTime,
  generateEcoPeriodString,
  generateEcoValueString,
  mapToIdArray,
  sortEconomicDataByTime
} from "./src/economicCalendar/utils";
import { generateCombinedActions } from "./src/combinedHelper";

function filterPersistedField(state) {
  const language = state.get("language");
  const account = state.get("account");
  const browserEnvironment = state.get("browserEnvironment").toJS();
  return { language, account, browserEnvironment };
}

// TODO prevent unnecessary update
export function updateLocalStorageStore(state) {
  if (!isBrowser) return;
  try {
    const account = state.get("account");
    const token = account.token;
    const language = state.get("language");
    authHelper.setToken(token);
    authHelper.updateAccount(account);
    authHelper.updateUILanguage(language);
    localStorage.setItem(
      "long_time_store",
      JSON.stringify(filterPersistedField(state))
    );
  } catch (err) {}
}

export function getLocalStorageStore() {
  if (!isBrowser) return;
  try {
    let str = localStorage.getItem("long_time_store");
    if (str) {
      try {
        const { language, account, browserEnvironment } = JSON.parse(str);
        const token = account.token;
        authHelper.setToken(token);
        return Map({
          language,
          account,
          browserEnvironment: fromJS(browserEnvironment)
        });
      } catch (err) {}
    }
  } catch (err) {}
}

export {
  groupEconomicDataListByDay,
  groupEconomicDataListByCountry,
  groupEconomicDataListByTime,
  filterEconomicCalendarByTime,
  generateEcoPeriodString,
  generateEcoValueString,
  generateCombinedActions,
  mapToIdArray,
  sortEconomicDataByTime
};
