import React from 'lib/react';
import Base from 'component/chart/base';

export default class Line extends React.Component {

  render() {
    const data = this.props.data;
    const options = Base.options(this.props.options);

    return (
      <Base type="line" data={data} options={options} />
    );
  }

}
