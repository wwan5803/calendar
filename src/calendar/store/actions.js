import { setLanguage, updateUILanguage } from "./src/language/index";
import { updateScreenSize } from "./src/screenSize/index";
import { closeFloatApp, toggleFloatApp } from "./src/floatApp/actions";
import { addGlobalTip } from "./src/globalTip/actions";
import { updateHeader, addHeader, deleteHeader } from "./src/header/actions";
import {
  clearAccount,
  updateAccount,
  acquireAccountProcess,
  createAcquireAccountActions,
  persistUpdateLayout,
  login,
  logout,
  refreshToken,
  signUp
} from "./src/account/actions";

import {
  updatePosts,
  deletePost,
  updatePost,
  updateDrfatField,
  clearDrfat
} from "./src/analysis/inProcess/actions";
import {
  doBasicSetting,
  doFavouritesSetting,
  doNotSetting
} from "./src/modalSettings/actions";
import {
  acquireFullPageEconomicCalendarData,
  createAcquireFullPageEcoCalData,
  updateFullPageEconomicCalendarData,
  updateFullPageEconomicCalendarDataCountries,
  updateFullPageEconomicCalendarDataPeriod,
  updateFullPageEconomicCalendarDataTimezone,
  updateFullPageEconomicCalendarDataImportance,
  updatePeriodFilter
} from "./src/economicCalendar/fullPageEconomicCalendar/actions";
import { replaceEconomicCalendar } from "./src/economicCalendar/actions";
import { acquireInFloatAppEconomicCalendarData } from "./src/economicCalendar/inFloatAppEconomicCalendar/actions";

import { acquireDraftList, deleteADraft } from "./src/draft/actions";
import {
  clearDealingCustomizedData,
  updateDealingCustomizedData
} from "./src/dealingCustomizedData/actions";

import {
  acquireTimezone,
  createAcquireTimezoneAction
} from "./src/timezone/actions";
import {
  clearBrowserEnvironment,
  updateBrowserEnvironment,
  acquireLocation,
  acquireBrowserLanguage,
  deviceTouchable
} from "./src/browserEnvironment/actions";

import { updateHorizontalLayoutSize } from "./src/horizontalLayoutSize/actions";
import {setGlobelItem} from "./src/globelSetting/actions";

export {
  acquireFullPageEconomicCalendarData,
  createAcquireFullPageEcoCalData,
  acquireInFloatAppEconomicCalendarData,
  replaceEconomicCalendar,
  acquireDraftList,
  deleteADraft,
  clearDealingCustomizedData,
  updateDealingCustomizedData,
  doFavouritesSetting,
  doNotSetting,
  doBasicSetting,
  addGlobalTip,
  clearAccount,
  updateAccount,
  acquireAccountProcess,
  createAcquireAccountActions,
  persistUpdateLayout,
  login,
  logout,
  refreshToken,
  signUp,
  updatePosts,
  deletePost,
  updatePost,
  updateDrfatField,
  clearDrfat,
  setLanguage,
  updateUILanguage,
  updateScreenSize,
  closeFloatApp,
  toggleFloatApp,
  updateFullPageEconomicCalendarData,
  updateFullPageEconomicCalendarDataCountries,
  updateFullPageEconomicCalendarDataPeriod,
  updateFullPageEconomicCalendarDataTimezone,
  updateFullPageEconomicCalendarDataImportance,
  updatePeriodFilter,
  acquireTimezone,
  createAcquireTimezoneAction,
  clearBrowserEnvironment,
  updateBrowserEnvironment,
  acquireLocation,
  acquireBrowserLanguage,
  updateHorizontalLayoutSize,
  updateHeader,
  addHeader,
  deleteHeader,
  setGlobelItem
};
