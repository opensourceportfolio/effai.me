import React from 'lib/react';

export class CardAction extends React.Component {

  render() {
    return (
      <div className="card-action grey lighten-3 black-text">
        <div className="row">
          { this.props.children }
        </div>
      </div>
    );
  }
}
