/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { FunctionComponent, ReactNode } from "react";
import "./SampleWidgetContainer.scss";
export declare const measureDomNode: (node: HTMLElement) => {
    height: number;
    width: number;
};
export interface SampleWidgetContainerProps {
    frontstageId: string;
    widgetId: string;
    instructions?: string;
    iModelSelector?: ReactNode;
}
export declare const SampleWidgetContainer: FunctionComponent<SampleWidgetContainerProps>;
