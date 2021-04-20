import * as React from "react";
interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
    errorInfo?: React.ErrorInfo;
}
export declare class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
    constructor(props: any);
    static getDerivedStateFromError(): {
        hasError: boolean;
    };
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void;
    render(): {} | null | undefined;
}
export {};
//# sourceMappingURL=ErrorBoundary.d.ts.map