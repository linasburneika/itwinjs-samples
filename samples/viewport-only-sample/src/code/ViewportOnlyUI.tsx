/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import React from "react";
import { AuthorizationClient, default3DSandboxUi, SampleIModels, SampleWidgetUiProvider, ViewSetup } from "@bentley/itwinjs-sandbox";
import { Viewer } from "@bentley/itwin-viewer-react";
import { IModelConnection } from "@bentley/imodeljs-frontend";
import { UiItemsProvider } from "@bentley/ui-abstract";
import { IModelViewportControlOptions } from "@bentley/ui-framework";

interface ViewportOnlyUIState {
  iModelName?: SampleIModels;
  contextId?: string;
  iModelId?: string;
  viewportOptions?: IModelViewportControlOptions;
}

export default class ViewportOnlyUI extends React.Component<{}, ViewportOnlyUIState> {
  private _uiItemProviders: UiItemsProvider[];

  constructor(props: {}) {
    super(props);
    this.state = {};
    this._uiItemProviders = [new SampleWidgetUiProvider("Use the toolbar", this.setState.bind(this))];
  }

  private _oniModelReady = async (iModelConnection: IModelConnection) => {
    const viewState = await ViewSetup.getDefaultView(iModelConnection);
    this.setState({ viewportOptions: { viewState } });
  };

  /** The sample's render method */
  public render() {
    return (
      <>
        { /* Viewport to display the iModel */}
        {this.state.iModelName && this.state.contextId && this.state.iModelId &&
          <Viewer
            contextId={this.state.contextId}
            iModelId={this.state.iModelId}
            viewportOptions={this.state.viewportOptions}
            authConfig={{ oidcClient: AuthorizationClient.oidcClient }}
            defaultUiConfig={default3DSandboxUi}
            theme="dark"
            uiProviders={this._uiItemProviders}
            onIModelConnected={this._oniModelReady}
          />
        }
      </>
    );
  }
}
