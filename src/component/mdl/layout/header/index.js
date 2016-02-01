import React from 'lib/react';
import TabBar from 'component/mdl/layout/header/tab-bar';

export default class Header extends React.Component {

  render() {
    let row = null;
    let options = this.props.options;

    if (options && options.row) {
      row = <TabBar options={options.row} />;
    }

    return (
      <header className="mdl-layout__header mdl-layout--fixed-tabs">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">
            {this.props.title}
          </span>
        </div>
        {row}
      </header>
    );
  }
}
