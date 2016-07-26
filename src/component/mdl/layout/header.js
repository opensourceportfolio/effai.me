import React from 'lib/react';
import TabBar from 'component/mdl/layout/header/tab-bar';

const Header = (props) => {
  let row = null;
  const options = props.options;

  if (options && options.row) {
    row = <TabBar options={options.row}/>;
  }

  return (
    <header className="mdl-layout__header mdl-layout--fixed-tabs">
      <div className="mdl-layout__header-row">
        <span className="mdl-layout-title">
          {props.title}
        </span>
      </div>
      {row}
    </header>
  );
};

export default Header;
