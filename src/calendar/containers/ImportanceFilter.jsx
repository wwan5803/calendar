import React, { Component } from "react";
import { connect } from "react-redux";
import { Radio, Row, Col, Checkbox } from 'antd';
import langContent from "language";
import TitleRow from "./TitleRow";
import { updateFullPageEconomicCalendarDataImportance } from "store/actions";
import DropDown from "./FilterDropDown";
import "./cal.scss";

export default connect()(class ImportanceFilter extends Component {
    resetImportance = () => {
        const {updateImportanceFilter, dispatch} = this.props
        updateImportanceFilter(undefined)
        dispatch(
            updateFullPageEconomicCalendarDataImportance(undefined)
        );
    }
    onChange = (value) => {
        const {updateImportanceFilter, dispatch} = this.props
        updateImportanceFilter(value)
        dispatch(
            updateFullPageEconomicCalendarDataImportance(value)
        );
    }
    render() {
        const {
            content: defaultContent,
            importanceFilter,
            language
        } = this.props;

        return <div>
            <TitleRow language={language} label={langContent[language].components.ecoCalendar.labels.importance} reset={this.resetImportance}/>
            <Checkbox.Group style={{ width: '100%' }} value={importanceFilter} onChange={this.onChange}>
                <Row>

                    {[
                        "low",
                        "medium",
                        "high",
                    ].map(importance =>
                        <Col key={importance} span={8}>
                            <Checkbox value={importance}>{langContent[language].components.ecoCalendar.importance[importance]}</Checkbox>
                        </Col>
                    )}
                </Row>
            </Checkbox.Group>
        </div>
    }
})


// export default connect()(
//   class ImportanceFilter extends Component {
//     resetImportance = () => {
//         const {updateImportanceFilter, dispatch} = this.props
//         updateImportanceFilter(undefined)
//         dispatch(
//             updateFullPageEconomicCalendarDataImportance(undefined)
//           );
//     }
//     onChange = (e) => {
//         const {updateImportanceFilter, dispatch} = this.props
//         updateImportanceFilter(e.target.value)
//         dispatch(
//             updateFullPageEconomicCalendarDataImportance(e.target.value)
//           );
//     }
//     render() {
//       const {
//         content: defaultContent,
//         importanceFilter,
//         language
//       } = this.props;
//
//       return <div>
//           <TitleRow language={language} label={langContent[language].components.ecoCalendar.labels.importance} reset={this.resetImportance}/>
//           <Radio.Group style={{ width: '100%' }} value={importanceFilter} onChange={this.onChange} buttonStyle="solid">
//             <Row>
//
//               {[
//                     "low",
//                     "medium",
//                     "high",
//                   ].map(importance =>
//                     <Col key={importance} span={3}>
//                       <Radio.Button value={importance}>{langContent[language].components.ecoCalendar.importance[importance]}</Radio.Button>
//                     </Col>
//                   )}
//             </Row>
//         </Radio.Group>
//         </div>
//     }
//   }
// );
