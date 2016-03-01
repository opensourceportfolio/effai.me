import React from 'lib/react';
import { Link } from 'lib/react/router';

export default class Tab extends React.Component {

  render() {
    let className = 'mdl-layout__tab';

    if (window.location.pathname.startsWith(`/${this.props.url}`) || this.props.isActive) {
      className = `${className} is-active`;
    }

    return (
      <Link ref="tab" className={className} to={this.props.url}>{this.props.text}</Link>
    );
  }
}
