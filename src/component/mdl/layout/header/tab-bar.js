import React from 'lib/react';
import { Tab } from 'component/mdl/layout/header/tab';

export class TabBar extends React.Component {

  render() {
    let links = null;
    let options = this.props.options;

    if (options && options) {
      links = options.map((tab, i) => {
        return (
          <Tab text={tab.text} url={tab.url} isActive={tab.isActive} key={`tab${i}`} />
        );
      });
    }

    return (
      <div className="mdl-layout__tab-bar-container mdl-js-ripple-effect" ref="bar">
        <div className="mdl-layout__tab-bar mdl-js-ripple-effect is-casting-shadow mdl-js-ripple-effect--ignore-events">
          {links}
        </div>
      </div>
    );
  }
}
