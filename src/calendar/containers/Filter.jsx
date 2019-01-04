import React from "react";
import { connect } from "react-redux";
import langContent from "language";
import PeriodDropDown from "./PeriodDropDown";
import TimezoneDropDown from "./TimezoneDropDown";
import CountryFilter from "./CountryFilter";
import ImportanceFilter from "./ImportanceFilter";
import "./cal.scss";

export default ({
                    language,
                    countryFilter,
                    updateCountryFilter,
                    importanceFilter,
                    updateImportanceFilter,
                    updateTimezoneStr,
                    timezoneStr,
                    resetTimeRange,
                }) =>
    <div styleName="filter">
        <CountryFilter
            countryFilter={countryFilter}
            updateCountryFilter={updateCountryFilter}
            language={language}
            content={
                langContent[language].components.market_calendar.calendar.filter
                    .countries
            }
        />
        <br />
        <PeriodDropDown
            content={
                langContent[language].components.market_calendar.calendar.filter.dates
            }
            language={language}
            resetTimeRange={resetTimeRange}
        />
        <br />
        <TimezoneDropDown
            timezoneStr={timezoneStr}
            updateTimezoneStr={updateTimezoneStr}
            language={language}
            content={
                langContent[language].components.market_calendar.calendar.filter
                    .timezone
            }
        />
        <br />
        <ImportanceFilter
            language={language}
            importanceFilter={importanceFilter}
            updateImportanceFilter={updateImportanceFilter}/>
        <br />
    </div>
