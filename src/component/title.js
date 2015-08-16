import React from 'lib/react';

export class Title extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col s12">
          <h4>{this.props.value}</h4>
          <hr />
        </div>
      </div>
    );
  }
}
