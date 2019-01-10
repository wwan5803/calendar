import React from "react";
import { connect } from "react-redux";
import "./area.scss";
import OneCountry from "./OneCountryGroup";
import OneDay from "./OneDayGroup";
import {MOBILE, TABLET, DESKTOP, LAPTOP, oneDayInMS, defaultOffset} from "utils";
import { Container, ScrollBar } from "components";
import moment from "moment";
import {
    groupEconomicDataListByDay,
    groupEconomicDataListByCountry,
    groupEconomicDataListByTime,
    filterEconomicCalendarByTime,
    mapToIdArray,
    sortEconomicDataByTime
} from "store/utils";
import langContent from "language";

export const Group = ({ children }) =>
    <div styleName="one-day-group">
        {children}
    </div>;

export function FullPageContentsContainer({
                                              _onMouseMove,
                                              screenSize,
                                              children,
                                              inputRef,
                                              acyCalendar
                                          }) {
    return !acyCalendar ? (
        <div styleName="wrapper">
            <ScrollBar
                _onMouseMove={_onMouseMove}
                inputRef={inputRef}
                style={{ height: "100%" }}
            >
                <Container styleName="area">
                    {children}
                </Container>
            </ScrollBar>
        </div>
    ) : <div>{children}</div>;
}

export function Contents({ children }) {
    return (
        <div
            styleName="contents"
            style={{
                width: '100%'
            }}
        >
            {children}
        </div>
    );
}

function filterAdapter(country) {
    switch (country) {
        case "US":
            return "USD";
        case "EMU":
            return "EUR";
        case "JP":
            return "JPY";
        case "AU":
            return "AUD";
        case "UK":
            return "GBP";
        case "CN":
            return "CNY";
        case "CA":
            return "CAD";
        case "NZ":
            return "NZD";
        case "CH":
            return "CHF";
        default:
            console.log("Unsupported filter : ", country);
    }
}

function filter(map, countryFilter, importance) {
    let newMap = map;
    if(importance) newMap = map.filter(entity => {
        let isFound = false
        importance.forEach(key => {
            if(key === entity.get("Importance").toLowerCase()){
                isFound = true
            }
        })
        return isFound
    })
    const currencyArray = countryFilter.map(country => filterAdapter(country));
    // if (currencyArray.length === 0) {
    //     return newMap;
    // }

    return newMap.filter(
        entity => currencyArray.indexOf(entity.get("Country")) !== -1
    );
}

class ScrollArea extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._mount = !!1;
        // const { browserEnvironment } = this.props;
        // if (!browserEnvironment.get("touchable")) this.registerHandler();
        // this.scrollArea.scrollLeft(2800);
    }

    componentWillUnmount() {
        this._mount = !!0;
    }

    _onMouseMove = (e) => {
    }

    render() {
        const { acyCalendar, isTableView, screenSize, groupedByDayIdArray, groupedIdArray, dataMap, timezone, language, start, end } = this.props;
        const getDate = (data) => {
            if(data){
                // let dateStr = "__/__/____";
                const locale = language === 'zh' ? 'zh_cn' : 'en';
                // const date = new Date(data.startTimeInUTCMS + timezone * 3600 * 1000);
                // try {
                //     const y = date.getUTCFullYear();
                //     const m = date.getUTCMonth() + 1;
                //     const d = date.getUTCDate();
                //     dateStr = `${d}/${m}/${y}`;
                // } catch (err) {}
                // return dateStr
                return moment(data.startTimeInUTCMS - defaultOffset * 3600 *1000 + timezone * 3600 * 1000).locale(locale).format("ll")
            }
            return null
        }
        return (
                <FullPageContentsContainer
                    _onMouseMove={this._onMouseMove}
                    inputRef={el => (this.scrollArea = el)}
                    screenSize={screenSize}
                    acyCalendar={acyCalendar}
                >
                    {!isTableView && <Contents>
                        {(() => {
                            return groupedIdArray.map((dateGroup, index) => {
                                const data = dateGroup[0] && dataMap.get(dateGroup[0][0]) ? dataMap.get(dateGroup[0][0]).toJS() : null
                                return (
                                    <div key={index}>
                                        <div styleName="gridDate">{getDate(data)}</div>
                                        <Group>
                                            {dateGroup.map((timeGroup, index) =>
                                                <OneCountry
                                                    key={index}
                                                    newsList={timeGroup}
                                                    dataMap={dataMap}
                                                    language={language}
                                                />
                                            )}
                                        </Group>
                                    </div>
                                );
                            });
                        })()}
                    </Contents>}
                    {isTableView && <div>

                        <table styleName="table">
                            <thead>
                            <tr>
                                <th>{langContent[language].components.ecoCalendar.tableHeader.time}</th>
                                <th>{langContent[language].components.ecoCalendar.tableHeader.product}</th>
                                <th>{langContent[language].components.ecoCalendar.tableHeader.event}</th>
                                <th>{langContent[language].components.ecoCalendar.tableHeader.importance}</th>
                                <th>{langContent[language].components.ecoCalendar.tableHeader.result}</th>
                                <th>{langContent[language].components.ecoCalendar.tableHeader.expect}</th>
                                <th>{langContent[language].components.ecoCalendar.tableHeader.prior}</th>
                            </tr>
                            </thead>
                            {
                                groupedByDayIdArray.map((dateGroup, index) => {
                                    if(dateGroup && dateGroup.length === 0) return null
                                    const data = dataMap.get(dateGroup[0]) ? dataMap.get(dateGroup[0]).toJS() : null
                                    return (
                                        <tbody key={index}>
                                        <tr>
                                            <td colSpan={7} styleName="fullDate">{getDate(data)}</td>
                                        </tr>
                                        {dateGroup.map((eventId, index) =>
                                            <OneDay
                                                key={eventId}
                                                eventId={eventId}
                                                dataMap={dataMap}
                                                language={language}
                                            />
                                        )}
                                        </tbody>

                                    );
                                })
                            }


                        </table>
                    </div>
                    }
                </FullPageContentsContainer>
        );
    }
}

export default connect((state, { countryFilter }) => {
    const screenSize = state.get("screenSize");
    const fullPageEconomicCalendar = state.get("fullPageEconomicCalendar");
    const { timezone, importance, period: { start, end } } = fullPageEconomicCalendar;
    const economicCalendar = state.get("economicCalendar");
    const browserEnvironment = state.get("browserEnvironment");

    const filteredMap = filter(
        filterEconomicCalendarByTime({
            map: economicCalendar,
            start,
            end,
            timezone
        }),
        countryFilter,
        importance
    );

    const sortedMap = sortEconomicDataByTime({ map: filteredMap });
    const sortedIdArray = mapToIdArray({ map: sortedMap });
    const groupedByDayIdArray = groupEconomicDataListByDay({
        map: filteredMap,
        start,
        timezone,
        idArray: sortedIdArray
    });

    const groupedIdArray = groupedByDayIdArray.map(idArray =>
        groupEconomicDataListByTime({ map: sortedMap, idArray })

    );

    return {
        screenSize,
        timezone,
        start,
        end,
        groupedByDayIdArray,
        groupedIdArray,
        dataMap: sortedMap,
        browserEnvironment
    };
})(ScrollArea);
