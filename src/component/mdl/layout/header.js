import React from 'lib/react';
import componentHandler from 'lib/mdl';
import TabBar from 'component/mdl/layout/header/tab-bar';

export default class Header extends React.Component {
  componentDidMount() {
    const node = this.refs.header;

    componentHandler.upgradeElement(node);
  }

  render() {
    const { options, title } = this.props;
    const row = options && options.row ?
      <TabBar index={options.tabIndex} options={options.row}/> :
      null;

    return (
      <header className="mdl-layout__header mdl-layout--fixed-tabs" ref="header">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">
            {title}
          </span>
        </div>
        {row}
      </header>
    );
  }
}
