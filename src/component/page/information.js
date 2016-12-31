import React from 'lib/react';
import { connect } from 'lib/react-redux';
import { changeValue } from 'action/fi';
import Future from 'component/fi/card/future';
import Financial from 'component/fi/card/financial';
import House from 'component/fi/card/house';

const mapStateToProps = (state) => {
  return {
    status: state.input
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (name, value) => {
      dispatch(changeValue(name, value));
    }
  };
};

const Information = ({status, onChange}) => {
  return (
    <div id="information">
      <Financial status={status} onChange={onChange} />

      <House status={status} onChange={onChange} />

      <Future status={status} onChange={onChange} />
    </div>
  );
};

const container = connect(mapStateToProps, mapDispatchToProps);

export default container(Information);
