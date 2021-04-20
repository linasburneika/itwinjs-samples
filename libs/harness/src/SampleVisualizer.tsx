/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import { IModelApp } from "@bentley/imodeljs-frontend";
import { Presentation } from "@bentley/presentation-frontend";
import { Spinner, SpinnerSize } from "@bentley/ui-core/lib/ui-core/loading/Spinner";
import { AuthorizationClient, IModelSetup } from "@Bentley/itwinjs-sandbox";
import React, { FunctionComponent, useEffect, useState } from "react";

const i18nNamespace = "sample-showcase-i18n-namespace";
//const context = (require as any).context("./../../frontend-samples", true, /\.tsx$/);
interface SampleVisualizerProps {
  iTwinViewerReady?: boolean;
  iModelName: string;
  iModelSelector: React.ReactNode;
  transpileResult?: string;
}

interface SampleProps {
  iModelName: string;
  iModelSelector: React.ReactNode;
}

const iModelAppShutdown = async (): Promise<void> => {
  if (IModelApp.i18n && IModelApp.i18n.getNamespace(i18nNamespace)) {
    IModelApp.i18n.unregisterNamespace(i18nNamespace);
  }
  try {
    Presentation.terminate();
  } catch (err) {
    // Do nothing, its possible that we never started.
  }
  try {
    await IModelApp.shutdown();
  } catch (err) {
    // Do nothing, its possible that we never started.
  }
};

export const SampleVisualizer: FunctionComponent<SampleVisualizerProps> = ({ transpileResult, iModelName, iModelSelector }) => {
  const [appReady, setAppReady] = useState(false);
  const [sampleUi, setSampleUi] = useState<React.ReactNode>();
  const [shuttingDown, setShuttingDown] = useState<boolean>(false);

  useEffect(() => {
    if (!shuttingDown) {
      AuthorizationClient.initializeOidc()
        .then(() => {
            console.log("Visualizer initializeOidc done")
            setAppReady(true);
        });
      return () => {
        setShuttingDown(true);
        setAppReady(false);
        IModelSetup.resetIModelList();
        iModelAppShutdown()
          .then(() => setShuttingDown(false));
        console.log("Visualizer shut down")
      };
    }
    return;
  }, [shuttingDown]);

  // Refresh sample UI on transpile
  useEffect(() => {
    if (transpileResult) {
      console.log("Visualizer got transpile ResultSelector", transpileResult);
      import( /* webpackIgnore: true */ transpileResult).then((module) => {
        console.log(module);
        const component = module.default as React.ComponentClass<SampleProps>;
        setSampleUi(React.createElement(component, { iModelName, iModelSelector }));
      }).catch(error => {
        console.log("Visualizer transpile error", error)});
    }
  }, [transpileResult, iModelName, iModelSelector]);

  if (!appReady || ! transpileResult) {
    return (<div className="uicore-fill-centered"><Spinner size={SpinnerSize.Large} /></div>);
  }

  return <>{sampleUi}</>;
};
