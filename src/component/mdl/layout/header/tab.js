import React from 'lib/react';
import { Link } from 'lib/react/router';

const Tab = (props) => {
  let className = 'mdl-layout__tab';

  if (window.location.pathname.startsWith(`/${props.url}`) || props.isActive) {
    className = `${className} is-active`;
  }

  return (
    <Link className={className} to={props.url}>{props.text}</Link>
  );
};

export default Tab;
