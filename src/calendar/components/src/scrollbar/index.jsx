import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

export class ScrollBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMouseDown: false,
      x: 0,
      y: 0,
      xEnd: 0,
      yEnd: 0
    };
  }

  componentDidMount() {}

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (!nextState.isMouseDown) {
  //     return false;
  //   }
  //   if (this.state.x === nextState.x && this.state.y === nextState.y) {
  //     return false;
  //   }
  //   return true;
  // }

  componentWillUpdate(nextProps, nextState) {
    // if (this.state.isMouseDown && !nextState.isMouseDown) {
    //   xEnd = nextState.x;
    //   yEnd = nextState.y;
    //   spaceX = xEnd - xStart;
    //   spaceY = yEnd - yStart;
    //   const { scrollbars } = this.refs;
    //   scrollbars.scrollTop(spaceY * 10);
    //   scrollbars.scrollLeft(spaceX * 10);
    //   console.log("spaceX", spaceX, "spaceY", spaceY);
    // }
  }

  render() {
    const {
      children,
      style = {},
      horStyle = {},
      verStyle = {},
      inputRef,
      handleScroll
    } = this.props;

    return (
      <Scrollbars
        universal
        ref={inputRef}
        onMouseMove={this.props._onMouseMove}
        onScroll={handleScroll && handleScroll}
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        renderThumbHorizontal={({ style, ...rest }) => (
          <div
            {...rest}
            style={{
              ...style,
              borderRadius: "inherit",
              cursor: "pointer",
              background: "rgba(255, 255, 255, .4)",
              top: "-6px",
              height: "12px",
              zIndex: 20,
              ...horStyle
            }}
          />
        )}
        renderThumbVertical={({ style, ...rest }) => (
          <div
            {...rest}
            style={{
              ...style,
              borderRadius: "inherit",
              cursor: "pointer",
              background: "rgba(255, 255, 255, .4)",
              left: "-6px",
              width: "12px",
              zIndex: 20,
              ...verStyle
            }}
          />
        )}
        style={style}
      >
        {children}
      </Scrollbars>
    );
  }
}

// export function ScrollBar({
//   children,
//   style = {},
//   horStyle = {},
//   verStyle = {}
// }) {
//   return (
//     <Scrollbars
//       autoHide
//       autoHideTimeout={1000}
//       autoHideDuration={200}
//       renderThumbHorizontal={({ style, ...rest }) =>
//         <div
//           {...rest}
//           style={{
//             ...style,
//             borderRadius: "inherit",
//             cursor: "pointer",
//             background: "rgba(255, 255, 255, .4)",
//             top: "-6px",
//             height: "12px",
//             zIndex: 20,
//             ...horStyle
//           }}
//         />}
//       renderThumbVertical={({ style, ...rest }) =>
//         <div
//           {...rest}
//           style={{
//             ...style,
//             borderRadius: "inherit",
//             cursor: "pointer",
//             background: "rgba(255, 255, 255, .4)",
//             left: "-6px",
//             width: "12px",
//             zIndex: 20,
//             ...verStyle
//           }}
//         />}
//       style={style}
//     >
//       {children}
//     </Scrollbars>
//   );
// }
