import React, { Component } from "react";
import { connect } from "react-redux";
import { encodeParams, urlToObject } from "./paramsParser";

const mapStateToProps = state => {
  const location = state.get("router").location;
  const { search, pathname } = location;

  return {
    authenticated: state.get("account").authenticated,
    search,
    pathname
  };
};

class Wrapper extends Component {
  popupAuthIfNotAuthenticated = () => {
    const { authenticated, dispatch, search, pathname } = this.props;

    if (authenticated) return;

    const obj = urlToObject(search);

    const { modal, modal_component, ...rest } = obj;
    console.log("todo");
    /* dispatch(
      push(
        pathname +
          "?" +
          encodeParams({
            ...rest,
            modal: "open",
            modal_component: "sign_in"
          })
      )
    ); */
  };

  render() {
    const { component: Com, ...rest } = this.props;
    return (
      <Com
        popupAuthIfNotAuthenticated={this.popupAuthIfNotAuthenticated}
        {...rest}
      />
    );
  }
}

export const detectAuthWrapper = component =>
  connect(mapStateToProps)(props =>
    <Wrapper {...props} component={component} />
  );
