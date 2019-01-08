import React, {Component} from "react";
import {connect} from "react-redux";
import {updateFullPageEconomicCalendarDataTimezone} from "store/actions";
import DropDown from "./FilterDropDown";
import "./cal.scss";
import langContent from "language";
import {ScrollBar} from "components";
import Select from "antd/lib/select";
import "antd/lib/select/style/css";
import TitleRow from "./TitleRow";
import {defaultOffset, MOBILE, TABLET, LAPTOP, DESKTOP} from "utils";

const Option = Select.Option;

const zoneNameList = [
    "Pacific/Midway",
    "Pacific/Honolulu",
    "America/Sitka",
    "America/Los_Angeles",
    "America/Belize",
    "America/New_York",
    "America/Aruba",
    "America/Cuiaba",
    "America/Bahia",
    "America/Godthab",
    "Atlantic/Cape_Verde",
    "Africa/Abidjan",
    "Europe/London",
    "Africa/Luanda",
    "Europe/Andorra",
    "Europe/Vienna",
    "Africa/Cairo",
    "Europe/Minsk",
    "Asia/Kuwait",
    "Asia/Dubai",
    "Asia/Kolkata",
    "Asia/Omsk",
    "Asia/Bangkok",
    "Australia/Perth",
    "Asia/Shanghai",
    "Asia/Jayapura",
    "Asia/Tokyo",
    "Australia/Darwin",
    "Australia/Brisbane",
    "Australia/Adelaide",
    "Australia/Sydney",

    "Asia/Magadan",
    "Asia/Anadyr",
    "Pacific/Auckland",
    "Pacific/Fakaofo",
    "Pacific/Kiritimati"
];

const SelectPlaceholder = ({language}) => {
    return (
        <div style={{color: "white"}}>
            {langContent[language].components.ecoCalendar.timezonePlaceholder}
        </div>
    );
};

export default connect(state => ({
    timezoneState: state.get("timezoneState"),
    activeTimezone: state.get("fullPageEconomicCalendar").timezone,
    screenSize: state.get("screenSize"),
    browserEnvironment: state.get("browserEnvironment")
}))(
    class TimezoneDropDown extends Component {
        constructor(props) {
            super(props);
        }

        resetTimeZone = () => {
            const {dispatch, updateTimezoneStr} = this.props
            updateTimezoneStr("")
            dispatch(updateFullPageEconomicCalendarDataTimezone(0));
        }

        render() {
            const {
                content,
                timezoneStr,
                language,
                activeTimezone,
                timezoneState,
                updateTimezoneStr,
                screenSize,
                browserEnvironment,
                dispatch
            } = this.props;
            // const default_gmt_offset = defaultEntity.get("gmt_offset");
            const defaultOffsetStr = `GMT${defaultOffset}:00`;
            const offsetStr = `GMT${activeTimezone}:00`;
            return (
                <div>
                    <TitleRow reset={this.resetTimeZone} language={language}
                              label={langContent[language].components.ecoCalendar.labels.timeZone}/>
                    <Select
                        dropdownStyle={{
                            background: "#fff",
                            color: "#000"
                        }}
                        placeholder={<SelectPlaceholder language={language}/>}
                        style={{
                            width: 140,
                            verticalAlign: "middle",

                        }}
                        onSelect={value => {
                            const entity = timezoneState.get(value);
                            if (!entity) return null;
                            const gmt_offset = entity.get("gmt_offset");
                            const offset = gmt_offset / 3600;
                            dispatch(updateFullPageEconomicCalendarDataTimezone(offset));
                            updateTimezoneStr(value);
                        }}
                        // defaultValue={timezoneStr === ""
                        //     ? content
                        //     : langContent[language].components.ecoCalendar.timezone[timezoneStr] +
                        //     " " +
                        //     defaultOffsetStr}
                        defaultValue={`${defaultOffsetStr}`}
                        dropdownMatchSelectWidth={false}
                    >
                        {zoneNameList.map(zoneName => {
                            const entity = timezoneState.get(zoneName);
                            if (!entity) return null;
                            const gmt_offset = entity.get("gmt_offset");
                            const offset = gmt_offset / 3600;
                            let offsetStr = "";
                            const offsetDecimal = offset % 1;
                            const offsetInteger = offset - offsetDecimal;
                            if (offsetDecimal === 0) {
                                offsetStr = `GMT${offset}:00`;
                            } else {
                                offsetStr = `GMT${offsetInteger}:${offsetDecimal
                                    .toFixed(2)
                                    .substring(2)}`;
                            }

                            return (
                                <Option key={zoneName}>
                                    {
                                        langContent[language].components.ecoCalendar.timezone[
                                            zoneName
                                            ]
                                    }
                                    &nbsp;
                                    {offsetStr}
                                </Option>
                            );
                        })}
                    </Select>
                </div>

            );
        }
    }
);


