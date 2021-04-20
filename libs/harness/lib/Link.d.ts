import React from "react";
export interface LinkProps {
    href: string;
    fileClicked: (fileName: string) => void;
    sampleClicked: (groupName: string, sampleName: string, wantScroll: boolean) => void;
    onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}
export declare class Link extends React.Component<LinkProps> {
    private onClick;
    render(): JSX.Element;
}
//# sourceMappingURL=Link.d.ts.map