import { apiPrefix, defaultLang } from "config/config";
import { createReducer } from "redux-create-reducer";
import { generateCombinedReducer, COMBINED_ACTIONS } from "../combinedHelper";
import { authHelper, showCommonNetWorkErrorTip } from "utils";

export const UPDATE_LANGUAGE = "UPDATE_LANGUAGE";

function languageHandler(domain, action) {
  return getValidLanguage(action.payload);
}

export const language = createReducer(getValidLanguage(defaultLang), {
  [UPDATE_LANGUAGE]: languageHandler,
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_LANGUAGE,
      handler: languageHandler
    }
  ])
});

export function getValidLanguage(language) {
  switch (language) {
    case "zh":
    case "en":
      return language;
    default:
      return "en";
  }
}

export const updateUILanguage = language => ({
  type: UPDATE_LANGUAGE,
  payload: getValidLanguage(language)
});

async function fetchUpdateSettings(ui_language) {
  try {
    const headers = authHelper.buildAuthHeader();
    headers.append("Content-Type", "application/json");

    const req = new Request(apiPrefix + "settings/any", {
      method: "put",
      headers,
      body: JSON.stringify({ ui_language })
    });

    const res = await fetch(req);

    if (res.status === 200) {
      const result = await res.json();
      return Promise.resolve(result);
    } else {
      showCommonNetWorkErrorTip(res.status);
      return Promise.reject();
    }
  } catch (err) {
    return Promise.reject(err);
  }
}

export const setLanguage = language => dispatch => {
  dispatch(updateUILanguage(language));

  try {
    authHelper.buildAuthHeader();
    fetchUpdateSettings(language).catch(err => console.log(err));
  } catch (err) {}
};
