/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { SampleIModels } from "@itwinjs-sandbox";
import { BeEvent } from "@bentley/bentleyjs-core";
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
    static getIModelList(): any[];
    static setIModelList(value?: SampleIModels[]): void;
    static resetIModelList(): void;
    static changeIModel(iModelName?: SampleIModels): Promise<void>;
    static getIModelInfo(iModelName?: SampleIModels): Promise<{
        iModelName: any;
        contextId: string;
        iModelId: string;
    }>;
    private static getiModelParam;
    private static updateiModelParam;
}
