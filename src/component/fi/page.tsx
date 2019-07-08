import 'css/page.css';

import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

const Page = ({ children }: Props) => <div className="page">{children}</div>;

export default Page;
