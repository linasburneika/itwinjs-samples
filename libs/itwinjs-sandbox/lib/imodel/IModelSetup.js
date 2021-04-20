/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { AuthorizedFrontendRequestContext } from "@bentley/imodeljs-frontend";
import { ContextRegistryClient } from "@bentley/context-registry-client";
import { IModelHubClient, IModelQuery } from "@bentley/imodelhub-client";
import { AuthorizationClient } from "../authentication/AuthorizationClient";
import { BeEvent } from "@bentley/bentleyjs-core";
import { defaultIModel, defaultIModelList } from "../constants";
export class IModelSetup {
    static getIModelList() {
        return IModelSetup._sampleIModels;
    }
    static setIModelList(value = defaultIModelList) {
        IModelSetup._sampleIModels = value;
        IModelSetup.changeIModel();
    }
    static resetIModelList() {
        IModelSetup.currentIModel = undefined;
        IModelSetup._sampleIModels = defaultIModelList;
        IModelSetup.onIModelChanged.clear();
    }
    static async changeIModel(iModelName) {
        const result = await this.getIModelInfo(iModelName);
        IModelSetup.currentIModel = result;
        IModelSetup.onIModelChanged.raiseEvent(result);
    }
    static async getIModelInfo(iModelName) {
        const requestContext = new AuthorizedFrontendRequestContext(await AuthorizationClient.oidcClient.getAccessToken());
        let projectName = iModelName || this.getiModelParam() || defaultIModel;
        if (IModelSetup._sampleIModels.length && !IModelSetup._sampleIModels.includes(projectName)) {
            projectName = IModelSetup._sampleIModels[0];
        }
        const connectClient = new ContextRegistryClient();
        let project;
        try {
            project = await connectClient.getProject(requestContext, { $filter: `Name+eq+'${projectName}'` });
        }
        catch (e) {
            throw new Error(`Project with name "${projectName}" does not exist`);
        }
        const imodelQuery = new IModelQuery();
        imodelQuery.byName(projectName);
        const hubClient = new IModelHubClient();
        const imodels = await hubClient.iModels.get(requestContext, project.wsgId, imodelQuery);
        if (imodels.length === 0)
            throw new Error(`iModel with name "${iModelName}" does not exist in project "${projectName}"`);
        this.updateiModelParam(projectName);
        const result = { iModelName: projectName, contextId: project.wsgId, iModelId: imodels[0].wsgId };
        return result;
    }
    static getiModelParam() {
        const params = new URLSearchParams(window.location.search);
        const imodel = params.get("imodel");
        return imodel;
    }
    static updateiModelParam(imodel) {
        const params = new URLSearchParams(window.location.search);
        if (imodel) {
            if (params.has("imodel")) {
                params.set("imodel", imodel);
            }
            else {
                params.append("imodel", imodel);
            }
        }
        // Detect if editor was enabled in URL params as a semi-backdoor, this
        // bypasses the ld feature flag
        const editorEnabled = new URLSearchParams(window.location.search).get("editor");
        if (editorEnabled)
            params.append("editor", editorEnabled);
        window.history.pushState(null, "", `?${params.toString()}`);
        // Send to parent if within an iframe.
        if (window.self !== window.top) {
            window.parent.postMessage(`?${params.toString()}`, "*");
        }
    }
}
IModelSetup._sampleIModels = defaultIModelList;
IModelSetup.onIModelChanged = new BeEvent();
//# sourceMappingURL=IModelSetup.js.map