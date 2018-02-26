// @flow

import * as React from 'react';
import 'css/page.css';

type Props = {
  children: React.Node,
};

const Page = ({ children }: Props) => <div className="page">{children}</div>;

export default Page;
