import React, {Component} from "react";
import {connect} from "react-redux";
import moment from 'moment';
import langContent from "language";
import {
    acquireFullPageEconomicCalendarData
} from "store/actions";
import "./cal.scss";

export default connect()(
    class WeekFilter extends Component {
        constructor(props) {
            super(props)
            this.state = {
                currentWeek: moment(),
                selectDate: moment(props.start)
            }
        }

        onNextWeek = () => {
            this.setState(prevState => ({
                currentWeek: prevState.currentWeek.add(1, 'week')
            }))
        }
        onLastWeek = () => {
            this.setState(prevState => ({
                currentWeek: prevState.currentWeek.subtract(1, 'week')
            }))
        }
        onWeekDay = (selectDate) => {
            try {
                const {dispatch} = this.props
                this.setState({selectDate})
                dispatch(
                    acquireFullPageEconomicCalendarData({
                        start: selectDate.valueOf() + selectDate.utcOffset() * 60 * 1000,
                        end: selectDate.clone().add(1, 'week'),
                    })
                );
            } catch (e) {
                console.log('error', e)
            }
        }
        getDayInWeek = () => {
            const startOfWeek = this.state.currentWeek.clone().startOf('week');
            const endOfWeek = this.state.currentWeek.clone().endOf('week');
            const days = [];
            let day = startOfWeek;

            while (day <= endOfWeek) {
                days.push(day);
                day = day.clone().add(1, 'd');
            }
            return days
        }

        render() {
            const {
                language
            } = this.props;
            const {selectDate} = this.state;

            return <div styleName="weekFilter">
                <button styleName="lastNextWeek" onClick={this.onLastWeek}>
                    {langContent[language].components.ecoCalendar.lastWeek}
                </button>
                {this.getDayInWeek().map((momentDay, index) => {
                    return <div key={index}
                                styleName={`weekday ${momentDay.valueOf() === selectDate.valueOf() ? 'active' : ''}`}
                                onClick={() => this.onWeekDay(momentDay)}>

                        <div styleName="weekDate">{momentDay.get('date')}</div>

                        <div styleName="weekDate">{langContent[language].components.ecoCalendar.weekday[momentDay.weekday()]}</div>

                    </div>
                })}
                <button styleName="lastNextWeek" onClick={this.onNextWeek}>
                    {langContent[language].components.ecoCalendar.nextWeek}
                </button>
            </div>
        }
    }
);
