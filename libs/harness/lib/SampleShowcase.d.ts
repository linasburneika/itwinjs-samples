import { FunctionComponent } from "react";
import { SampleIModels } from "@bentley/itwinjs-sandbox";
import "./SampleShowcase.scss";
import { SampleSpecFile } from "SampleSpec";
export interface DeveloperHarnessProps {
    files?: () => SampleSpecFile[];
    readme?: () => Promise<{
        default: string;
    }>;
    iModelList?: SampleIModels[];
    type: string;
}
export declare const SampleShowcase: FunctionComponent<DeveloperHarnessProps>;
//# sourceMappingURL=SampleShowcase.d.ts.map