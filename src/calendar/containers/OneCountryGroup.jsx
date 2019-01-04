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

const News = connect(state => ({
    language: state.get("language")
}))(function News({ screenSize, newsData, timezone, language }) {
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
            timeStr = (hours > 12 ? hours - 12 : hours) + ":" + mins;
            timeStr = language === "zh" ? "下午 " + timeStr : timeStr + " PM";
        } else {
            timeStr = hours + ":" + mins;
            timeStr = language === "zh" ? "上午 " + timeStr : timeStr + " AM";
        }
    } catch (err) {}
    timeStr = timeStr || (language === "zh" ? "上午__:__" : "__:__ AM");

    const flag = getFlagByCountryCode(CountryCode);
    const ecoPeriodString = generateEcoPeriodString({ language, period: Period });

    return (
        <div
            styleName={`news ${Importance === "Low"
                ? "im-lo"
                : Importance === "High" ? "im-hi" : "im-me"}`}
        >
            <div styleName="padding-around">
                {flag && (
                    <div styleName="content-flag">
                        <img width="100%" src={flag} alt="fr flag" />
                    </div>
                )}
                <div styleName="date">
                    {dateStr} &nbsp; {timeStr}
                </div>
            </div>

            <div styleName="news-prop">
                <div styleName="title">
                    {language === "zh" && ecoPeriodString}
                    {language === "en" && EventNameEn}
                    {language === "zh" && EventNameZh}
                    &nbsp;
                    {language === "en" && ecoPeriodString}
                </div>

                {EventType === "EconomicEvents" && (
                    <div styleName={`contents padding-around ${Importance === "Low"
                        ? "im-lo-bt"
                        : Importance === "High" ? "im-hi-bt" : "im-me-bt"}`}>
                        <div styleName="content">
                            <div>{langContent[language].components.ecoCalendar.Actual}:</div>
                            <div>
                                {generateEcoValueString(
                                    {
                                        language,
                                        scale: Scale,
                                        unit: Unit,
                                        value: ActualValue
                                    }
                                )}
                            </div>
                        </div>
                        <div styleName="content">
                            <div>{langContent[language].components.ecoCalendar.Forecast}:</div>
                            <div>{generateEcoValueString({
                                language,
                                scale: Scale,
                                unit: Unit,
                                value: ExpectedValue
                            })}
                            </div>
                        </div>
                        <div styleName="content">
                            <div>{langContent[language].components.ecoCalendar.Previous}:</div>
                            <div>{generateEcoValueString({
                                language,
                                scale: Scale,
                                unit: Unit,
                                value: PriorValue
                            })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});

export default connect(state => {
    const screenSize = state.get("screenSize");
    const fullPageEconomicCalendar = state.get("fullPageEconomicCalendar");
    const { timezone } = fullPageEconomicCalendar;
    return {
        screenSize,
        timezone,
        language: state.get("language")
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
            timeStr = (hours > 12 ? hours - 12 : hours) + ":" + mins;
            timeStr = language === "zh" ? "下午 " + timeStr : timeStr + " PM";
        } else {
            timeStr = hours + ":" + mins;
            timeStr = language === "zh" ? "上午 " + timeStr : timeStr + " AM";
        }
    } catch (err) {
        console.error(err);
    }

    // const flag = getFlagByCountryCode(
    //   dataMap.getIn([newsList[0], "CountryCode"])
    // );

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
                    />
                );
            })}
        </div>
    );
});
