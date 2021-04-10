import Paper from '@material-ui/core/Paper';
import { changeValue } from 'action/fi';
import Inflation from 'component/fi/field/inflation';
import LivingExpenses from 'component/fi/field/living-expenses';
import Withdrawl from 'component/fi/field/withdrawl';
import Page from 'component/fi/page';
import { FutureData } from 'model/future-data';
import { HomeData } from 'model/home-data';
import { InvestmentData } from 'model/investment-data';
import { FormInputs, State } from 'model/state';
import React from 'react';
import { connect } from 'react-redux';
import { getFutureData, getHomeData, getInvestmentData } from 'reducer/fi';
import { compound, years } from 'service/calculator';

import { ThunkDispatch } from '../../model/redux';
import FutureChart from '../fi/chart/future';

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

const Future = ({ investmentData, homeData, futureData, onChange }: Props) => {
  const inflation = futureData.inflation;
  const livingExpenses = futureData.livingExpenses;
  const yearsToFI = years(investmentData, homeData, futureData);
  const livingExpensesAtFI = compound(livingExpenses, inflation, yearsToFI);

  const withdrawl = futureData.withdrawl;

  return (
    <Page>
      <Paper className="page__input page__split--2">
        <LivingExpenses
          livingExpenses={livingExpenses}
          livingExpensesAtFI={livingExpensesAtFI}
          onChange={onChange}
        ></LivingExpenses>
        <Inflation inflation={inflation} onChange={onChange}></Inflation>
        <Withdrawl withdrawl={withdrawl} onChange={onChange}></Withdrawl>
      </Paper>
      <Paper className="page__media">
        <FutureChart
          investmentData={investmentData}
          homeData={homeData}
          futureData={futureData}
        ></FutureChart>
      </Paper>
    </Page>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Future);
