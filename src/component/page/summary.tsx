import Paper from '@material-ui/core/Paper';
import Page from 'component/fi/page';
import { FutureData } from 'model/future-data';
import { HomeData } from 'model/home-data';
import { InvestmentData } from 'model/investment-data';
import { State } from 'model/state';
import React from 'react';
import { connect } from 'react-redux';
import { getFutureData, getHomeData, getInvestmentData } from 'reducer/fi';
import { effai } from 'service/calculator';

interface StateProps {
  investmentData: InvestmentData;
  homeData: HomeData;
  futureData: FutureData;
}

const mapStateToProps = (state: State): StateProps => ({
  investmentData: getInvestmentData(state),
  homeData: getHomeData(state),
  futureData: getFutureData(state),
});

const Summary = ({ investmentData, homeData, futureData }: StateProps) => {
  const { renter, homeOwner, earlyPayoff } = effai(
    investmentData,
    homeData,
    futureData,
  );

  return (
    <Page>
      <Paper className="page__input page__split--2">
        <span>By choosing to rent you can retire in</span>
        <span className="summary-row__year">{renter} years</span>
      </Paper>
      <Paper className="page__input page__split--2">
        <span>
          By paying your mortgage on time every month you can retire in
        </span>
        <span className="summary-row__year">{homeOwner} years</span>
      </Paper>
      <Paper className="page__input page__split--2">
        <span>
          By paying your mortgage off as soon as you have the cash you can
          retire in
        </span>
        <span className="summary-row__year">{earlyPayoff} years</span>
      </Paper>
    </Page>
  );
};

export default connect(mapStateToProps)(Summary);
