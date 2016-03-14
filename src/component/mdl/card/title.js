import React from 'lib/react';

const Title = (props) => {
  return (
    <div className="mdl-card__title">
      <h4>
        {props.text}
      </h4>
    </div>
  );
};

export default Title;
