import React, { Component } from "react";
import { connect } from "react-redux";
import langContent from "language";
import { CustomPeriodFilter } from "components";
import { showTip, oneDayInMS, urlToObject } from "utils";
import {
    updateFullPageEconomicCalendarDataPeriod,
    acquireFullPageEconomicCalendarData,
    updatePeriodFilter
} from "store/actions";
import moment from "moment";
import { DatePicker } from 'antd';
import { replace } from "react-router-redux";
import DropDown from "./FilterDropDown";
import TitleRow from "./TitleRow";
import "./cal.scss";

const { RangePicker } = DatePicker;

class PeriodDropDown extends Component {
    constructor(props) {
        super(props);
    }

    isValidPeriod() {
        return (
            this.state.end > this.state.start &&
            this.state.end < this.state.start.add(3, "months")
        );
    }

    onChange = (date, dateString) => {
        console.log('nono', date)
        const {dispatch} = this.props
        const [start, end] = date
        // if (search !== "") {
        //     dispatch(replace("/calendar"));
        // }
        dispatch(
            acquireFullPageEconomicCalendarData({
                start,
                end
            })
        );
        dispatch(
            updatePeriodFilter({
                start, end
            })
        )
    }

    render() {
        const { content, language, start, end, resetTimeRange } = this.props;
        return <div>
            <TitleRow reset={resetTimeRange} language={language} label={langContent[language].components.ecoCalendar.labels.timeRange} />
            <RangePicker value={[moment(start), moment(end)]} onChange={this.onChange} />
        </div>
    }
}

export default connect(state => {
    const fullPageEconomicCalendar = state.get("fullPageEconomicCalendar");
    const { period: { start, end } } = fullPageEconomicCalendar;
    return { start, end };
})(PeriodDropDown);
