/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import "./ErrorDisplay.scss";
export function DisplayError(props) {
    return (React.createElement("div", { id: "error-overlay" },
        React.createElement("div", null,
            React.createElement("h1", null, "A runtime error has occurred."),
            props.error && React.createElement("h3", null,
                props.error.name,
                ": ",
                props.error.message),
            props.error && props.error.stack && React.createElement("code", null, props.error.stack.split("\n").map((line, i) => React.createElement("span", { key: i },
                line,
                React.createElement("br", null)))),
            props.errorInfo && React.createElement("h3", null, "The above error occurred in the following component stack:"),
            props.errorInfo && React.createElement("code", null, props.errorInfo.componentStack.split("\n").map((line, i) => React.createElement("span", { key: i },
                line,
                React.createElement("br", null)))))));
}
//# sourceMappingURL=ErrorDisplay.js.map