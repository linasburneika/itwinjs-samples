/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import { SampleSpec } from "@bentley/itwinjs-sandbox-harness";

export function getViewportOnlySpec(): SampleSpec {
  return ({
    name: "viewport-only-sample",
    label: "3d",
    image: "viewport-only-thumbnail.png",
    iTwinViewerReady: true,
    readme: async () => import("!!raw-loader!./readme.md"),
    files: () => [
      { name: "ViewportOnlyUI.tsx", import: import("!!raw-loader!./ViewportOnlyUI"), entry: true },
    ],
    type: "ViewportOnlyUI.tsx"
  });
}
