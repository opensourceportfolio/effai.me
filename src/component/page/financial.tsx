import Paper from '@material-ui/core/Paper';
import { changeValue } from 'action/fi';
import Page from 'component/fi/page';
import { FutureData } from 'model/future-data';
import { HomeData } from 'model/home-data';
import { InvestmentData } from 'model/investment-data';
import { Percent } from 'model/percent';
import { FormInputs, State } from 'model/state';
import React from 'react';
import { connect } from 'react-redux';
import { getFutureData, getHomeData, getInvestmentData } from 'reducer/fi';
import { calcLiquidNetworth, compound, years } from 'service/calculator';

import { ThunkDispatch } from '../../model/redux';
import FinancialChart from '../fi/chart/financial';
import Networth from '../fi/field/networth';
import ROR from '../fi/field/ror';
import Savings from '../fi/field/savings';

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

const Financial = ({
  investmentData,
  homeData,
  futureData,
  onChange,
}: Props) => {
  const savings = investmentData.savings;
  const inflation = futureData.inflation;
  const yearsToFI = years(investmentData, homeData, futureData);
  const fiSavings = compound(savings, inflation, yearsToFI);

  const ror = Percent(investmentData.ror);

  const networth = investmentData.networth;
  const liquidNetworthAtFI = calcLiquidNetworth(
    investmentData,
    homeData,
    futureData,
    yearsToFI,
  );

  return (
    <Page>
      <Paper className="page__input page__split--2">
        <Savings
          savings={savings}
          fiSavings={fiSavings}
          onChange={onChange}
        ></Savings>
        <ROR ror={ror} onChange={onChange}></ROR>
        <Networth
          networth={networth}
          liquidNetworthAtFI={liquidNetworthAtFI}
          onChange={onChange}
        ></Networth>
      </Paper>
      <Paper className="page__media">
        <FinancialChart
          investmentData={investmentData}
          homeData={homeData}
          futureData={futureData}
        />
      </Paper>
    </Page>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Financial);
