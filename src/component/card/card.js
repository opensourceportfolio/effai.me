import React from 'lib/react';

export class Card extends React.Component {

  render() {
    return (
      <div className="mdl-card mdl-shadow mdl-shadow--2dp">
        {this.props.children}
      </div>
    );
  }
}
