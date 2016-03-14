import React from 'lib/react';

const Card = (props) => {
  return (
    <div className="mdl-card mdl-shadow mdl-shadow--2dp">
      {props.children}
    </div>
  );
};

export default Card;
