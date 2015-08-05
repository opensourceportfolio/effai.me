import React from 'lib/react';

export class Card extends React.Component {

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="card">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
