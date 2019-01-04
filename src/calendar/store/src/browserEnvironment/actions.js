import fetchJsonp from "fetch-jsonp";
import { UPDATE_BROWSER_ENVIRONMENT, CLEAR_BROWSER_ENVIRONMENT } from "./types";
import { getValidLanguage, updateUILanguage } from "../language";
import { generateCombinedActions } from "../combinedHelper";

async function fetchLocation() {
  try {
    const res = await fetchJsonp("https://freegeoip.net/json");
    const json = await res.json();
    return Promise.resolve(json);
  } catch (err) {
    return Promise.reject(err);
  }
}

export function updateBrowserEnvironment(payload) {
  return {
    type: UPDATE_BROWSER_ENVIRONMENT,
    payload
  };
}

export function clearBrowserEnvironment() {
  return {
    type: CLEAR_BROWSER_ENVIRONMENT
  };
}

export const acquireBrowserLanguage = () => dispatch => {
  if (typeof navigator !== "undefined") {
    let language;
    language = navigator.language || navigator.userLanguage;
    language = language.substring(0, 2);
    language = getValidLanguage(language);
    dispatch(
      generateCombinedActions(
        updateBrowserEnvironment({ language }),
        updateUILanguage(language)
      )
    );
  }
};

export const deviceTouchable = {
  type: UPDATE_BROWSER_ENVIRONMENT,
  payload: { touchable: !!1 }
};

export const acquireLocation = () => async dispatch => {
  try {
    const location = await fetchLocation();
    dispatch(updateBrowserEnvironment({ location }));
  } catch (err) {}
};
