import { setLanguage, updateUILanguage } from "./src/language/index";
import { updateScreenSize } from "./src/screenSize/index";
import { addGlobalTip } from "./src/globalTip/actions";
import { updateHeader, addHeader, deleteHeader } from "./src/header/actions";
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

import {
  acquireTimezone,
  createAcquireTimezoneAction
} from "./src/timezone/actions";
import {
  clearBrowserEnvironment,
  updateBrowserEnvironment,
  acquireLocation,
  acquireBrowserLanguage,
} from "./src/browserEnvironment/actions";

import { updateHorizontalLayoutSize } from "./src/horizontalLayoutSize/actions";
import {setGlobelItem} from "./src/globelSetting/actions";

export {
  acquireFullPageEconomicCalendarData,
  createAcquireFullPageEcoCalData,
  acquireInFloatAppEconomicCalendarData,
  replaceEconomicCalendar,
  addGlobalTip,
  setLanguage,
  updateUILanguage,
  updateScreenSize,
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
