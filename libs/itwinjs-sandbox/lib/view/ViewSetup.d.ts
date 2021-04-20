import { IModelConnection, ViewState } from "@bentley/imodeljs-frontend";
export declare type ViewType = "3D" | "2D";
export declare class ViewSetup {
    /** Queries for and loads the default view for an iModel. */
    static getDefaultView: (imodel: IModelConnection) => Promise<ViewState>;
    /** Pick the first available spatial view definition in the imodel */
    private static getFirstViewDefinitionId;
    /** Returns the aspect ration of the container the view will be created in. */
    static getAspectRatio(): number | undefined;
    /** Makes ascetic changes to the default view */
    static overrideView(imodel: IModelConnection, viewState: ViewState): Promise<void>;
    /** Queries for categories that are unnecessary in the context of the of the sample showcase. */
    private static getHiddenCategories;
    static getGroundBias: (imodel: IModelConnection) => Promise<number | undefined>;
}
//# sourceMappingURL=ViewSetup.d.ts.map