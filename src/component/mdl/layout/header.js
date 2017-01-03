import React from 'lib/react';

export default class Header extends React.Component {
  render() {
    const { title } = this.props;

    return (
      <header className="mdl-layout__header mdl-layout--fixed-tabs" ref="header">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">
            {title}
          </span>
        </div>
      </header>
    );
  }
}
