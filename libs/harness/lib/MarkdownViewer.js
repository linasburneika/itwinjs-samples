/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import Markdown from "markdown-to-jsx";
import { Link } from "./Link";
export default class MarkdownViewer extends React.Component {
    render() {
        const options = {
            overrides: {
                a: { component: Link, props: { fileClicked: this.props.onFileClicked } },
            },
        };
        return (React.createElement("div", { className: "sample-editor-readme" },
            React.createElement(Markdown, { options: options }, this.props.readme)));
    }
}
//# sourceMappingURL=MarkdownViewer.js.map