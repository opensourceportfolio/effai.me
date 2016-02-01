import React from 'lib/react';

export default class CardMedia extends React.Component {

  render() {
    return (
      <div className="mdl-card__media">
        {this.props.children}
      </div>
    );
  }
}
