import Paper from '@material-ui/core/Paper';
import { changeValue } from 'action/fi';
import Inflation from 'component/fi/field/inflation';
import LivingExpenses from 'component/fi/field/living-expenses';
import Withdrawl from 'component/fi/field/withdrawl';
import Page from 'component/fi/page';
import { FormInputs, State } from 'model/state';
import React from 'react';
import { connect } from 'react-redux';
import { getInputs } from 'reducer/fi';

import { ThunkDispatch } from '../../model/redux';
import FutureChart from '../fi/chart/future';

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

const Future = ({ inputs, onChange }: Props) => {
  return (
    <Page>
      <Paper className="page__input page__split--2">
        <LivingExpenses inputs={inputs} onChange={onChange}></LivingExpenses>
        <Inflation inputs={inputs} onChange={onChange}></Inflation>
        <Withdrawl inputs={inputs} onChange={onChange}></Withdrawl>
      </Paper>
      <Paper className="page__media">
        <FutureChart inputs={inputs}></FutureChart>
      </Paper>
    </Page>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Future);
