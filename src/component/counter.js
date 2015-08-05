import React from 'lib/react';

export class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
  }
  tick() {
    this.setState({count: this.state.count + 1});
  }
  update(event) {
    this.setState({value: event.target.value});
  }
  render() {
    return (
      <div onClick={this.tick.bind(this)}>
        Clicks: {this.state.count}
        <input value={this.state.value} onChange={this.update.bind(this)} />
        {this.state.value}
      </div>
    );
  }
}
