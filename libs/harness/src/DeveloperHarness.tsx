/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import React, { FunctionComponent, useCallback, useState } from "react";
import { defaultIModel, defaultIModelList, IModelSelector, SampleIModels } from "@bentley/itwinjs-sandbox";
import { SplitScreen } from "@bentley/monaco-editor/lib/components/split-screen/SplitScreen";
import Pane from "@bentley/monaco-editor/lib/components/split-screen/Pane";
import { Button, ButtonSize, ButtonType } from "@bentley/ui-core/lib/ui-core/button/Button";
import { ErrorBoundary } from "./ErrorBoundary";
import { SampleEditorContext } from "./SampleEditorContext"
import { SampleVisualizer } from "./SampleVisualizer";
import "./DeveloperHarness.scss";
import { SampleSpec } from "SampleSpec";

export interface DeveloperHarnessProps {
  spec: SampleSpec;
}

export const DeveloperHarness: FunctionComponent<DeveloperHarnessProps> = ({ spec }) => {
  const { files, readme, iModelList } = spec;
  const getImodelList = () => iModelList || defaultIModelList;
  const getDefaultImodel = () => getImodelList().length ? getImodelList()[0] : defaultIModel;

  const [iModelName, setImodelName] = useState<SampleIModels>(() => getDefaultImodel());
  const [showEditor, setShowEditor] = useState(true);
  const [transpileResult, setTranspileResult] = useState<string>();
  const [dragging, setDragging] = useState<boolean>(false);
  const editorClassName = dragging ? "editor-pane dragging" : "editor-pane";

  const onEditorSizeChange = (size: number) => {
    if (size < 400 && showEditor) {
      setShowEditor(false);
    } else if (size >= 400) {
      setShowEditor(true);
    }
  };

  const getImodelSelector = useCallback(() => {
    if (!iModelList || !iModelList.length)
      return undefined;

    return (
      <div className="model-selector">
        <IModelSelector
          iModelNames={getImodelList()}
          iModelName={iModelName}
          onIModelChange={(name) => setImodelName(name)} />
      </div>);
  }, [iModelList]);

  return (
    <div className="harness">
      <SplitScreen split="vertical" onResizeStart={() => setDragging(true)} onResizeEnd={() => setDragging(false)}>
        <Pane className={editorClassName} snapSize="400px" disabled={!showEditor} size={showEditor ? "400px" : "0"} onChange={onEditorSizeChange}>
          <SampleEditorContext
            files={files}
            style={{ minWidth: "400px" }}
            onCloseClick={() => setShowEditor(!showEditor)}
            onTranspiled={(blob) => setTranspileResult(blob)}
            readme={readme} />
        </Pane>
        <Pane className="preview" minSize="500px">
          {!showEditor && <Button size={ButtonSize.Large} buttonType={ButtonType.Blue} className="show-panel show-code-button" onClick={() => setShowEditor(!showEditor)}><span className="icon icon-chevron-right"></span></Button>}
          {showEditor && <Button size={ButtonSize.Large} buttonType={ButtonType.Blue} className="hide-panel hide-code-button" onClick={() => setShowEditor(!showEditor)}><span className="icon icon-chevron-left"></span></Button>}
          <div id="sample-container" className="sample-content" style={{ height: "100%" }}>
            <ErrorBoundary key={transpileResult}>
              <SampleVisualizer
                iModelName={iModelName}
                iModelSelector={getImodelSelector()}
                transpileResult={transpileResult}
                iTwinViewerReady={true} />
            </ErrorBoundary>
          </div>
        </Pane>
      </SplitScreen>
    </div>
  );
};


