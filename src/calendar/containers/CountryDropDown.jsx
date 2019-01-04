import React, { Component } from "react";
import { connect } from "react-redux";
import langContent from "language";
import DropDown from "./FilterDropDown";
import "./cal.scss";

function CountryItem({
  closeDropDown,
  selfCountryFilter,
  dispatch,
  updateCountryFilter,
  countryFilter,
  language
}) {
  return (
    <li
      styleName={`dropdown-list ${countryFilter.indexOf(selfCountryFilter) !==
      -1
        ? "active"
        : "available"}`}
      onClick={e => updateCountryFilter(selfCountryFilter)}
    >
      {
        langContent[language].components.ecoCalendar.countries[
          selfCountryFilter
        ]
      }
    </li>
  );
}

export default class CountryDropDown extends Component {
    renderDropDownContent({ countryFilter, updateCountryFilter, language }) {
        const Inner = ({ closeDropDown }) =>
            <div styleName="dropdown-content">
                <ul styleName="dropdown-lists">
                    {[
                        "all",
                        "US",
                        "UK",
                        "CN",
                        "JP",
                        "EMU",
                        "NZ",
                        "CA",
                        "AU"
                    ].map(country =>
                        <CountryItem
                            key={country}
                            closeDropDown={closeDropDown}
                            updateCountryFilter={updateCountryFilter}
                            countryFilter={countryFilter}
                            selfCountryFilter={country}
                            language={language}
                        />
                    )}
                </ul>
            </div>;
        return <Inner />;
    }

    render() {
        const {
            content: defaultContent,
            countryFilter,
            updateCountryFilter,
            language
        } = this.props;
        const content =
            countryFilter.indexOf("all") !== -1
                ? defaultContent
                : countryFilter.length === 1
                ? langContent[language].components.ecoCalendar.countries[
                    countryFilter[0]
                    ]
                : langContent[language].components.ecoCalendar.countries.multi;

        //TODO Use Ant Design Select component to replace DropDown
        //use mode to activate multiple select
        //option must has a key
        return (
            <DropDown content={content}>
                {this.renderDropDownContent({
                    countryFilter,
                    updateCountryFilter,
                    language
                })}
            </DropDown>
        );
    }
}
