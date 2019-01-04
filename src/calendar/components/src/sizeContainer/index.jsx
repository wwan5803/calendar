import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Measure from "react-measure";
import { calcSize } from "utils";
import { updateScreenSize } from "store/actions";

class SizeContainer extends PureComponent {
  render() {
    return (
      <Measure
        bounds
        onResize={contentRect => {
          const size = calcSize(contentRect.bounds.width);
          if (size !== this.props.screenSize) {
            this.props.dispatch(updateScreenSize(size));
          }
        }}
      >
        {({ measureRef }) => <div ref={measureRef} />}
      </Measure>
    );
  }
}

export default connect(state => ({ screenSize: state.get("screenSize") }))(
  SizeContainer
);
