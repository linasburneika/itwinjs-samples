import { Component } from "react";
import "./TabNavigation.scss";
export interface TabNavigationProps {
    showReadme: boolean;
    onRunCompleted: (blob: string) => void;
    onShowReadme: () => void;
}
export interface TabNavigationState {
    error?: Error;
    result?: string;
}
export declare class TabNavigation extends Component<TabNavigationProps, TabNavigationState> {
    constructor(props: TabNavigationProps);
    componentDidUpdate(_prevProps: TabNavigationProps, prevState: TabNavigationState): void;
    private _onRunStarted;
    private _onBundleError;
    private _onRunCompleted;
    render(): JSX.Element;
}
//# sourceMappingURL=TabNavigation.d.ts.map