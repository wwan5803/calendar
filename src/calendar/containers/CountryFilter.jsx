import React, { Component } from "react";
import { connect } from "react-redux";
import { Checkbox, Row, Col } from 'antd';
import langContent from "language";
import TitleRow from "./TitleRow";
import DropDown from "./FilterDropDown";
import "./cal.scss";

export default class CountryFilter extends Component {
    resetCountry = () => {
        const {countryFilter, updateCountryFilter} = this.props
        if(countryFilter && countryFilter.length > 0) updateCountryFilter([])
    }
    render() {
        const {
            content: defaultContent,
            countryFilter,
            updateCountryFilter,
            language
        } = this.props;

        return <div>
            <TitleRow language={language} label={langContent[language].components.ecoCalendar.labels.country} reset={this.resetCountry}/>
            <Checkbox.Group style={{ width: '100%' }} value={countryFilter} onChange={updateCountryFilter}>
                <Row>

                    {[
                        "US",
                        "UK",
                        "CN",
                        "JP",
                        "EMU",
                        "NZ",
                        "CA",
                        "AU",
                        "CH"
                    ].map(country =>
                        <Col key={country} span={12}>
                            <Checkbox value={country}>{langContent[language].components.ecoCalendar.countries[country]}</Checkbox>
                        </Col>
                    )}
                </Row>
            </Checkbox.Group>
        </div>
    }
}
