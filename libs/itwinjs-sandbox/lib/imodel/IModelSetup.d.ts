import { BeEvent } from "@bentley/bentleyjs-core";
import { SampleIModels } from "../SampleIModels";
export interface IModelResult {
    iModelName: SampleIModels;
    contextId: string;
    iModelId: string;
}
export declare type onIModelResultEvent = (result: IModelResult) => void;
export declare class IModelSetup {
    private static _sampleIModels;
    static onIModelChanged: BeEvent<onIModelResultEvent>;
    static currentIModel?: IModelResult;
    static getIModelList(): SampleIModels[];
    static setIModelList(value?: SampleIModels[]): void;
    static resetIModelList(): void;
    static changeIModel(iModelName?: SampleIModels): Promise<void>;
    static getIModelInfo(iModelName?: SampleIModels): Promise<{
        iModelName: SampleIModels;
        contextId: string;
        iModelId: string;
    }>;
    private static getiModelParam;
    private static updateiModelParam;
}
//# sourceMappingURL=IModelSetup.d.ts.map