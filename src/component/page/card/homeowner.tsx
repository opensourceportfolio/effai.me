import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { changeValue } from 'action/fi';
import Downpayment from 'component/fi/field/downpayment';
import HouseGrowth from 'component/fi/field/house-growth';
import IsHomeOwner from 'component/fi/field/is-home-owner';
import Maintenance from 'component/fi/field/maintenance';
import Price from 'component/fi/field/price';
import PropertyTax from 'component/fi/field/property-tax';
import PurchaseDate from 'component/fi/field/purchase-date';
import Rate from 'component/fi/field/rate';
import Term from 'component/fi/field/term';
import { FormInputs, State } from 'model/state';
import React from 'react';
import { connect } from 'react-redux';
import { getInputs } from 'reducer/fi';

import { ThunkDispatch } from '../../../model/redux';

interface StateProps {
  inputs: FormInputs;
}

interface DispatchProps {
  onChange: (payload: Partial<FormInputs>) => void;
}

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: State): StateProps => ({
  inputs: getInputs(state),
});

const mapDispatchToProps = (dispatch: ThunkDispatch): DispatchProps => ({
  onChange: (payload: Partial<FormInputs>) => dispatch(changeValue(payload)),
});

const Homeowner = ({ onChange, inputs }: Props) => {
  return (
    <Paper className="page__input page__split--2">
      <div className="page__span--2">
        <IsHomeOwner inputs={inputs} onChange={onChange}></IsHomeOwner>
        {inputs.isHomeOwner && <Divider classes={{ root: 'page__span--2' }} />}
      </div>
      {inputs.isHomeOwner && (
        <React.Fragment>
          <Price inputs={inputs} onChange={onChange}></Price>
          <HouseGrowth inputs={inputs} onChange={onChange}></HouseGrowth>
          <Term inputs={inputs} onChange={onChange}></Term>
          <Rate inputs={inputs} onChange={onChange}></Rate>
          <PurchaseDate inputs={inputs} onChange={onChange}></PurchaseDate>
          <Downpayment inputs={inputs} onChange={onChange}></Downpayment>
          <Maintenance inputs={inputs} onChange={onChange}></Maintenance>
          <PropertyTax inputs={inputs} onChange={onChange}></PropertyTax>
        </React.Fragment>
      )}
    </Paper>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Homeowner);
