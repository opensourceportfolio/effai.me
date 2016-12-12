import React from 'lib/react';
import Base from 'component/chart/base';

export default class Bar extends React.Component {

  render() {
    const data = this.props.data;
    const options = Base.options(this.props.options);

    return (
      <Base type="bar" data={data} options={options} />
    );
  }

}
