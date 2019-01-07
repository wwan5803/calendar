import React from "react";
import { connect } from "react-redux";
import "./area.scss";
import OneCountry from "./OneCountryGroup";
import OneDay from "./OneDayGroup";
import { MOBILE, TABLET, DESKTOP, LAPTOP, oneDayInMS } from "utils";
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

export const Group = ({ children }) =>
    <div styleName="one-day-group">
        {children}
    </div>;

export function FullPageContentsContainer({
                                              _onMouseMove,
                                              handleScroll,
                                              screenSize,
                                              children,
                                              inputRef
                                          }) {
    return (
        <div styleName="wrapper">
            <ScrollBar
                handleScroll={handleScroll}
                _onMouseMove={_onMouseMove}
                inputRef={inputRef}
                style={{ height: "100%" }}
            >
                <Container styleName="area">
                    {children}
                </Container>
            </ScrollBar>
        </div>
    );
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
    if(importance) newMap = map.filter(entity => importance === entity.get("Importance").toLowerCase())
    const currencyArray = countryFilter.map(country => filterAdapter(country));
    if (currencyArray.length === 0) {
        return newMap;
    }

    return newMap.filter(
        entity => currencyArray.indexOf(entity.get("Country")) !== -1
    );
}

let xStart;
let yStart;
let scrollXStart;
let scrollYStart;
let i = 0;
let isMouseDown = !!0;
let clientX;
let clientY;

class ScrollArea extends React.Component {
    constructor(props) {
        super(props);
        this._onMouseMove = this._onMouseMove.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this._mount = !!1;
        const { browserEnvironment } = this.props;
        if (!browserEnvironment.get("touchable")) this.registerHandler();
        this.scrollArea.scrollLeft(2800);
    }

    componentWillUnmount() {
        this._mount = !!0;
        this.unRegisterHandler();
    }

    registerHandler = () => {
        this.mousedownHandler = this.scrollArea.view.addEventListener(
            "mousedown",
            e => {
                let isDescendant = !!0;
                let node = e.target;
                while (node !== null && node !== document.body && !isDescendant) {
                    if (node === this.scrollArea.view) {
                        isDescendant = !!1;
                    }
                    node = node.parentNode;
                }
                if (isDescendant) {
                    e.preventDefault();
                    isMouseDown = !!1;
                }
            }
        );
        this.mouseupHandler = this.scrollArea.view.addEventListener(
            "mouseup",
            e => {
                isMouseDown = !!0;
            }
        );

        this.mouseleaveHandler = this.scrollArea.view.addEventListener(
            "mouseleave",
            e => {
                isMouseDown = !!0;
            }
        );

        this.blurHandler = this.scrollArea.view.addEventListener("blur", e => {
            isMouseDown = !!0;
        });
    };

    unRegisterHandler = () => {
        this.mousedownHandler &&
        this.scrollArea.view.removeEventListener(
            "mousedown",
            this.mousedownHandler
        );
        this.mouseupHandler &&
        this.scrollArea.view.removeEventListener("mouseup", this.mouseupHandler);
        this.mouseleaveHandler &&
        this.scrollArea.view.removeEventListener(
            "mouseleave",
            this.mouseleaveHandler
        );
        this.blurHandler &&
        this.scrollArea.view.removeEventListener("blur", this.blurHandler);
    };

    scrollTimeLine = () => {
        this.timeline && this.timeline.scrollLeft(this.scrollArea.getScrollLeft());
    };



    _onMouseMove(e) {
        if (isMouseDown) {
            const scrollbars = this.scrollArea;
            clientX = e.clientX;
            clientY = e.clientY;
            i++;
            if (i === 1) {
                scrollXStart = scrollbars.view.scrollLeft;
                scrollYStart = scrollbars.view.scrollTop;
                xStart = clientX;
                yStart = clientY;
            }

            if (this.hasMouseMoveDelayHandler) return;
            this.hasMouseMoveDelayHandler = !!1;
            setTimeout(() => {
                if (this._mount) {
                    scrollbars.scrollTop(scrollYStart + yStart - clientY);
                    scrollbars.scrollLeft(scrollXStart + xStart - clientX);
                    this.scrollTimeLine();
                    this.hasMouseMoveDelayHandler = !!0;
                }
            }, 30);
        } else {
            i = 0;
        }
    }

    handleScroll = e => this.scrollTimeLine();

    render() {
        const { isTableView, screenSize, groupedByDayIdArray, groupedIdArray, dataMap, timezone, language, start, end } = this.props;
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
                return moment.utc(data.startTimeInUTCMS + timezone * 3600 * 1000).locale(locale).format("ll")
            }
            return null
        }
        return (
            <div>
                <FullPageContentsContainer
                    _onMouseMove={this._onMouseMove}
                    handleScroll={this.handleScroll}
                    inputRef={el => (this.scrollArea = el)}
                    screenSize={screenSize}
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
                                <th>时间</th>
                                <th>产品</th>
                                <th>事件</th>
                                <th>重要性</th>
                                <th>结果</th>
                                <th>市场预测</th>
                                <th>前值</th>
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
            </div>
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
