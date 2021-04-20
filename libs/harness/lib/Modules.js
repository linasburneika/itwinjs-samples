/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { ExternalModule, InternalModule, TypedefModule } from "@bentley/monaco-editor";
const modules = [
    new InternalModule("react", import(/* webpackMode: "eager" */ "react")),
    new InternalModule("react-dom", import(/* webpackMode: "eager" */ "react-dom")),
    new InternalModule("@bentley/bentleyjs-core", import(/* webpackMode: "eager" */ "@bentley/bentleyjs-core")),
    new InternalModule("@bentley/context-registry-client", import(/* webpackMode: "eager" */ "@bentley/context-registry-client")),
    new InternalModule("@bentley/frontend-authorization-client", import(/* webpackMode: "eager" */ "@bentley/frontend-authorization-client")),
    new InternalModule("@bentley/geometry-core", import(/* webpackMode: "eager" */ "@bentley/geometry-core")),
    new InternalModule("@bentley/hypermodeling-frontend", import(/* webpackMode: "eager" */ "@bentley/hypermodeling-frontend")),
    new InternalModule("@bentley/imodelhub-client", import(/* webpackMode: "eager" */ "@bentley/imodelhub-client")),
    new InternalModule("@bentley/imodeljs-common", import(/* webpackMode: "eager" */ "@bentley/imodeljs-common")),
    new InternalModule("@bentley/imodeljs-frontend", import(/* webpackMode: "eager" */ "@bentley/imodeljs-frontend")),
    new InternalModule("@bentley/imodeljs-i18n", import(/* webpackMode: "eager" */ "@bentley/imodeljs-i18n")),
    new InternalModule("@bentley/imodeljs-quantity", import(/* webpackMode: "eager" */ "@bentley/imodeljs-quantity")),
    new InternalModule("@bentley/itwin-client", import(/* webpackMode: "eager" */ "@bentley/itwin-client")),
    new InternalModule("@bentley/ui-abstract", import(/* webpackMode: "eager" */ "@bentley/ui-abstract")),
    new InternalModule("@bentley/ui-components", import(/* webpackMode: "eager" */ "@bentley/ui-components")),
    new InternalModule("@bentley/ui-core", import(/* webpackMode: "eager" */ "@bentley/ui-core")),
    new InternalModule("@bentley/ui-framework", import(/* webpackMode: "eager" */ "@bentley/ui-framework")),
    new InternalModule("@bentley/presentation-frontend", import(/* webpackMode: "eager" */ "@bentley/presentation-frontend")),
    new InternalModule("@bentley/presentation-common", import(/* webpackMode: "eager" */ "@bentley/presentation-common")),
    new InternalModule("@bentley/presentation-components", import(/* webpackMode: "eager" */ "@bentley/presentation-components")),
    new InternalModule("@bentley/product-settings-client", import(/* webpackMode: "eager" */ "@bentley/product-settings-client")),
    new InternalModule("@bentley/orbitgt-core", import(/* webpackMode: "eager" */ "@bentley/orbitgt-core")),
    new InternalModule("@bentley/webgl-compatibility", import(/* webpackMode: "eager" */ "@bentley/webgl-compatibility")),
    new InternalModule("@bentley/itwin-viewer-react", import(/* webpackMode: "eager" */ "@bentley/itwin-viewer-react")),
    new InternalModule("@bentley/frontend-application-insights-client", import(/* webpackMode: "eager" */ "@bentley/frontend-application-insights-client")),
    new InternalModule("@bentley/hypermodeling-frontend", import(/* webpackMode: "eager" */ "@bentley/hypermodeling-frontend")),
    new InternalModule("@bentley/icons-generic-webfont/dist/bentley-icons-generic-webfont.css", import(/* webpackMode: "eager" */ "!!raw-loader!@bentley/icons-generic-webfont/dist/bentley-icons-generic-webfont.css")),
    new TypedefModule("@bentley/itwinjs-sandbox/lib/authentication/AuthorizationClient", import(/* webpackMode: "eager" */ "@bentley/itwinjs-sandbox/lib/authentication/AuthorizationClient"), import("!!raw-loader!@bentley/itwinjs-sandbox/lib/authentication/AuthorizationClient.d.ts")),
    new TypedefModule("@bentley/itwinjs-sandbox/lib/view/DefaultViewerProps", import(/* webpackMode: "eager" */ "@bentley/itwinjs-sandbox/lib/view/DefaultViewerProps"), import("!!raw-loader!@bentley/itwinjs-sandbox/lib/view/DefaultViewerProps.d.ts")),
    new TypedefModule("@bentley/itwinjs-sandbox/lib/view/ViewSetup", import(/* webpackMode: "eager" */ "@bentley/itwinjs-sandbox/lib/view/ViewSetup"), import("!!raw-loader!@bentley/itwinjs-sandbox/lib/view/ViewSetup.d.ts")),
    new TypedefModule("@bentley/itwinjs-sandbox/lib/imodel/IModelSetup", import(/* webpackMode: "eager" */ "@bentley/itwinjs-sandbox/lib/imodel/IModelSetup"), import("!!raw-loader!@bentley/itwinjs-sandbox/lib/imodel/IModelSetup.d.ts")),
    new TypedefModule("@bentley/itwinjs-sandbox/lib/components/sample-widget-control/SampleWidgetUiProvider", import(/* webpackMode: "eager" */ "@bentley/itwinjs-sandbox/lib/components/sample-widget-control/SampleWidgetUiProvider"), import("!!raw-loader!@bentley/itwinjs-sandbox/lib/components/sample-widget-control/SampleWidgetUiProvider.d.ts")),
    new TypedefModule("@bentley/itwinjs-sandbox/lib/components/sample-widget-control/SampleWidgetContainer", import(/* webpackMode: "eager" */ "@bentley/itwinjs-sandbox/lib/components/sample-widget-control/SampleWidgetContainer"), import("!!raw-loader!@bentley/itwinjs-sandbox/lib/components/sample-widget-control/SampleWidgetContainer.d.ts")),
    new TypedefModule("@bentley/itwinjs-sandbox/lib/constants", import(/* webpackMode: "eager" */ "@bentley/itwinjs-sandbox/lib/constants"), import("!!raw-loader!@bentley/itwinjs-sandbox/lib/constants.d.ts")),
    new TypedefModule("@bentley/itwinjs-sandbox/lib/SampleIModels", import(/* webpackMode: "eager" */ "@bentley/itwinjs-sandbox/lib/SampleIModels"), import("!!raw-loader!@bentley/itwinjs-sandbox/lib/SampleIModels.d.ts")),
    new TypedefModule("@bentley/itwinjs-sandbox", import(/* webpackMode: "eager" */ "@bentley/itwinjs-sandbox/lib/index"), import("!!raw-loader!@bentley/itwinjs-sandbox/lib/index.d.ts")),
    new ExternalModule("react"),
    new ExternalModule("@types/react"),
    new ExternalModule("react-dom")
];
export default modules;
//# sourceMappingURL=Modules.js.map