import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { Row, Column } from 'component/grid';
import Currency from 'component/form/currency';
import { changeValue } from 'action/fi';
import { getInputs } from 'reducer/fi';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';
import { compound, years, monthsToNow } from 'service/calculator';

const mapStateToProps = state => ({
  inputs: getInputs(state),
});

const mapDispatchToProps = {
  onChange: changeValue,
};

const Renter = ({ inputs, onChange }) => {
  const text = i18n.house;

  const yrs = years(inputs) + monthsToNow(inputs.purchaseDate) / 12;
  const futurecost = compound(inputs.rental, inputs.inflation, yrs);
  const rental = {
    name: 'rental',
    onChange,
    text: {
      placeholder: text.rental.placeholder,
      additional: text.rental.additional(futurecost),
      error: i18n.error.between(meta.house.rental.min, meta.house.rental.max),
    },
    value: inputs.rental,
    rangeInfo: meta.house.rental,
  };

  return (
    <Paper className="page__input" zDepth={1}>
      <Row>
        <Column>
          <Currency {...rental} />
        </Column>
      </Row>
    </Paper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Renter);
