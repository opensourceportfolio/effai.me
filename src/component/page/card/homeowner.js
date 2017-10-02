import React from 'react';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
import { changeValue } from 'action/fi';
import { getInputs } from 'reducer/fi';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';
import {
  compound,
  percentage,
  toFraction,
  years,
  monthsToNow,
} from 'service/calculator';
import { pmt } from 'service/amortization';
import { Row, Column2, Column } from 'component/grid';
import Page from 'component/fi/page';
import Currency from 'component/form/currency';
import Percent from 'component/form/percent';
import DateComponent from 'component/form/date';

const terms = ['30', '25', '15'];

const mapStateToProps = state => ({
  inputs: getInputs(state),
});

const mapDispatchToProps = {
  onChange: changeValue,
};

const Homeowner = ({ onChange, inputs }) => {
  const text = i18n.house;
  const downpaymentAmount = percentage(inputs.price, inputs.downpayment);
  const yrs = years(inputs) + monthsToNow(inputs.purchaseDate) / 12;

  const isHomeOwner = {
    name: 'isHomeOwner',
    onToggle: ({ target }, value) => onChange(target.name, value),
    label: <span>I am a home owner</span>,
    toggled: inputs.isHomeOwner,
  };

  const price = {
    name: 'price',
    onChange,
    text: {
      placeholder: text.price.placeholder,
      error: i18n.error.between(meta.house.price.min, meta.house.price.max),
    },
    value: inputs.price,
    rangeInfo: meta.house.price,
  };

  const downpayment = {
    name: 'downpayment',
    onChange,
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
    toFraction(inputs.rate / 12),
    inputs.term * 12,
    -inputs.price + downpaymentAmount,
    0,
  );
  const rate = {
    name: 'rate',
    onChange,
    text: {
      placeholder: text.rate.placeholder,
      additional: text.rate.additional(payment),
      error: i18n.error.between(meta.house.rate.min, meta.house.rate.max),
    },
    value: inputs.rate,
    rangeInfo: meta.house.rate,
  };

  const term = {
    name: 'term',
    onChange: (e, i, val) => onChange('term', val),
    floatingLabelText: text.term.placeholder,
    value: inputs.term,
    fullWidth: true,
  };

  const futurePrice = compound(inputs.price, inputs.houseGrowth, yrs);
  const houseGrowth = {
    name: 'houseGrowth',
    onChange,
    text: {
      placeholder: text.houseGrowth.placeholder,
      additional: text.houseGrowth.additional(futurePrice),
      error: i18n.error.between(
        meta.house.houseGrowth.min,
        meta.house.houseGrowth.max,
      ),
    },
    value: inputs.houseGrowth,
    rangeInfo: meta.house.houseGrowth,
  };

  const purchaseDate = {
    name: 'purchaseDate',
    onChange,
    text: {
      placeholder: text.purchaseDate.placeholder,
    },
    value: new Date(inputs.purchaseDate),
    openToYearSelection: true,
    autoOk: true,
    maxDate: new Date(),
  };

  const futureMaintenance = percentage(inputs.price, inputs.maintenance);
  const maintenance = {
    name: 'maintenance',
    onChange,
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
  const propertyTax = {
    name: 'propertyTax',
    onChange,
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
    <Page key="homeowner" title={text.title} supporting={text.supporting}>
      <Row className="mui-input-row">
        <Column>
          <Toggle {...isHomeOwner} />
        </Column>
      </Row>
      <Divider />
      {inputs.isHomeOwner ? (
        <div>
          <Row>
            <Column2>
              <Currency {...price} />
            </Column2>
            <Column2>
              <Percent {...houseGrowth} />
            </Column2>
          </Row>
          <Row>
            <Column2>
              <SelectField {...term}>
                {terms.map((year, i) => (
                  <MenuItem
                    key={i}
                    value={year}
                    primaryText={`${year} years`}
                  />
                ))}
              </SelectField>
            </Column2>
            <Column2>
              <Percent {...rate} />
            </Column2>
          </Row>
          <Row>
            <Column2>
              <DateComponent {...purchaseDate} />
            </Column2>
            <Column2>
              <Percent {...downpayment} />
            </Column2>
          </Row>
          <Row>
            <Column2>
              <Percent {...maintenance} />
            </Column2>
            <Column2>
              <Percent {...propertyTax} />
            </Column2>
          </Row>
        </div>
      ) : null}
    </Page>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Homeowner);
