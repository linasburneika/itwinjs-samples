/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import React from "react";

export interface LinkProps {
  href: string;
  fileClicked: (fileName: string) => void;
  sampleClicked: (groupName: string, sampleName: string, wantScroll: boolean) => void;
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export class Link extends React.Component<LinkProps> {
  private onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const substrings = this.props.href.split("/");

    if (0 >= substrings.length)
      return; // throw an error?

    if ("." === substrings[0]) {
      // We are expecting something like: ./filename
      if (1 >= substrings.length)
        return; // throw an error?

      const fileName = this.props.href;
      event.preventDefault();
      this.props.fileClicked(fileName);

    } else if (".." === substrings[0]) {
      // We are expecting something like: ../path/sample-name/filename
      if (2 >= substrings.length)
        return; // throw an error?

      const fileArg = substrings.length - 1;
      const fileName = substrings[fileArg];

      event.preventDefault();
      this.props.fileClicked(fileName);
    }
  };

  public render() {
    const anchorProps = { href: this.props.href, onClick: this.onClick, target: "_blank" };
    return (<a {...anchorProps}>{this.props.children}</a>);
  }
}
