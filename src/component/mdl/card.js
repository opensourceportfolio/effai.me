import React from 'lib/react';

const Card = ({ children }) => {
  return (
    <div className="mdl-card mdl-shadow mdl-shadow--2dp">
      {children}
    </div>
  );
};

export default Card;
