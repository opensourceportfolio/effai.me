import { CHANGE_VALUE, LOADED_USER_DATA } from 'action/fi';
import { FutureData } from 'model/future-data';
import { HomeData } from 'model/home-data';
import { InvestmentData } from 'model/investment-data';
import { Percent } from 'model/percent';
import { Action } from 'model/redux';
import { FormInputs, State } from 'model/state';
import { originalState } from 'service/user-setting';

export function input(
  state: FormInputs = originalState.input,
  action: Action,
): FormInputs {
  switch (action.type) {
    case CHANGE_VALUE: {
      const { payload } = action;

      return {
        ...state,
        ...payload,
      };
    }
    case LOADED_USER_DATA: {
      const { payload } = action;

      return payload;
    }
    default:
      return state;
  }
}

export function getInvestmentData(state: State): InvestmentData {
  return {
    ror: Percent(state.input.ror),
    savings: parseInt(state.input.savings),
    networth: parseInt(state.input.networth),
  };
}

export function getHomeData(state: State): HomeData {
  return {
    price: parseInt(state.input.price),
    downpayment: Percent(state.input.downpayment),
    rate: Percent(state.input.rate),
    purchaseDate: state.input.purchaseDate,
    term: parseInt(state.input.term),
    houseGrowth: Percent(state.input.houseGrowth),
    isHomeOwner: state.input.isHomeOwner,
    maintenance: Percent(state.input.maintenance),
    propertyTax: Percent(state.input.propertyTax),
    rental: parseInt(state.input.rental),
  };
}

export function getFutureData(state: State): FutureData {
  return {
    livingExpenses: parseInt(state.input.livingExpenses),
    inflation: Percent(state.input.inflation),
    withdrawl: Percent(state.input.withdrawl),
  };
}
