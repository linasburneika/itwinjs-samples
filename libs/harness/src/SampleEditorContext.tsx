/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import React, { FunctionComponent } from "react";
import { EditorEnvironmentContextProvider } from "@bentley/monaco-editor";
import { SampleEditor } from "./SampleEditor";
import { SampleSpecFile } from "./SampleSpec";

export interface EditorProps {
  files?: () => SampleSpecFile[];
  readme?: () => Promise<{ default: string }>;
  onCloseClick: () => void;
  onTranspiled: ((blobUrl: string) => void);
  style?: React.CSSProperties;
}

export const SampleEditorContext: FunctionComponent<EditorProps> = (props) => {
  const { files, readme, style, onCloseClick, onTranspiled } = props;
  return (
    <EditorEnvironmentContextProvider>
      <SampleEditor
        files={files}
        readme={readme}
        style={style}
        onCloseClick={onCloseClick}
        onTranspiled={onTranspiled} />
    </EditorEnvironmentContextProvider>
  );
};
