import React, { Component } from "react";
import { connect } from "react-redux";
import NotificationSystem from "react-notification-system";
import {
  COMMON_NET_WORK_ERROR,
  subscribeGlobalTipHandler
} from "utils";
import langContent from "language";

class GlobalTip extends Component {
  componentDidMount() {
    this.unSubscribe = subscribeGlobalTipHandler(this.showTip);
  }

  componentWillUnmount() {
    typeof this.unSubscribe === "function" && this.unSubscribe();
  }

  showTip = tip => {
    if (!tip) return;
    const { language } = this.props;

    const { type, payload } = tip;

    if (type === COMMON_NET_WORK_ERROR) {
      this._notificationSystem.addNotification({
        level: "error",
        message: `${langContent[language].tips.httpError}${payload}`
      });
    } else {
      this._notificationSystem.addNotification(payload);
    }
  };

  render() {
    return <NotificationSystem ref={e => (this._notificationSystem = e)} />;
  }
}

export default connect(state => ({
  language: state.get("language")
}))(GlobalTip);
