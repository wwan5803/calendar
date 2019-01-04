import React, { Component } from "react";
import { connect } from "react-redux";
import {
  refreshToken,
  clearAccount,
  showGlobalModal
} from "store/actions";
import { authHelper } from "utils";
import { push } from "react-router-redux";

class AuthContainer extends Component {
  removeAuth = () => {
    this.props.dispatch(clearAccount());
  };

  renewToken = expiredIn => {
    expiredIn -= 30;
    expiredIn = expiredIn < 30 ? 0 : expiredIn;
    const { dispatch } = this.props;
    clearTimeout(this.renewTokenTimer);
    this.renewTokenTimer = setTimeout(
      () => dispatch(refreshToken()),
      expiredIn * 1000
    );
  };

  expireToken(expiredIn) {
    clearTimeout(this.timer);
    this.timer = setTimeout(this.removeAuth, expiredIn * 1000);
  }

  updateAuthIfNeed() {
    const { authenticated, token } = this.props.account;
    if (!authenticated && !token) return;
    if (!token || token === "") return;

    const { expired, expiredIn } = authHelper.testTokenExpire(token);

    if (expired) this.removeAuth();
    else if (expiredIn) {
      this.renewToken(expiredIn);
      this.expireToken(expiredIn);
    }
  }

  toAuthIfNeed = arg => {
    arg = arg || this.props;

    const { pathname, account, dispatch, globalModal } = arg;
    const { authenticated } = account;

    if (!authenticated) {
      if (/^\/(my_analyses|notification)/.test(pathname)) {
        if (!globalModal.show || globalModal.componentName !== "sign_in") {
          dispatch(showGlobalModal("sign_in"));
        }
        dispatch(push("/home"));
      }
    }
  };

  componentWillMount() {
    this.updateAuthIfNeed();
    this.toAuthIfNeed();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  componentDidUpdate() {
    this.updateAuthIfNeed();
  }

  componentWillReceiveProps(nextProps) {
    this.toAuthIfNeed(nextProps);
  }

  render() {
    return null;
  }
}

export default connect(state => {
  const { pathname } = state.get("router").location;

  return {
    pathname,
    account: state.get("account"),
    globalModal: state.get("globalModal")
  };
})(AuthContainer);
