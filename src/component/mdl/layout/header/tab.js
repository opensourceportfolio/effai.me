import React from 'lib/react';
import { Link } from 'lib/react-router';

const Tab = ({ url, isActive, text }) => {
  let className = 'mdl-layout__tab';

  if (window.location.pathname.startsWith(`/${url}`) || isActive) {
    className = `${className} is-active`;
  }

  return (
    <Link className={className} to={url}>{text}</Link>
  );
};

export default Tab;
