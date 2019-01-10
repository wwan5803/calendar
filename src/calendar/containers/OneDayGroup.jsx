import React from "react";
import { connect } from "react-redux";
import { MOBILE, TABLET } from "utils";
import langContent from "language";
import "./country.scss";
import { getFlagByCountryCode } from "components/src/flags";
import {
  generateEcoPeriodString,
  generateEcoValueString
} from "store/utils";

const News = function News({ screenSize, newsData, timezone, language }) {
    const {
        EventNameEn,
        EventNameZh,
        EventType,
        Period,
        Scale,
        Unit,
        PriorValue,
        ExpectedValue,
        ActualValue,
        CountryCode,
        Importance
    } = newsData;
    if (!EventType) return null;

    const date = new Date(newsData.startTimeInUTCMS + timezone * 3600 * 1000);

    let timeStr;
    try {
        const utcStr = date.toUTCString();
        const str = /\d\d:\d\d:\d\d/.exec(utcStr)[0];
        const hours = +str.substr(0, 2);
        const mins = str.substr(3, 2);
        if (hours >= 12) {
            const hour = hours > 12 ? hours - 12 : hours;
            timeStr = (String(hour).length > 1 ? hour : `0${hour}`) + ":" + mins;
            timeStr = language === "zh" ? "下午 " + timeStr : timeStr + " PM";
        } else {
            timeStr = (String(hours).length > 1 ? hours : `0${hours}`) + ":" + mins;
            timeStr = language === "zh" ? "上午 " + timeStr : timeStr + " AM";
        }
    } catch (err) {}
    timeStr = timeStr || (language === "zh" ? "上午__:__" : "__:__ AM");

    const flag = getFlagByCountryCode(CountryCode);
    const ecoPeriodString = generateEcoPeriodString({ language, period: Period });
    return (
        <tr>
            <td>
                {timeStr}
            </td>
            <td>
                {flag && (
                    <img styleName="content-flag" width="100%" src={flag} alt="fr flag" />

                )}
            </td>
            <td>
                <div styleName="titleTableView">
                    {language === "zh" && ecoPeriodString}
                    {language === "en" && EventNameEn}
                    {language === "zh" && EventNameZh}
                    &nbsp;
                    {language === "en" && ecoPeriodString}
                </div>
            </td>
            <td>
                <div styleName={`im-table ${Importance === "Low"
                    ? "im-lo-bt"
                    : Importance === "High" ? "im-hi-bt" : "im-me-bt"}`}>{langContent[language].components.ecoCalendar.importance[Importance.toLowerCase()]}</div>
            </td>
            <td>
                {generateEcoValueString(
                    {
                        language,
                        scale: Scale,
                        unit: Unit,
                        value: ActualValue
                    }
                )}
            </td>
            <td>
                {generateEcoValueString({
                    language,
                    scale: Scale,
                    unit: Unit,
                    value: ExpectedValue
                })}
            </td>
            <td>
                {generateEcoValueString({
                    language,
                    scale: Scale,
                    unit: Unit,
                    value: PriorValue
                })}
            </td>
        </tr>
    );
}

export default connect(state => {
  const screenSize = state.get("screenSize");
  const fullPageEconomicCalendar = state.get("fullPageEconomicCalendar");
  const { timezone } = fullPageEconomicCalendar;
  return {
    screenSize,
    timezone,
  };
})(({ language, screenSize, timezone, eventId, dataMap }) => {
  return (
    <News
    screenSize={screenSize}
    timezone={timezone}
    newsData={dataMap.get(eventId).toJS()}
    language={language}
    />
  );
});
