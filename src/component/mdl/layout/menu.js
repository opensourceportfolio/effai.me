import React from 'lib/react';
import componentHandler from 'lib/mdl';

export class Menu extends React.Component {

  componentDidMount() {
    let node = this.refs.menu;

    componentHandler.upgradeElement(node);
  }

  render() {
    let options = this.props.options.map((item, index) => {
      return (
        <li key={index} className="mdl-menu__item">{item.text}</li>
      );
    });

    return (
      <div className="mdl-header__menu">
        <button id="mdl-context-menu" className="mdl-button mdl-js-button mdl-button--icon">
          <i className="material-icons">more_vert</i>
        </button>
        <ul htmlFor="mdl-context-menu" className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" ref="menu">
          {options}
        </ul>
      </div>
    );
  }
}
