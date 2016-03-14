import React from 'lib/react';

const Action = (props) => {
  return (
    <div className="mdl-card__actions">
      {props.children}
    </div>
  );
};

export default Action;
