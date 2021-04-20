import React, { FunctionComponent } from "react";
import { SampleSpecFile } from "./SampleSpec";
export interface EditorProps {
    files?: () => SampleSpecFile[];
    readme?: () => Promise<{
        default: string;
    }>;
    onCloseClick: () => void;
    onTranspiled: ((blobUrl: string) => void);
    style?: React.CSSProperties;
}
export declare const SampleEditorContext: FunctionComponent<EditorProps>;
//# sourceMappingURL=SampleEditorContext.d.ts.map