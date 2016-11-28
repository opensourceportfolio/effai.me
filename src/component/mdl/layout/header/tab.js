import React from 'lib/react';

const Tab = ({ isActive, text, url, onClick }) => {
  let className = 'mdl-layout__tab';

  if (isActive) {
    className = `${className} is-active`;
  }

  return (
    <a href={url} className={className} onClick={onClick}>{text}</a>
  );
};

export default Tab;
