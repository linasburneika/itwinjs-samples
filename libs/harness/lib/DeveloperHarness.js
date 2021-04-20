/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import React, { useCallback, useState } from "react";
import { defaultIModel, defaultIModelList, IModelSelector } from "@bentley/itwinjs-sandbox";
import { SplitScreen } from "@bentley/monaco-editor/lib/components/split-screen/SplitScreen";
import Pane from "@bentley/monaco-editor/lib/components/split-screen/Pane";
import { Button, ButtonSize, ButtonType } from "@bentley/ui-core/lib/ui-core/button/Button";
import { ErrorBoundary } from "./ErrorBoundary";
import { SampleEditorContext } from "./SampleEditorContext";
import { SampleVisualizer } from "./SampleVisualizer";
import "./DeveloperHarness.scss";
export const DeveloperHarness = ({ spec }) => {
    const { files, readme, iModelList } = spec;
    const getImodelList = () => iModelList || defaultIModelList;
    const getDefaultImodel = () => getImodelList().length ? getImodelList()[0] : defaultIModel;
    const [iModelName, setImodelName] = useState(() => getDefaultImodel());
    const [showEditor, setShowEditor] = useState(true);
    const [transpileResult, setTranspileResult] = useState();
    const [dragging, setDragging] = useState(false);
    const editorClassName = dragging ? "editor-pane dragging" : "editor-pane";
    const onEditorSizeChange = (size) => {
        if (size < 400 && showEditor) {
            setShowEditor(false);
        }
        else if (size >= 400) {
            setShowEditor(true);
        }
    };
    const getImodelSelector = useCallback(() => {
        if (!iModelList || !iModelList.length)
            return undefined;
        return (React.createElement("div", { className: "model-selector" },
            React.createElement(IModelSelector, { iModelNames: getImodelList(), iModelName: iModelName, onIModelChange: (name) => setImodelName(name) })));
    }, [iModelList]);
    return (React.createElement("div", { className: "showcase" },
        React.createElement(SplitScreen, { split: "vertical", onResizeStart: () => setDragging(true), onResizeEnd: () => setDragging(false) },
            React.createElement(Pane, { className: editorClassName, snapSize: "400px", disabled: !showEditor, size: showEditor ? "400px" : "0", onChange: onEditorSizeChange },
                React.createElement(SampleEditorContext, { files: files, style: { minWidth: "400px" }, onCloseClick: () => setShowEditor(!showEditor), onTranspiled: (blob) => setTranspileResult(blob), readme: readme })),
            React.createElement(Pane, { className: "preview", minSize: "500px" },
                !showEditor && React.createElement(Button, { size: ButtonSize.Large, buttonType: ButtonType.Blue, className: "show-panel show-code-button", onClick: () => setShowEditor(!showEditor) },
                    React.createElement("span", { className: "icon icon-chevron-right" })),
                showEditor && React.createElement(Button, { size: ButtonSize.Large, buttonType: ButtonType.Blue, className: "hide-panel hide-code-button", onClick: () => setShowEditor(!showEditor) },
                    React.createElement("span", { className: "icon icon-chevron-left" })),
                React.createElement("div", { id: "sample-container", className: "sample-content", style: { height: "100%" } },
                    React.createElement(ErrorBoundary, { key: transpileResult },
                        React.createElement(SampleVisualizer, { iModelName: iModelName, iModelSelector: getImodelSelector(), transpileResult: transpileResult, iTwinViewerReady: true })))))));
};
//# sourceMappingURL=DeveloperHarness.js.map