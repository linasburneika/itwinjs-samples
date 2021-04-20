/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { Id64 } from "@bentley/bentleyjs-core";
import { ColorDef } from "@bentley/imodeljs-common";
import { AuthorizedFrontendRequestContext, DrawingViewState, Environment, IModelApp, SpatialViewState } from "@bentley/imodeljs-frontend";
import { SettingsStatus } from "@bentley/product-settings-client";
export class ViewSetup {
    /** Pick the first available spatial view definition in the imodel */
    static async getFirstViewDefinitionId(imodel) {
        // Return default view definition (if any)
        const defaultViewId = await imodel.views.queryDefaultViewId();
        if (Id64.isValid(defaultViewId))
            return defaultViewId;
        // Return first spatial view definition (if any)
        const spatialViews = await imodel.views.getViewList({ from: SpatialViewState.classFullName });
        if (spatialViews.length > 0)
            return spatialViews[0].id;
        // Return first drawing view definition (if any)
        const drawingViews = await imodel.views.getViewList({ from: DrawingViewState.classFullName });
        if (drawingViews.length > 0)
            return drawingViews[0].id;
        throw new Error("No valid view definitions in imodel");
    }
    /** Returns the aspect ration of the container the view will be created in. */
    static getAspectRatio() {
        const viewDiv = document.getElementById("sample-container");
        if (null === viewDiv)
            return undefined;
        return viewDiv.clientWidth / viewDiv.clientHeight;
    }
    /** Makes ascetic changes to the default view */
    static async overrideView(imodel, viewState) {
        const aspect = ViewSetup.getAspectRatio();
        if (undefined !== aspect) {
            const extents = viewState.getExtents();
            const origin = viewState.getOrigin();
            viewState.adjustViewDelta(extents, origin, viewState.getRotation(), aspect);
            viewState.setExtents(extents);
            viewState.setOrigin(origin);
        }
        const viewFlags = viewState.viewFlags.clone();
        viewFlags.shadows = false;
        viewFlags.grid = false;
        viewState.displayStyle.viewFlags = viewFlags;
        if (viewState.is3d()) {
            const viewState3d = viewState;
            const displayStyle = viewState3d.getDisplayStyle3d();
            displayStyle.changeBackgroundMapProps({ useDepthBuffer: true });
            const groundBias = await ViewSetup.getGroundBias(imodel);
            if (groundBias) {
                displayStyle.changeBackgroundMapProps({ groundBias });
            }
            // Enable the sky-box, but override the ugly brown color.
            displayStyle.environment = new Environment({
                sky: {
                    display: true,
                    nadirColor: ColorDef.computeTbgrFromComponents(64, 74, 66),
                },
            });
        }
        const hiddenCategories = await ViewSetup.getHiddenCategories(imodel);
        if (hiddenCategories)
            viewState.categorySelector.dropCategories(hiddenCategories);
    }
}
/** Queries for and loads the default view for an iModel. */
ViewSetup.getDefaultView = async (imodel) => {
    const viewId = await ViewSetup.getFirstViewDefinitionId(imodel);
    // Load the view state using the viewSpec's ID
    const viewState = await imodel.views.load(viewId);
    // Making some improvements to the default views.
    await ViewSetup.overrideView(imodel, viewState);
    return viewState;
};
/** Queries for categories that are unnecessary in the context of the of the sample showcase. */
ViewSetup.getHiddenCategories = async (imodel) => {
    const ids = [];
    const addIdsByCategory = async (...categoryCodes) => {
        const selectInCategories = `SELECT ECInstanceId FROM bis.Category WHERE CodeValue IN ('${categoryCodes.join("','")}')`;
        for await (const row of imodel.query(selectInCategories))
            ids.push(row.id);
    };
    if (imodel.name === "house bim upload")
        // The callout graphics in the house model are ugly - don't display them.
        await addIdsByCategory("Callouts");
    if (imodel.name === "Metrostation2")
        // There is coincident geometry. Remove the more visible instances.
        await addIdsByCategory("A-WALL-LINE", "A-FLOR-OTLN");
    return ids;
};
/*
* groundBias can be stored in Product Settings Service. This method retrieves it.
*/
ViewSetup.getGroundBias = async (imodel) => {
    const requestContext = await AuthorizedFrontendRequestContext.create();
    const allSettings = await IModelApp.settings.getSharedSettingsByNamespace(requestContext, "bingMapSettings", true, imodel.contextId, imodel.iModelId);
    if (allSettings.status === SettingsStatus.Success &&
        allSettings.settingsMap &&
        allSettings.settingsMap.has("backgroundMapSetting")) {
        const bgMapSettings = allSettings.settingsMap.get("backgroundMapSetting");
        if (undefined !== bgMapSettings.groundBias)
            return bgMapSettings.groundBias;
    }
    return undefined;
};
//# sourceMappingURL=ViewSetup.js.map