/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { ErrorIndicator, ErrorList } from "@bentley/monaco-editor";
export default class Drawer extends React.Component {
    constructor(props) {
        super(props);
        this._onNavItemClick = (event) => {
            const target = event.target.closest(".sample-editor-pane-nav-item");
            if (target && target.title && target.title.toLowerCase() !== this.state.active) {
                this.setState({ active: target.title.toLowerCase() });
            }
            else {
                this.setState({ active: undefined });
            }
        };
        this.state = {};
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.active !== prevState.active) {
            if (this.state.active) {
                this.props.onDrawerOpen();
            }
            else {
                this.props.onDrawerClosed();
            }
        }
        if (prevProps.active !== this.props.active) {
            if (!this.props.active) {
                this.setState({ active: undefined });
            }
            else {
                this.setState({ active: "problems" });
            }
        }
    }
    render() {
        return (React.createElement("div", { className: "sample-editor-pane" },
            React.createElement("div", { id: "sample-editor-pane-nav" },
                React.createElement("div", { className: `sample-editor-pane-nav-item${this.state.active === "problems" ? " active" : ""}`, title: "Problems", onClick: this._onNavItemClick },
                    React.createElement("span", null, "Problems"),
                    React.createElement(ErrorIndicator, null))),
            React.createElement("div", { id: "sample-editor-pane-drawer" }, this.props.active && React.createElement(ErrorList, null))));
    }
}
//# sourceMappingURL=Drawer.js.map