// @flow

import 'css/page.css';

import * as React from 'react';

type Props = {
  children: React.Node,
};

const Page = ({ children }: Props) => <div className="page">{children}</div>;

export default Page;
