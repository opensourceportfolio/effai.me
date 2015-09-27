import React from 'lib/react';
import i18n from 'service/i18n';

export class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.i18n = i18n;
  }
  render() {
    return (
      <header className="mdl-layout__header">
        <div className="mdl-layout-icon"></div>
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">
            {this.props.title}
          </span>
          <div className="mdl-layout-spacer"></div>
        </div>
      </header>
    );
  }
}
