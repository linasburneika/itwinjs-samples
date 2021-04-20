import * as React from "react";
export interface MarkdownViewerProps {
    readme: string;
    onFileClicked: (file?: string | undefined) => void;
}
export default class MarkdownViewer extends React.Component<MarkdownViewerProps> {
    render(): JSX.Element;
}
//# sourceMappingURL=MarkdownViewer.d.ts.map