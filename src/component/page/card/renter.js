// @flow
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
import { type FormInputs, type State } from 'model/state';
import type { Dispatch } from 'model/redux';

type StateProps = {|
  inputs: FormInputs,
|};

type DispatchProps = {|
  onChange: (payload: $Shape<FormInputs>) => void,
|};

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: State): StateProps => ({
  inputs: getInputs(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onChange: (payload: $Shape<FormInputs>) => dispatch(changeValue(payload)),
});

const Renter = ({ inputs, onChange }: Props) => {
  const text = i18n.house;

  const yrs = years(inputs) + monthsToNow(inputs.purchaseDate) / 12;
  const futurecost = compound(inputs.rental, inputs.inflation, yrs);
  const rental = {
    name: 'rental',
    onChange: (_, value) => onChange({ rental: value }),
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
