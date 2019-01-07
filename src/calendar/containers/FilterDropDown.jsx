import React, { Component, cloneElement } from "react";
// import { RootCloseWrapper } from "react-overlays";
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import "./cal.scss";

export default class DropDown extends Component {
    constructor(props) {
        super(props);

        this.state = { open: false };
    }

    toggleDropDown = () => {
        this.setState(prev => ({ open: !prev.open }));
    };

    closeDropDown = () => {
        this.setState({ open: false });
    };

    render() {
        const { content, children } = this.props;

        return (

            <div styleName="dropdown">
                <span styleName="content" onClick={this.toggleDropDown}>{content}<FaAngleDown style={{ color: "#4a4a4a", margin:'0 0 3px 10px' }} /></span>
                {/*<span styleName="trigger" onClick={this.toggleDropDown} />*/}
                {this.state.open && <div styleName="dropdown-panel">
                    {cloneElement(children, { closeDropDown: this.closeDropDown })}
                </div>}
            </div>


        );
    }
}