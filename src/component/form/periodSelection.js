import React from 'lib/react';

export class PeriodSelection extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <select className="browser-default" defaultValue={this.props.current} onChange={this.props.onChange}>
        <option className="disabled" value="">Select a period...</option>
        <option value="1">Per month</option>
        <option value="2">Per year</option>
      </select>
    );
  }
}
