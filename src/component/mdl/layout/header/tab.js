import React from 'lib/react';

export class Tab extends React.Component {

  render() {
    let className = 'mdl-layout__tab';

    if (window.location.hash.startsWith(this.props.url) || this.props.isActive) {
      className = `${className} is-active`;
    }

    return (
      <a ref="tab" className={className} href={this.props.url}>{this.props.text}</a>
    );
  }
}
