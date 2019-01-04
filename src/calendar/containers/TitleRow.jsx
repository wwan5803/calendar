import React, { Component } from "react";
import { connect } from "react-redux";
import { Checkbox, Row, Col } from 'antd';
import langContent from "language";
import "./country.scss"
const TitleRow = ({label, reset, language}) => {
  return <Row style={{marginBottom: 15}}>
    <Col span={12}>
      <div styleName="title-label">{label}</div> 
    </Col>
    <Col style={{textAlign: 'right'}} span={12}>
      <a styleName="reset" onClick={reset}>{langContent[language].components.ecoCalendar.resetSelection}</a>
    </Col>
  </Row>
}

export default TitleRow