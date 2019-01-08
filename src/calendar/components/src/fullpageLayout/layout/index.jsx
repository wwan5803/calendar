import React, { Component } from "react";
import "./layout.scss";
import { connect } from "react-redux";
import { updateHorizontalLayoutSize } from "store/actions";

export const FullHeightBlock = connect(state => ({
  scrollAreaHeight: state.get("horizontalLayoutSize").scrollAreaHeight
}))(
  class FullHeightBlock extends Component {
    componentDidMount() {
      window.addEventListener("resize", this.resizeHandler);

      const { clientHeight } = this.sizeDetector;
      const { scrollAreaHeight, dispatch } = this.props;

      if (scrollAreaHeight !== clientHeight) {
        dispatch(
          updateHorizontalLayoutSize({
            scrollAreaHeight: clientHeight
          })
        );
      }
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.resizeHandler);
    }

    resizeHandler = () => {
      const { clientHeight } = this.sizeDetector;
      const { scrollAreaHeight, dispatch } = this.props;

      if (scrollAreaHeight !== clientHeight) {
        dispatch(
          updateHorizontalLayoutSize({
            scrollAreaHeight: clientHeight
          })
        );
      }
    };

    render() {
      const { children } = this.props;
      return (
        <div styleName="full-height" ref={ele => (this.sizeDetector = ele)}>
          {children}
        </div>
      );
    }
  }
);

export function FullHeightBlockWithBackground({ children, style }) {
  return <div styleName="full-height-with-bg" style={style}>{children}</div>;
}

export function TopControllerRow({ children, className }) {
  return (
    <div styleName="controller" className={className}>
      {children}
    </div>
  );
}

export function ContentAreaPlaceHolder({ children, className }) {
  return (
    <div styleName="area" className={className}>
      {children}
    </div>
  );
}
