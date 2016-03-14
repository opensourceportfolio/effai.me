import React from 'lib/react';

const Media = (props) => {
  return (
    <div className="mdl-card__media">
      {props.children}
    </div>
  );
};

export default Media;
