import { SampleIModels } from "@bentley/itwinjs-sandbox";
export interface SampleSpecFile {
    name: string;
    import: Promise<{
        default: string;
    }>;
    entry?: boolean;
}
export interface SampleSpec {
    name: string;
    label: string;
    image: string;
    readme?: () => Promise<{
        default: string;
    }>;
    files?: () => SampleSpecFile[];
    iModelList?: SampleIModels[];
    iTwinViewerReady?: boolean;
    type?: string;
}
//# sourceMappingURL=SampleSpec.d.ts.map