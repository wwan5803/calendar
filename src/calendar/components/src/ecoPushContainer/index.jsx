import React, { Component } from "react";
import { connect } from "react-redux";
import { registerEcoMessageHandler } from "store/src/economicCalendar/ecoBridgeHelper";
import { replaceEconomicCalendar } from "store/actions";
import Immutable from "immutable";

class EcoPushContainer extends Component {
  componentDidMount() {
    this.unRegisterHandler = registerEcoMessageHandler(this.handler);
  }

  componentWillUnmount() {
    this.unRegisterHandler();
  }

  handler = (map, array) => {
    try {
      console.log("map", map);
      console.log("array", array);
      const { economicCalendar, dispatch } = this.props;
      const newMap = economicCalendar
        .merge(map)
        .withMutations(tmp => array.forEach(id => tmp.delete(id)));
      if (!Immutable.is(newMap, economicCalendar)) {
        console.log("newMap", newMap);
        dispatch(replaceEconomicCalendar(newMap));
      }
    } catch (err) {}
  };

  render() {
    return null;
  }
}

export default connect(state => ({
  economicCalendar: state.get("economicCalendar")
}))(EcoPushContainer);
