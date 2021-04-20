/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import React, { Component } from "react";
import { RunCodeButton, TabNavigation as TabNav } from "@bentley/monaco-editor";
import classNames from "classnames";
import "./TabNavigation.scss";
export class TabNavigation extends Component {
    constructor(props) {
        super(props);
        this._onRunStarted = () => {
            this.setState({ error: undefined, result: undefined });
        };
        this._onBundleError = (error) => {
            this.setState({ error, result: undefined });
            console.log("Transpie error", error);
        };
        this._onRunCompleted = (blob) => {
            this.setState({ error: undefined, result: blob });
        };
        this.state = {};
    }
    componentDidUpdate(_prevProps, prevState) {
        if (this.state.result && this.state.result !== prevState.result) {
            this.props.onRunCompleted(this.state.result);
        }
    }
    render() {
        return (React.createElement(TabNav, { showClose: false },
            React.createElement("div", { className: "action-item ", onClick: this.props.onShowReadme },
                React.createElement("div", { className: classNames("icon icon-info readme-button", { "readme-button-active": this.props.showReadme }) })),
            React.createElement("div", { className: "action-item run-code-button" },
                React.createElement(RunCodeButton, { onRunStarted: this._onRunStarted, onBundleError: this._onBundleError, onRunCompleted: this._onRunCompleted, buildOnRender: false }))));
    }
}
//# sourceMappingURL=TabNavigation.js.map