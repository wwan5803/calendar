import React, { Component } from "react";
import { connect } from "react-redux";
import { Popover } from 'antd';
import langContent from "language";
import "./cal.scss";
import FilterIcon from "./icons/filter";
import TableViewIcon from "./icons/tableView";
import GridViewIcon from "./icons/gridView";
import WeekFilter from "./WeekFilter";
import Filter from "./Filter";
import { MOBILE, TABLET, LAPTOP } from "utils";

class Title extends Component {
    render() {
        const {start, language, isTableView, setIsTableView, fullPageEconomicCalendarPeriodFilter, resetTimeRange} = this.props;
        const {start: filterPeriodStart, end: filterPeriodEnd} = fullPageEconomicCalendarPeriodFilter;
        console.log(filterPeriodStart, filterPeriodEnd)
        const hasPeriodFilter = () => {
            return filterPeriodStart && filterPeriodEnd
        }
        const locale = language === 'zh' ? 'zh_cn' : 'en';
        const periodFilter = hasPeriodFilter() ? <div><div styleName="periodFilter">{`${filterPeriodStart.locale(locale).format("LLLL")} ~ ${filterPeriodEnd.locale(locale).format("LLLL")}`}</div><div styleName="remove" onClick={resetTimeRange}>X</div></div> : null
        return <div styleName="title-row">
            {!isTableView && <a onClick={()=> setIsTableView(true)}><TableViewIcon style={{color: 'rgba(245, 245, 245, 0.5)'}}/></a>}
            {isTableView && <a onClick={()=> setIsTableView(false)}><GridViewIcon /></a>}
            {isTableView && !hasPeriodFilter() && <WeekFilter start={start}/>}
            {isTableView && hasPeriodFilter() && periodFilter}
            <Popover placement="bottom" content={<Filter {...this.props}/>} trigger="click">
                {isTableView && <button styleName="filterBtn"><FilterIcon style={{verticalAlign: 'middle', marginRight: 10}} />{langContent[language].components.ecoCalendar.filter}</button>}
                {!isTableView && <button styleName="filterBtnGrid"><FilterIcon style={{verticalAlign: 'middle'}} /></button>}
            </Popover>
        </div>
    }
}

export default Title