import React from 'lib/react';
import { Menu } from 'component/mdl/layout/menu';

export class Navbar extends React.Component {

  render() {
    let menu = this.props.options ? <Menu options={this.props.options} /> : null;

    return (
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">
            {this.props.title}
          </span>
          {menu}
        </div>
      </header>
    );
  }
}
