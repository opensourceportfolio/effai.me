import React from 'lib/react';

export class Drawer extends React.Component {
  render() {
    let links = this.props.links.map((link) => {
      return (
        <a className="mdl-navigation__link" href={link.url}>{link.title}</a>
      );
    });

    return (
      <div className="mdl-layout__drawer">
        <span className="mdl-layout-title">Title</span>
        <nav className="mdl-navigation">
          {links}
        </nav>
      </div>
    );
  }
}
