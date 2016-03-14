import React from 'lib/react';
import Tab from 'component/mdl/layout/header/tab';

const TabBar = (props) => {
  let links = null;
  let options = props.options;

  if (options && options) {
    links = options.map((tab, i) => {
      return (
        <Tab text={tab.text} url={tab.url} isActive={tab.isActive} key={`tab${i}`} />
      );
    });
  }

  return (
    <div className="mdl-layout__tab-bar-container mdl-js-ripple-effect">
      <div className="mdl-layout__tab-bar mdl-js-ripple-effect is-casting-shadow mdl-js-ripple-effect--ignore-events">
        {links}
      </div>
    </div>
  );
};

export default TabBar;