// const TimezoneItem = connect(state => {
//     const fullPageEconomicCalendar = state.get("fullPageEconomicCalendar");
//     const {timezone: activeTimezone} = fullPageEconomicCalendar;
//     return {activeTimezone};
// })(
//     ({
//          activeTimezone,
//          timezone,
//          closeDropDown,
//          children,
//          dispatch,
//          zoneName,
//          timezoneStr,
//          updateTimezoneStr
//      }) => {
//         return (
//             <li
//                 styleName={`dropdown-list ${timezoneStr === zoneName
//                     ? "active"
//                     : "available"}`}
//                 onClick={e => {
//                     console.log("1", timezoneStr);
//                     console.log("2", timezone);
//                     if (timezoneStr !== timezone) {
//                         dispatch(updateFullPageEconomicCalendarDataTimezone(timezone));
//                         updateTimezoneStr(zoneName);
//                     }
//                     closeDropDown && closeDropDown();
//                 }}
//             >
//                 {children}
//             </li>
//         );
//     }
// );
// export default connect(state => ({
//     timezoneState: state.get("timezoneState"),
//     activeTimezone: state.get("fullPageEconomicCalendar").timezone
// }))(
//     class TimezoneDropDown extends Component {
//         renderDropDownContent() {
//             const {
//                 timezoneState,
//                 language,
//                 updateTimezoneStr,
//                 timezoneStr
//             } = this.props;
//
//             const Inner = ({closeDropDown}) =>
//                 <div styleName="dropdown-content fixed-layout">
//                     <ScrollBar style={{height: "100%"}}>
//                         <ul styleName="dropdown-lists">
//                             {timezoneState.isEmpty()
//                                 ? null
//                                 : zoneNameList.map(zoneName => {
//                                     const entity = timezoneState.get(zoneName);
//                                     if (!entity) return null;
//                                     // const gmt_offset = entity.get("gmt_offset");
//                                     // const offset = gmt_offset / 3600;
//                                     // const offsetStr = `GMT${offset}:00`;
//                                     const gmt_offset = entity.get("gmt_offset");
//                                     const offset = gmt_offset / 3600;
//                                     let offsetStr = "";
//                                     const offsetDecimal = offset % 1;
//                                     const offsetInteger = offset - offsetDecimal;
//                                     if (offsetDecimal === 0) {
//                                         offsetStr = `GMT${offset}:00`;
//                                     } else {
//                                         offsetStr = `GMT${offsetInteger}:${offsetDecimal
//                                             .toFixed(2)
//                                             .substring(2)}`;
//                                     }
//                                     return (
//                                         <TimezoneItem
//                                             key={zoneName}
//                                             timezone={offset}
//                                             closeDropDown={closeDropDown}
//                                             timezoneStr={timezoneStr}
//                                             updateTimezoneStr={updateTimezoneStr}
//                                             zoneName={zoneName}
//                                         >
//                                             {
//                                                 langContent[language].components.ecoCalendar.timezone[
//                                                     zoneName
//                                                     ]
//                                             }
//                                             &nbsp;
//                                             {offsetStr}
//                                         </TimezoneItem>
//                                     );
//                                 })}
//                         </ul>
//                     </ScrollBar>
//                 </div>;
//             return <Inner/>;
//         }
//
//         resetTimeZone = () => {
//             const {dispatch, updateTimezoneStr} = this.props
//             updateTimezoneStr("")
//             dispatch(updateFullPageEconomicCalendarDataTimezone(0));
//         }
//
//         render() {
//             const {content, timezoneStr, language, activeTimezone} = this.props;
//             const offsetStr = `GMT${activeTimezone}:00`;
//             const displayStr =
//                 timezoneStr === ""
//                     ? content
//                     : langContent[language].components.ecoCalendar.timezone[timezoneStr] +
//                     " " +
//                     offsetStr;
//             return (
//                 <div>
//                     <TitleRow reset={this.resetTimeZone} language={language}
//                               label={langContent[language].components.ecoCalendar.labels.timeZone}/>
//                     <DropDown content={displayStr}>
//                         {this.renderDropDownContent()}
//                     </DropDown>
//                 </div>
//
//             );
//         }
//     }
// );
