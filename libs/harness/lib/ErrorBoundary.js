/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { DisplayError } from "./ErrorDisplay";
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        this.setState({ hasError: true, error, errorInfo });
    }
    render() {
        if (this.state.hasError) {
            return (React.createElement(DisplayError, { error: this.state.error, errorInfo: this.state.errorInfo }));
        }
        return this.props.children;
    }
}
//# sourceMappingURL=ErrorBoundary.js.map