import React from 'lib/react';

export class CardContent extends React.Component {

  render() {
    return (
      <div>
        <div className="card-content">
          <span className="card-title activator grey-text">{this.props.title}</span>
          <p>{this.props.text}</p>
        </div>
        <div className="card-action">
          {this.props.children}
        </div>
      </div>
    );
  }
}
