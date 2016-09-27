import React from 'lib/react';
import TabBar from 'component/mdl/layout/header/tab-bar';

const Header = ({ options, title }) => {
  let row = null;

  if (options && options.row) {
    row = <TabBar options={options.row}/>;
  }

  return (
    <header className="mdl-layout__header mdl-layout--fixed-tabs">
      <div className="mdl-layout__header-row">
        <span className="mdl-layout-title">
          {title}
        </span>
      </div>
      {row}
    </header>
  );
};

export default Header;
