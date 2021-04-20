/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import React from "react";
import { Pane, setEditorState, SplitScreen, useActivityState, useEntryState, useFileState } from "@bentley/monaco-editor";
import { TabNavigation } from "./TabNavigation";
import MarkdownViewer from "./MarkdownViewer";
import Drawer from "./Drawer";
import "./SampleEditor.scss";
import { Spinner, SpinnerSize } from "@bentley/ui-core/lib/ui-core/loading/Spinner";
import MonacoEditor from "./Monaco";
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SampleEditor = (props) => {
    const { files, readme } = props;
    const fileActions = useFileState()[1];
    const [activityState, activityActions] = useActivityState();
    const [entryState, entryActions] = useEntryState();
    const [showReadme, setShowReadme] = React.useState(true);
    const [displayDrawer, setDisplayDrawer] = React.useState(false);
    const [readmeContent, setReadmeContent] = React.useState("");
    const [readmeLoading, setReadmeLoading] = React.useState(true);
    React.useEffect(() => {
        if (files) {
            const editorFiles = files() || [];
            Promise.all(editorFiles.map(async (file) => ({ content: (await file.import).default, name: file.name })))
                .then(fileActions.setFiles)
                .then(() => { var _a; return entryActions.setEntry(((_a = editorFiles.find((file) => file.entry)) === null || _a === void 0 ? void 0 : _a.name) || null); });
        }
        return () => {
            setEditorState(null, []);
        };
    }, [files, fileActions, entryActions, activityActions]);
    React.useEffect(() => {
        if (readme) {
            setReadmeLoading(true);
            readme().then((fileData) => {
                setReadmeContent(fileData.default);
                setShowReadme(true);
                setReadmeLoading(false);
            });
        }
    }, [readme, setReadmeContent, setShowReadme]);
    React.useEffect(() => {
        if (activityState.active) {
            setShowReadme(false);
        }
        else {
            setShowReadme(true);
        }
    }, [activityState.active]);
    const onShowReadme = () => {
        if (showReadme) {
            activityActions.setActive(entryState || undefined);
        }
        else {
            activityActions.clearActive();
        }
    };
    const _onDrawerOpened = () => {
        setDisplayDrawer(true);
    };
    const _onDrawerClosed = () => {
        setDisplayDrawer(false);
    };
    const _onChange = (size) => {
        if (size < 200) {
            setDisplayDrawer(false);
        }
        else {
            setDisplayDrawer(true);
        }
    };
    const drawerMinSize = showReadme ? "0" : "35px";
    const drawerSize = !showReadme ? displayDrawer ? "200px" : "35px" : "0";
    const style = props.style;
    const readmeViewer = () => {
        return readmeLoading ? React.createElement("div", { className: "sample-editor-readme uicore-fill-centered" },
            React.createElement(Spinner, { size: SpinnerSize.XLarge })) :
            React.createElement(MarkdownViewer, { readme: readmeContent, onFileClicked: activityActions.setActive });
    };
    return (React.createElement("div", { className: "sample-editor-container", style: style },
        React.createElement(SplitScreen, { split: "horizontal" },
            React.createElement(Pane, { className: "sample-editor" },
                React.createElement(TabNavigation, { onRunCompleted: props.onTranspiled, showReadme: showReadme, onShowReadme: onShowReadme }),
                React.createElement("div", { style: { height: "100%" } },
                    showReadme && readmeViewer(),
                    React.createElement(MonacoEditor, null))),
            React.createElement(Pane, { onChange: _onChange, snapSize: "200px", minSize: drawerMinSize, maxSize: "50%", size: drawerSize, disabled: showReadme || !displayDrawer, defaultSize: "0" },
                React.createElement(Drawer, { active: displayDrawer, onDrawerClosed: _onDrawerClosed, onDrawerOpen: _onDrawerOpened })))));
};
//# sourceMappingURL=SampleEditor.js.map