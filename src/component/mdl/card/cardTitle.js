import React from 'lib/react';

export default class CardTitle extends React.Component {

  render() {
    return (
      <div className="mdl-card__title">
        <h4>
          {this.props.text}
        </h4>
      </div>
    );
  }
}
