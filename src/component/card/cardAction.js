import React from 'lib/react';

export default class CardAction extends React.Component {

  render() {
    return (
      <div className="mdl-card__actions">
        {this.props.children}
      </div>
    );
  }
}
