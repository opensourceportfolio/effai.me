import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import { changeValue } from 'action/fi';
import Currency, { Props as CurrencyProps } from 'component/form/currency';
import DateComponent, { Props as DateProps } from 'component/form/date';
import Percent, { Props as PercentProps } from 'component/form/percent';
import { FormInputs, State } from 'model/state';
import React from 'react';
import { connect } from 'react-redux';
import { getInputs } from 'reducer/fi';
import { pmt } from 'service/amortization';
import {
  compound,
  monthsToNow,
  percentage,
  toFraction,
  years,
} from 'service/calculator';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';

import { ThunkDispatch } from '../../../model/redux';

interface StateProps {
  inputs: FormInputs;
}

interface DispatchProps {
  onChange: (payload: Partial<FormInputs>) => void;
}

type Props = StateProps & DispatchProps;

const terms = ['30', '25', '15'];

const mapStateToProps = (state: State): StateProps => ({
  inputs: getInputs(state),
});

const mapDispatchToProps = (dispatch: ThunkDispatch): DispatchProps => ({
  onChange: (payload: Partial<FormInputs>) => dispatch(changeValue(payload)),
});

const Homeowner = ({ onChange, inputs }: Props) => {
  const text = i18n.house;
  const downpaymentAmount = percentage(inputs.price, inputs.downpayment);
  const yrs = years(inputs) + monthsToNow(inputs.purchaseDate) / 12;

  const isHomeOwner = {
    name: 'isHomeOwner',
    onChange: (_, value) => onChange({ isHomeOwner: value }),
    label: <span>I am a home owner</span>,
    checked: inputs.isHomeOwner,
  };

  const futurePrice = compound(inputs.price, inputs.houseGrowth, yrs);
  const price: CurrencyProps = {
    name: 'price',
    onChange: (_, value) => onChange({ price: value }),
    text: {
      placeholder: text.price.placeholder,
      additional: text.houseGrowth.additional(futurePrice),
      error: i18n.error.between(meta.house.price.min, meta.house.price.max),
    },
    value: inputs.price,
    rangeInfo: meta.house.price,
  };

  const downpayment: PercentProps = {
    name: 'downpayment',
    onChange: (_, value) => onChange({ downpayment: value }),
    text: {
      placeholder: text.downpayment.placeholder,
      additional: text.downpayment.additional(downpaymentAmount),
      error: i18n.error.between(
        meta.house.downpayment.min,
        meta.house.downpayment.max,
      ),
    },
    value: inputs.downpayment,
    rangeInfo: meta.house.downpayment,
  };

  const payment = pmt(
    toFraction(parseFloat(inputs.rate) / 12),
    parseFloat(inputs.term) * 12,
    -parseFloat(inputs.price) + downpaymentAmount,
    0,
  );
  const rate: PercentProps = {
    name: 'rate',
    onChange: (_, value) => onChange({ rate: value }),
    text: {
      placeholder: text.rate.placeholder,
      additional: text.rate.additional(payment),
      error: i18n.error.between(meta.house.rate.min, meta.house.rate.max),
    },
    value: inputs.rate,
    rangeInfo: meta.house.rate,
  };

  const term = {
    inputProps: {
      name: 'term',
    },
    name: 'term',
    onChange: e => onChange({ term: e.target.value }),
    label: text.term.placeholder,
    value: inputs.term,
    fullWidth: true,
  };

  const houseGrowth: PercentProps = {
    name: 'houseGrowth',
    onChange: (_, value) => onChange({ houseGrowth: value }),
    text: {
      placeholder: text.houseGrowth.placeholder,
      error: i18n.error.between(
        meta.house.houseGrowth.min,
        meta.house.houseGrowth.max,
      ),
    },
    value: inputs.houseGrowth,
    rangeInfo: meta.house.houseGrowth,
  };

  const now = new Date();
  const purchaseDate: DateProps = {
    name: 'purchaseDate',
    onChange: (_: string, value: string) => onChange({ purchaseDate: value }),
    text: {
      placeholder: text.purchaseDate.placeholder,
    },
    value: inputs.purchaseDate,
    max: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
  };

  const futureMaintenance = percentage(inputs.price, inputs.maintenance);
  const maintenance: PercentProps = {
    name: 'maintenance',
    onChange: (_, value) => onChange({ maintenance: value }),
    text: {
      placeholder: text.maintenance.placeholder,
      additional: text.maintenance.additional(futureMaintenance),
      error: i18n.error.between(
        meta.house.maintenance.min,
        meta.house.maintenance.max,
      ),
    },
    value: inputs.maintenance,
    rangeInfo: meta.house.maintenance,
  };

  const futurePropertyTax = percentage(inputs.price, inputs.propertyTax);
  const propertyTax: PercentProps = {
    name: 'propertyTax',
    onChange: (_, value) => onChange({ propertyTax: value }),
    text: {
      placeholder: text.propertyTax.placeholder,
      additional: text.propertyTax.additional(futurePropertyTax),
      error: i18n.error.between(
        meta.house.propertyTax.min,
        meta.house.propertyTax.max,
      ),
    },
    value: inputs.propertyTax,
    rangeInfo: meta.house.propertyTax,
  };

  return (
    <Paper className="page__input page__split--2">
      <div className="page__span--2">
        <FormControlLabel
          control={<Switch {...isHomeOwner} />}
          label="Are you a home owner"
        />
        {inputs.isHomeOwner && <Divider classes={{ root: 'page__span--2' }} />}
      </div>
      {inputs.isHomeOwner && (
        <React.Fragment>
          <Currency {...price} />
          <Percent {...houseGrowth} />
          <FormControl classes={{ root: 'mui-field is-full-width' }}>
            <InputLabel htmlFor="term">Term of loan</InputLabel>
            <Select {...term}>
              {terms.map((year, i) => (
                <MenuItem key={i} value={year}>{`${year} years`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Percent {...rate} />
          <DateComponent {...purchaseDate} />
          <Percent {...downpayment} />
          <Percent {...maintenance} />
          <Percent {...propertyTax} />
        </React.Fragment>
      )}
    </Paper>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Homeowner);
