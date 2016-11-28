import React from 'lib/react';
import Tab from 'component/mdl/layout/header/tab';

const TabBar = ({ options, index }) => {
  let links = null;

  if (options) {
    links = options.map((tab, i) => {
      return (
        <Tab
          onClick={() => tab.onNavigation(i)}
          url={tab.url}
          text={tab.text}
          isActive={i === index}
          key={`tab${i}`}
        />
      );
    });
  }

  return (
    <div className="mdl-layout__tab-bar mdl-js-ripple-effect is-casting-shadow mdl-js-ripple-effect--ignore-events">
      {links}
    </div>
  );
};

export default TabBar;
