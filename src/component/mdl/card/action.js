import React from 'lib/react';

const Action = ({ children }) => {
  return (
    <div className="mdl-card__actions">
      {children}
    </div>
  );
};

export default Action;
