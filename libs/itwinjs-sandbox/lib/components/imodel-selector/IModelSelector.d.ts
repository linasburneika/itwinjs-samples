import { FunctionComponent } from "react";
import "@bentley/icons-generic-webfont/dist/bentley-icons-generic-webfont.css";
import { SampleIModels } from "../../SampleIModels";
interface IModelSelectorProps {
    iModelNames: SampleIModels[];
    iModelName: SampleIModels;
    onIModelChange: (iModelName: SampleIModels) => void;
}
export declare const IModelSelector: FunctionComponent<IModelSelectorProps>;
export {};
//# sourceMappingURL=IModelSelector.d.ts.map