import * as React from "react";
export interface DrawerProps {
    active?: boolean;
    onDrawerOpen: () => void;
    onDrawerClosed: () => void;
}
export interface DrawState {
    active?: string;
}
export default class Drawer extends React.Component<DrawerProps, DrawState> {
    constructor(props: DrawerProps);
    componentDidUpdate(prevProps: DrawerProps, prevState: DrawState): void;
    private _onNavItemClick;
    render(): JSX.Element;
}
//# sourceMappingURL=Drawer.d.ts.map