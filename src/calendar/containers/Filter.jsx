import React from "react";
import { connect } from "react-redux";
import langContent from "language";
import PeriodDropDown from "./PeriodDropDown";
import TimezoneDropDown from "./TimezoneDropDown";
import CountryFilter from "./CountryFilter";
import ImportanceFilter from "./ImportanceFilter";
import "./cal.scss";

export default connect(state => ({
    language: state.get("language")
}))(
    ({
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
                resetTimeRange={resetTimeRange}
            />
            <br />
            <TimezoneDropDown
                timezoneStr={timezoneStr}
                updateTimezoneStr={updateTimezoneStr}
                content={
                    langContent[language].components.market_calendar.calendar.filter
                        .timezone
                }
            />
            <br />
            <ImportanceFilter
                importanceFilter={importanceFilter}
                updateImportanceFilter={updateImportanceFilter}/>
            <br />
            {/* <div styleName="smallScreenDisplay" style={{ marginBottom: 15 }}>
        <br />
      </div>
      <div style={{float: 'right'}}>
       <span styleName="importance">
        ***{langContent[language].components.ecoCalendar.importance}
      </span>
          <span styleName="importance-blk im-hi" />
          <span styleName="importance-description">
        {langContent[language].components.ecoCalendar.high}
      </span>
          <span styleName="importance-blk im-me" />
          <span styleName="importance-description">
        {langContent[language].components.ecoCalendar.medium}
      </span>
          <span styleName="importance-blk im-lo" />
          <span styleName="importance-description">
        {langContent[language].components.ecoCalendar.low}
      </span>
      </div> */}

        </div>
);
