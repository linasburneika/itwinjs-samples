/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import React from "react";
import { EditorEnvironmentContextProvider } from "@bentley/monaco-editor";
import { SampleEditor } from "./SampleEditor";
export const SampleEditorContext = (props) => {
    const { files, readme, style, onCloseClick, onTranspiled } = props;
    return (React.createElement(EditorEnvironmentContextProvider, null,
        React.createElement(SampleEditor, { files: files, readme: readme, style: style, onCloseClick: onCloseClick, onTranspiled: onTranspiled })));
};
//# sourceMappingURL=SampleEditorContext.js.map