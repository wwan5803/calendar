import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {
    FullHeightBlockWithBackground,
    EcoPushContainer
} from "components";
import "./cal.scss";
import { MOBILE, TABLET, LAPTOP, urlToObject, oneWeekInMS, oneDayInMS, oneHourInMS } from "utils";
import Title from "./Title";
import CalArea from "./CalArea";
import {
    acquireFullPageEconomicCalendarData,
    updatePeriodFilter,
    acquireTimezone
} from "store/actions";
import { replace } from "react-router-redux";
const default_per_page = 100;
const default_page = 1;
let page;
let perPage;

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countryFilter:[], timezoneStr: "", importanceFilter: undefined, fetching: false,
            isTableView: props.acyCalendar || false
        };
    }

    setIsTableView = isTableView => {
        this.setState({ isTableView });
    }

    updateCountryFilter = filter => {
        this.setState({ countryFilter: filter });
    };

    updateImportanceFilter = filter => {
        this.setState({ importanceFilter: filter });
    }

    updateTimezoneStr = timezoneStr => {
        if (timezoneStr !== this.state.timezoneStr) {
            this.setState({ timezoneStr });
        }
    };

    componentDidMount() {
        this._mount = true;
        const {
            start,
            end,
            dispatch,
            economicCalendar,
            timezoneState,
            search
        } = this.props;
        if(search){
            const searchObj = urlToObject(search);
            page = searchObj.page;
            perPage = searchObj.per_page;
        }
        if (timezoneState.isEmpty()) {
            dispatch(acquireTimezone());
        }
        if (economicCalendar.isEmpty()) {
            this.acquireCalendarData({ start, end });
        }
    }

    componentWillUnmount() {
        this._mount = false;
    }

    componentWillReceiveProps(nextProps) {
        const prevSearchObj = this.props.search ? urlToObject(this.props.search) : {};
        const searchObj = nextProps.search ? urlToObject(nextProps.search) : {};
        if (
            prevSearchObj.page !== searchObj.page ||
            prevSearchObj.per_page !== searchObj.per_page
        ) {
            page = searchObj.page;
            perPage = searchObj.per_page;
            return this.acquireCalendarData({ page, perPage });
        }
    }

    resetTimeRange = () => {
        const { dispatch } = this.props;
        // const today = new Date().setHours(0,0,0,0);
        const weekStart =
            parseInt(new Date().getTime() / oneWeekInMS, 10) * oneWeekInMS -
            4 * oneDayInMS;
        dispatch(
            acquireFullPageEconomicCalendarData({
                start: weekStart,
                end: weekStart + oneWeekInMS
            })
        );
        dispatch(
            updatePeriodFilter({
                start: undefined, end: undefined
            })
        )
    }

    acquireCalendarData = ({ start, end }) => {
        if (this.state.fetching) return;
        if (!page && !perPage) {
            this.props.dispatch(acquireFullPageEconomicCalendarData({ start, end }));
        } else {
            if (
                perPage <= 0 ||
                perPage > 300 ||
                page <= 0 ||
                isNaN(perPage) ||
                isNaN(page)
            ) {
                perPage = default_per_page;
                page = default_page;
                this.props.dispatch(replace("/calendar?page=1&per_page=100"));
            }
            this.setFetching();
            this.props.dispatch(
                acquireFullPageEconomicCalendarData({
                    page,
                    perPage,
                    fin_callback: this.setFetched
                })
            );
        }
    };
    setFetching = () => {
        this._mount && this.setState({ fetching: true });
    };

    setFetched = () => {
        this._mount && this.setState({ fetching: false });
    };

    render() {
        const { screenSize, start, lang, fullPageEconomicCalendarPeriodFilter, acyCalendar } = this.props;
        const {isTableView, countryFilter, importanceFilter, timezoneStr} = this.state;
        return (
            <FullHeightBlockWithBackground style={{position: acyCalendar ? "relative" : "fixed", background: this.state.isTableView ? 'white': ''}}>
                <EcoPushContainer />
                <Title countryFilter={countryFilter}
                       updateCountryFilter={this.updateCountryFilter}
                       importanceFilter={importanceFilter}
                       updateImportanceFilter={this.updateImportanceFilter}
                       timezoneStr={timezoneStr}
                       updateTimezoneStr={this.updateTimezoneStr}
                       start={start}
                       language={lang}
                       isTableView={isTableView}
                       acyCalendar={acyCalendar}
                       setIsTableView={this.setIsTableView}
                       fullPageEconomicCalendarPeriodFilter={fullPageEconomicCalendarPeriodFilter}
                       resetTimeRange={this.resetTimeRange}/>
                <CalArea acyCalendar={acyCalendar} language={lang} isTableView={isTableView} countryFilter={countryFilter} />
            </FullHeightBlockWithBackground>
        );
    }
}

export default connect(state => {
    const screenSize = state.get("screenSize");
    const fullPageEconomicCalendar = state.get("fullPageEconomicCalendar");
    const economicCalendar = state.get("economicCalendar");
    const timezoneState = state.get("timezoneState");
    const { period: { start, end }, data } = fullPageEconomicCalendar;
    return {
        screenSize,
        start,
        end,
        data,
        timezoneState,
        economicCalendar,
        fullPageEconomicCalendarPeriodFilter: state.get("fullPageEconomicCalendarPeriodFilter"),
    };
})(Calendar);

Calendar.propTypes = {
    lang: PropTypes.string
}

Calendar.defaultProps = {
    lang: 'en'
};

