/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import React, { useEffect, useState } from "react";
import { StagePanelLocation } from "@bentley/ui-abstract";
import { SampleWidgetContainer } from "./SampleWidgetContainer";
import { IModelSelector } from "../imodel-selector/IModelSelector";
import { IModelSetup } from "../../imodel/IModelSetup";
export class SampleWidgetUiProvider {
    constructor(instructions, arg1, arg2, arg3) {
        this.id = "SampleUiProvider";
        this._widgets = [];
        this._updater = {};
        this._queue = {};
        this._onRender = (id) => {
            if (this._queue[id]) {
                this._updater[id](this._queue[id]);
                delete this._queue[id];
            }
        };
        const controlsWidget = typeof arg1 !== "function" ? arg1 : undefined;
        const onIModelChange = typeof arg1 === "function" ? arg1 : typeof arg2 === "function" ? arg2 : undefined;
        const imodels = Array.isArray(arg2) ? arg2 : arg3;
        if (onIModelChange) {
            IModelSetup.onIModelChanged.addListener(onIModelChange);
            IModelSetup.setIModelList(imodels);
        }
        this.addWidget(SampleWidgetUiProvider.controlsWidgetId, "Sample Controls", React.createElement(SampleControlsWidget, { instructions: instructions, id: SampleWidgetUiProvider.controlsWidgetId, frontstageId: "defaultFrontstage" }, controlsWidget));
    }
    addWidget(id, label, widget) {
        const widgetProps = this._widgets.find((props) => props.id === id);
        if (!widgetProps) {
            const props = React.isValidElement(widget) ? widget.props : undefined;
            this._widgets.push({
                id,
                label,
                widget: React.createElement(WidgetWrapper, { id: id, setUpdater: (fn) => this._updater[id] = fn, widget: widget, props: props, onRender: this._onRender }),
            });
        }
    }
    updateWidget(id, props) {
        if (this._updater[id]) {
            this._updater[id](props);
        }
        else {
            this._queue[id] = props;
        }
        const widgetIndex = this._widgets.findIndex((widget) => widget.id === id);
        if (widgetIndex >= 0) {
            const widget = this._widgets[widgetIndex].widget.props.widget;
            const updatedProps = React.isValidElement(widget) ? { ...widget.props, ...props } : undefined;
            const updatedWidget = React.isValidElement(widget) ? React.cloneElement(widget, updatedProps) : widget;
            this._widgets[widgetIndex] = {
                ...this._widgets[widgetIndex],
                widget: React.createElement(WidgetWrapper, { id: id, setUpdater: (fn) => this._updater[id] = fn, widget: updatedWidget, props: updatedProps, onRender: this._onRender }),
            };
        }
    }
    updateControls(props) {
        const index = this._widgets.findIndex((widget) => widget.id === SampleWidgetUiProvider.controlsWidgetId);
        let children = this._widgets[index].widget.props.widget.props.children;
        children = React.cloneElement(children, { ...children.props, ...props });
        this.updateWidget(SampleWidgetUiProvider.controlsWidgetId, { children });
    }
    provideWidgets(_stageId, _stageUsage, location, _section) {
        const widgets = [];
        if (location === StagePanelLocation.Bottom) {
            this._widgets.forEach((def) => {
                widgets.push({
                    id: def.id,
                    label: def.label,
                    // eslint-disable-next-line react/display-name
                    getWidgetContent: () => def.widget,
                });
            });
        }
        return widgets;
    }
}
SampleWidgetUiProvider.controlsWidgetId = "sampleControlsWidget";
const SampleControlsWidget = (props) => {
    var _a;
    const [iModelName, setiModelName] = useState((_a = IModelSetup.currentIModel) === null || _a === void 0 ? void 0 : _a.iModelName);
    useEffect(() => {
        var _a;
        if (((_a = IModelSetup.currentIModel) === null || _a === void 0 ? void 0 : _a.iModelName) !== iModelName) {
            IModelSetup.changeIModel(iModelName);
        }
    }, [iModelName]);
    useEffect(() => {
        const unsub = IModelSetup.onIModelChanged.addListener((result) => setiModelName(result.iModelName));
        return unsub;
    }, []);
    return (React.createElement(SampleWidgetContainer, { widgetId: props.id, frontstageId: props.frontstageId, instructions: props.instructions, iModelSelector: iModelName && React.createElement(IModelSelector, { iModelName: iModelName, iModelNames: IModelSetup.getIModelList(), onIModelChange: setiModelName }) }, props.children));
};
const WidgetWrapper = ({ id, widget, setUpdater, props: incomingProps, onRender }) => {
    const [props, setProps] = useState(incomingProps);
    useEffect(() => {
        setUpdater((newProps) => {
            setProps({ ...props, ...newProps });
        });
    }, [setUpdater, props]);
    useEffect(() => {
        setProps(incomingProps);
    }, [incomingProps]);
    useEffect(() => {
        onRender(id);
    }, [id, onRender]);
    return React.createElement(React.Fragment, null, React.isValidElement(widget) ? React.cloneElement(widget, props) : widget);
};
//# sourceMappingURL=SampleWidgetUiProvider.js.map