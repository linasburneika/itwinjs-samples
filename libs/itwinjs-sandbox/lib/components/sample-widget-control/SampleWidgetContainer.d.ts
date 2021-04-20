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
//# sourceMappingURL=SampleWidgetContainer.d.ts.map