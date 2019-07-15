import Paper from '@material-ui/core/Paper';
import { changeValue } from 'action/fi';
import Page from 'component/fi/page';
import { FormInputs, State } from 'model/state';
import React from 'react';
import { connect } from 'react-redux';
import { getInputs } from 'reducer/fi';

import { ThunkDispatch } from '../../model/redux';
import FinancialChart from '../fi/chart/financial';
import Networth from '../fi/field/networth';
import ROR from '../fi/field/ror';
import Savings from '../fi/field/savings';

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

const Financial = ({ inputs, onChange }: Props) => (
  <Page>
    <Paper className="page__input page__split--2">
      <Savings inputs={inputs} onChange={onChange}></Savings>
      <ROR inputs={inputs} onChange={onChange}></ROR>
      <Networth inputs={inputs} onChange={onChange}></Networth>
    </Paper>
    <Paper className="page__media">
      <FinancialChart inputs={inputs} />
    </Paper>
  </Page>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Financial);
