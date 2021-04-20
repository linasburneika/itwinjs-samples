/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import React, { useCallback, useState } from "react";
import { defaultIModel, defaultIModelList, IModelSelector } from "@bentley/itwinjs-sandbox";
import { SplitScreen } from "@bentley/monaco-editor/lib/components/split-screen/SplitScreen";
import Pane from "@bentley/monaco-editor/lib/components/split-screen/Pane";
import { Button, ButtonSize, ButtonType } from "@bentley/ui-core/lib/ui-core/button/Button";
import { Spinner, SpinnerSize } from "@bentley/ui-core/lib/ui-core/loading/Spinner";
import { ErrorBoundary } from "./ErrorBoundary";
import { SampleEditorContext } from "./SampleEditorContext";
import { SampleVisualizer } from "./SampleVisualizer";
import "./SampleShowcase.scss";
export const SampleShowcase = ({ files, readme, iModelList }) => {
    const getImodelList = () => iModelList || defaultIModelList;
    const getDefaultImodel = () => getImodelList().length ? getImodelList()[0] : defaultIModel;
    const [iModelName, setImodelName] = useState(() => getDefaultImodel());
    const [showEditor, setShowEditor] = useState(true);
    const [showGallery, setShowGallery] = useState(true);
    const [transpileResult, setTranspileResult] = useState();
    const [dragging, setDragging] = useState(false);
    let sizes = ["400px", "1", "200px"];
    const [editorMinSize, _, galleryMinSize] = sizes;
    const editorClassName = dragging ? "editor-pane dragging" : "editor-pane";
    const onEditorSizeChange = (size) => {
        if (size < 400 && showEditor) {
            setShowEditor(false);
        }
        else if (size >= 400 && !showGallery) {
            setShowEditor(true);
        }
    };
    const getImodelSelector = useCallback(() => {
        if (!iModelList || !iModelList.length)
            return undefined;
        return (React.createElement("div", { className: "model-selector" },
            React.createElement(IModelSelector, { iModelNames: getImodelList(), iModelName: iModelName, onIModelChange: (name) => setImodelName(name) })));
    }, [iModelList]);
    const spinner = (React.createElement("div", { className: "uicore-fill-centered" },
        React.createElement(Spinner, { size: SpinnerSize.XLarge })));
    const str = (blob) => {
        setTranspileResult(blob);
    };
    return (React.createElement("div", { className: "showcase" },
        React.createElement(SplitScreen, { split: "vertical", onResizeStart: () => setDragging(true), onResizeEnd: () => setDragging(false), onChange: (newSizes) => sizes = newSizes },
            React.createElement(Pane, { className: editorClassName, snapSize: "400px", disabled: !showEditor, size: showEditor ? "400px" : "0", onChange: onEditorSizeChange },
                React.createElement(SampleEditorContext, { files: files, style: { minWidth: editorMinSize }, onCloseClick: () => setShowEditor(!showEditor), onTranspiled: (blob) => str(blob), readme: readme })),
            React.createElement(Pane, { className: "preview", minSize: "500px" },
                !showEditor && React.createElement(Button, { size: ButtonSize.Large, buttonType: ButtonType.Blue, className: "show-panel show-code-button", onClick: () => setShowEditor(!showEditor) },
                    React.createElement("span", { className: "icon icon-chevron-right" })),
                showEditor && React.createElement(Button, { size: ButtonSize.Large, buttonType: ButtonType.Blue, className: "hide-panel hide-code-button", onClick: () => setShowEditor(!showEditor) },
                    React.createElement("span", { className: "icon icon-chevron-left" })),
                React.createElement("div", { id: "sample-container", className: "sample-content", style: { height: "100%" } },
                    React.createElement(ErrorBoundary, { key: transpileResult },
                        React.createElement(SampleVisualizer, { iModelName: iModelName, iModelSelector: getImodelSelector(), transpileResult: transpileResult, iTwinViewerReady: true })))))));
};
//# sourceMappingURL=SampleShowcase.js.map