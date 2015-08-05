import React from 'lib/react';

export class CardContent extends React.Component {

  render() {
    return (
      <div className="card-content">
        <span className="card-title activator grey-text">{this.props.title}</span>
        <p>{this.props.text}</p>
        {this.props.children}
      </div>
    );
  }
}
