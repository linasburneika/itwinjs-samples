/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { IModelApp } from "@bentley/imodeljs-frontend";
import { FrontstageManager, useUiSettingsContext } from "@bentley/ui-framework";
import React, { useCallback, useEffect, useRef } from "react";
import "./SampleWidgetContainer.scss";
const containerStyle = {
    display: "block",
    position: "absolute",
    visibility: "hidden",
    height: "100vh",
    width: "100vw",
    zIndex: -1,
};
export const measureDomNode = (node) => {
    const container = document.createElement("div");
    container.style = containerStyle;
    const content = node.cloneNode(true);
    container.appendChild(content);
    document.body.appendChild(container);
    const { height, width } = content.getBoundingClientRect();
    container.parentNode.removeChild(container);
    return { height, width };
};
export const SampleWidgetContainer = ({ widgetId, instructions, iModelSelector, children }) => {
    const ref = useRef(null);
    const uiSettings = useUiSettingsContext();
    const floatWidget = useCallback(async (points, size) => {
        await uiSettings.deleteSetting("uifw-frontstageSettings", `frontstageState[${FrontstageManager.activeFrontstageDef.id}]`);
        FrontstageManager.activeFrontstageDef.restoreLayout();
        FrontstageManager.activeFrontstageDef.floatWidget(widgetId, points, size);
    }, [uiSettings, widgetId]);
    const moveWidget = useCallback(async (vp) => {
        if (ref.current) {
            await floatWidget(undefined, { height: 0, width: 0 });
            const vpDims = vp.viewRect;
            const { height, width } = measureDomNode(ref.current);
            const adjustedHeight = height + 30;
            await floatWidget({ x: (vpDims.right - width) - 32, y: vpDims.bottom - adjustedHeight - 32 }, { height: adjustedHeight, width });
        }
    }, [ref, floatWidget]);
    useEffect(() => {
        const sv = IModelApp.viewManager.selectedView;
        if (sv) {
            const unsub = sv.onResized.addListener((vp) => {
                setTimeout(async () => moveWidget(vp), 0);
            });
            FrontstageManager.onFrontstageReadyEvent.addOnce(() => {
                moveWidget(sv);
            });
            return unsub;
        }
        return;
    }, [moveWidget, uiSettings]);
    return (React.createElement("div", { ref: ref, className: "sample-widget-ui" },
        instructions && React.createElement("div", { className: "control-pane-header" },
            React.createElement("div", { className: "sample-instructions" },
                React.createElement("span", null, instructions))),
        iModelSelector,
        children && React.createElement("hr", null),
        children && children));
};
//# sourceMappingURL=SampleWidgetContainer.js.map