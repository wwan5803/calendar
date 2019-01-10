import React from "react";
import { connect } from "react-redux";
import { Tooltip } from 'antd';
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

    let dateStr = "__/__/____";

    try {
        const y = date.getUTCFullYear();
        const m = date.getUTCMonth() + 1;
        const d = date.getUTCDate();
        dateStr = `${d}/${m}/${y}`;
    } catch (err) {}

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

    const actualValue = generateEcoValueString(
        {
            language,
            scale: Scale,
            unit: Unit,
            value: ActualValue
        }
    )
    const expectValue = generateEcoValueString(
        {
            language,
            scale: Scale,
            unit: Unit,
            value: ExpectedValue
        }
    )
    const priorValue = generateEcoValueString(
        {
            language,
            scale: Scale,
            unit: Unit,
            value: PriorValue
        }
    )
    return (
        <div
            styleName={`news ${Importance === "Low"
                ? "im-lo"
                : Importance === "High" ? "im-hi" : "im-me"}`}
        >
            <div styleName="padding-around">
                {flag && (
                    <img styleName="content-flag" width="100%" src={flag} alt="fr flag" />
                )}
                <div styleName="date">
                    {dateStr} &nbsp; {timeStr}
                </div>
            </div>

            <div styleName="news-prop">
                <div styleName="title">
                    {language === "zh" && <Tooltip placement="top" title={`${ecoPeriodString}${EventNameZh}`}>
                        {`${ecoPeriodString}${EventNameZh}`}
                    </Tooltip>}
                    {language === "en" && <Tooltip placement="top" title={`${EventNameEn} ${ecoPeriodString}`}>
                        {`${EventNameEn} ${ecoPeriodString}`}
                    </Tooltip>}
                </div>

                {EventType === "EconomicEvents" && (
                    <div styleName={`contents padding-around ${Importance === "Low"
                        ? "im-lo-bt"
                        : Importance === "High" ? "im-hi-bt" : "im-me-bt"}`}>
                        <div styleName="content">
                            <div styleName="label">{langContent[language].components.ecoCalendar.Actual}:</div>
                            <div styleName="value" style={{fontSize : actualValue && actualValue.length > 5 ? 12 : 16 }}>
                                {actualValue}
                            </div>
                        </div>
                        <div styleName="content">
                            <div styleName="label">{langContent[language].components.ecoCalendar.Forecast}:</div>
                            <div styleName="value" style={{fontSize : expectValue && expectValue.length > 5 ? 12 : 16 }}>{expectValue}
                            </div>
                        </div>
                        <div styleName="content">
                            <div styleName="label">{langContent[language].components.ecoCalendar.Previous}:</div>
                            <div styleName="value" style={{fontSize : priorValue && priorValue.length > 5 ? 12 : 16 }}>{priorValue}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
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
})(({ language, screenSize, newsList, timezone, dataMap }) => {
    let timeStr = "__:__ AM";
    try {
        const str = /\d\d:\d\d:\d\d/.exec(
            new Date(
                dataMap.getIn([newsList[0], "startTimeInUTCMS"]) +
                timezone * 3600 * 1000
            ).toUTCString()
        )[0];
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
    } catch (err) {
        console.error(err);
    }

    return (
        <div styleName="country">
            <div styleName="info">
                {timeStr}
            </div>
            {newsList.map(eventId => {
                return (
                    <News
                        key={eventId}
                        screenSize={screenSize}
                        timezone={timezone}
                        newsData={dataMap.get(eventId).toJS()}
                        language={language}
                    />
                );
            })}
        </div>
    );
});
