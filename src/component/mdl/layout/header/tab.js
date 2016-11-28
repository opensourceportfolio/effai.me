import React from 'lib/react';

const Tab = ({ isActive, text }) => {
  let className = 'mdl-layout__tab';

  if (isActive) {
    className = `${className} is-active`;
  }

  return (
    <a href="#" className={className}>{text}</a>
  );
};

export default Tab;
