import Paper from '@material-ui/core/Paper';
import { changeValue } from 'action/fi';
import Rental from 'component/fi/field/rental';
import { FutureData } from 'model/future-data';
import { HomeData } from 'model/home-data';
import { InvestmentData } from 'model/investment-data';
import { FormInputs, State } from 'model/state';
import React from 'react';
import { connect } from 'react-redux';
import { getFutureData, getHomeData, getInvestmentData } from 'reducer/fi';
import { compound, years } from 'service/calculator';

import { ThunkDispatch } from '../../../model/redux';

interface StateProps {
  investmentData: InvestmentData;
  homeData: HomeData;
  futureData: FutureData;
}

interface DispatchProps {
  onChange: (payload: Partial<FormInputs>) => void;
}

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: State): StateProps => ({
  investmentData: getInvestmentData(state),
  homeData: getHomeData(state),
  futureData: getFutureData(state),
});

const mapDispatchToProps = (dispatch: ThunkDispatch): DispatchProps => ({
  onChange: (payload: Partial<FormInputs>) => dispatch(changeValue(payload)),
});

const Renter = ({ investmentData, homeData, futureData, onChange }: Props) => {
  const yearsToFI = years(investmentData, homeData, futureData);
  const inflation = futureData.inflation;
  const rent = homeData.rental;
  const rentAtFI = compound(rent, inflation, yearsToFI);

  return (
    <Paper className="page__input">
      <Rental rent={rent} rentAtFI={rentAtFI} onChange={onChange}></Rental>
    </Paper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Renter);
