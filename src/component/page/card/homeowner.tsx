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
import { FutureData } from 'model/future-data';
import { HomeData } from 'model/home-data';
import { InvestmentData } from 'model/investment-data';
import { FormInputs, State } from 'model/state';
import React from 'react';
import { connect } from 'react-redux';
import { getFutureData, getHomeData, getInvestmentData } from 'reducer/fi';
import { pmt } from 'service/amortization';
import {
  compound,
  monthsToNow,
  percentage,
  toFraction,
  years,
} from 'service/calculator';

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

const Homeowner = ({
  investmentData,
  homeData,
  futureData,
  onChange,
}: Props) => {
  const {
    price,
    houseGrowth,
    term,
    downpayment,
    rate,
    maintenance,
    propertyTax,
  } = homeData;
  const yearsToFISincePurchase =
    years(investmentData, homeData, futureData) +
    monthsToNow(homeData.purchaseDate) / 12;
  const priceAtFI = compound(price, houseGrowth, yearsToFISincePurchase);

  const downpaymentAmount = percentage(price, downpayment);
  const payment = pmt(
    toFraction(rate / 12),
    term * 12,
    -price + downpaymentAmount,
    0,
  );

  return (
    <Paper className="page__input page__split--2">
      <div className="page__span--2">
        <IsHomeOwner
          isHomeOwner={homeData.isHomeOwner}
          onChange={onChange}
        ></IsHomeOwner>
        {homeData.isHomeOwner && (
          <Divider classes={{ root: 'page__span--2' }} />
        )}
      </div>
      {homeData.isHomeOwner && (
        <React.Fragment>
          <Price
            price={price}
            priceAtFI={priceAtFI}
            onChange={onChange}
          ></Price>
          <HouseGrowth
            houseGrowth={houseGrowth}
            onChange={onChange}
          ></HouseGrowth>
          <Term term={term} onChange={onChange}></Term>
          <Rate payment={payment} rate={rate} onChange={onChange}></Rate>
          <PurchaseDate
            purchaseDate={homeData.purchaseDate}
            onChange={onChange}
          ></PurchaseDate>
          <Downpayment
            downpayment={downpayment}
            downpaymentAmount={downpaymentAmount}
            onChange={onChange}
          ></Downpayment>
          <Maintenance
            price={price}
            maintenance={maintenance}
            onChange={onChange}
          ></Maintenance>
          <PropertyTax
            price={price}
            propertyTax={propertyTax}
            onChange={onChange}
          ></PropertyTax>
        </React.Fragment>
      )}
    </Paper>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Homeowner);
