import {
  UPDATE_SETTING_PHRASE,
  BASIC_SETTING_PHRASE,
  FAVOURITES_SETTING_PHRASE,
  NOT_IN_SETTING_PHRASE
} from "./types";

export function doBasicSetting() {
  return {
    type: UPDATE_SETTING_PHRASE,
    payload: BASIC_SETTING_PHRASE
  };
}

export function doFavouritesSetting() {
  return {
    type: UPDATE_SETTING_PHRASE,
    payload: FAVOURITES_SETTING_PHRASE
  };
}

export function doNotSetting() {
  return {
    type: UPDATE_SETTING_PHRASE,
    payload: NOT_IN_SETTING_PHRASE
  };
}
