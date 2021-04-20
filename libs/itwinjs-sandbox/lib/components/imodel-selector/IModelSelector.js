/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import React from "react";
import "@bentley/icons-generic-webfont/dist/bentley-icons-generic-webfont.css";
import { Select } from "@bentley/ui-core/lib/ui-core/select/Select";
export const IModelSelector = ({ iModelNames, iModelName, onIModelChange }) => {
    const iModelList = iModelNames || [];
    const currentiModel = iModelName;
    const _handleSelection = async (event) => {
        const index = Number.parseInt(event.target.selectedOptions[0].value, 10);
        const name = iModelList[index];
        onIModelChange(name);
    };
    const value = iModelList.findIndex((v) => v === currentiModel);
    return (React.createElement("div", null,
        React.createElement("hr", null),
        React.createElement("span", null, "Select iModel: "),
        React.createElement(Select, { className: "imodel-list", value: value.toString(), onChange: _handleSelection, options: Object.fromEntries(iModelList.map((name, index) => [index, name])) })));
};
//# sourceMappingURL=IModelSelector.js.map