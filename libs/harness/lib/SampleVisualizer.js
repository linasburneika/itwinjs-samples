/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { IModelApp } from "@bentley/imodeljs-frontend";
import { Presentation } from "@bentley/presentation-frontend";
import { Spinner, SpinnerSize } from "@bentley/ui-core/lib/ui-core/loading/Spinner";
import { AuthorizationClient, IModelSetup } from "@Bentley/itwinjs-sandbox";
import React, { useEffect, useState } from "react";
//import { SampleBaseApp } from "SampleBaseApp";
const i18nNamespace = "sample-showcase-i18n-namespace";
const iModelAppShutdown = async () => {
    if (IModelApp.i18n && IModelApp.i18n.getNamespace(i18nNamespace)) {
        IModelApp.i18n.unregisterNamespace(i18nNamespace);
    }
    // if (IModelApp.tools && IModelApp.tools.find(MovePointTool.toolId)) {
    //   IModelApp.tools.unRegister(MovePointTool.toolId);
    // }
    try {
        Presentation.terminate();
    }
    catch (err) {
        // Do nothing, its possible that we never started.
    }
    try {
        await IModelApp.shutdown();
    }
    catch (err) {
        // Do nothing, its possible that we never started.
    }
};
const iModelAppStartup = async () => {
    //await SampleBaseApp.startup();
    //MovePointTool.register(IModelApp.i18n.registerNamespace(i18nNamespace));
};
export const SampleVisualizer = ({ transpileResult, iModelName, iModelSelector }) => {
    const [appReady, setAppReady] = useState(false);
    const [sampleUi, setSampleUi] = useState();
    const [shuttingDown, setShuttingDown] = useState(false);
    useEffect(() => {
        if (!shuttingDown) {
            AuthorizationClient.initializeOidc()
                .then(() => {
                console.log("Visualizer initializeOidc done");
                setAppReady(true);
            });
            return () => {
                setShuttingDown(true);
                setAppReady(false);
                IModelSetup.resetIModelList();
                iModelAppShutdown()
                    .then(() => setShuttingDown(false));
                console.log("Visualizer shut down");
            };
        }
        return;
    }, [shuttingDown]);
    // Set sample UI
    // useEffect(() => {
    //   const key = context.keys().find((k: string) => k.includes(type));
    //   try {
    //     if (key) {
    //       const component = context(key).default as React.ComponentClass<SampleProps>;
    //       setSampleUi(React.createElement(component, { iModelName, iModelSelector }));
    //     } else {
    //       setSampleUi(<div>Failed to resolve sample &quot;{type}&quot;</div>);
    //     }
    //   } catch (error) {
    //     setSampleUi(<DisplayError error={error} />);
    //   }
    // }, [type, iModelName, iModelSelector]);
    // Refresh sample UI on transpile
    useEffect(() => {
        if (transpileResult) {
            console.log("Visualizer got transpile ResultSelector", transpileResult);
            import(/* webpackIgnore: true */ transpileResult).then((module) => {
                console.log(module);
                const component = module.default;
                setSampleUi(React.createElement(component, { iModelName, iModelSelector }));
            }).catch(error => {
                console.log("Visualizer transpile error", error);
            });
        }
    }, [transpileResult, iModelName, iModelSelector]);
    if (!appReady || !transpileResult) {
        return (React.createElement("div", { className: "uicore-fill-centered" },
            React.createElement(Spinner, { size: SpinnerSize.Large })));
    }
    return React.createElement(React.Fragment, null, sampleUi);
};
//# sourceMappingURL=SampleVisualizer.js.map