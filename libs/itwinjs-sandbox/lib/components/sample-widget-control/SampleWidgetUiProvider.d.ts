import { ReactNode } from "react";
import { AbstractWidgetProps, StagePanelLocation, StagePanelSection, UiItemsProvider } from "@bentley/ui-abstract";
import { SampleIModels } from "../../SampleIModels";
import { onIModelResultEvent } from "../../imodel/IModelSetup";
export declare class SampleWidgetUiProvider implements UiItemsProvider {
    readonly id: string;
    static readonly controlsWidgetId: string;
    private _widgets;
    private _updater;
    private _queue;
    /** Create a SampleWidgetProvider to share sample instructions, controls, and an iModel selector
     * @param instructions - The instructions for the current sample
     * @param controls - A React Node to be used for controlling the current sample
     * @param onIModelChange - A callback in the case that the current iModel changes via the iModelSelector
     * @param iModels - A list of iModels the selector will be populated with (defaults to ALL)
    */
    constructor(instructions: string, controls?: ReactNode, onIModelChange?: onIModelResultEvent, iModels?: SampleIModels[]);
    /** Create a SampleWidgetProvider to share sample instructions, controls, and an iModel selector
     * @param instructions - The instructions for the current sample
     * @param onIModelChange - A callback in the case that the current iModel changes via the iModelSelector
     * @param iModels - A list of iModels the selector will be populated with (defaults to ALL)
    */
    constructor(instructions: string, onIModelChange?: onIModelResultEvent, iModels?: SampleIModels[]);
    addWidget(id: string, label: string, widget: ReactNode): void;
    updateWidget(id: string, props: any): void;
    updateControls(props: any): void;
    private _onRender;
    provideWidgets(_stageId: string, _stageUsage: string, location: StagePanelLocation, _section?: StagePanelSection | undefined): ReadonlyArray<AbstractWidgetProps>;
}
//# sourceMappingURL=SampleWidgetUiProvider.d.ts.map