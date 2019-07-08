import Paper from '@material-ui/core/Paper';
import Page from 'component/fi/page';
import { FormInputs, State } from 'model/state';
import React from 'react';
import { connect } from 'react-redux';
import { getInputs } from 'reducer/fi';
import { effai } from 'service/calculator';

interface StateProps {
  inputs: FormInputs;
}

const mapStateToProps = (state: State): StateProps => ({
  inputs: getInputs(state),
});

const Summary = ({ inputs }: StateProps) => {
  const { renter, homeOwner, earlyPayoff } = effai(inputs);

  return (
    <Page>
      <Paper className="page__input page__split--2">
        <span>By choosing to rent you can retire in</span>
        <span className="summary-row__year">{renter.year} years</span>
      </Paper>
      <Paper className="page__input page__split--2">
        <span>
          By paying your mortgage on time every month you can retire in
        </span>
        <span className="summary-row__year">{homeOwner.year} years</span>
      </Paper>
      <Paper className="page__input page__split--2">
        <span>
          By paying your mortgage off as soon as you have the cash you can
          retire in
        </span>
        <span className="summary-row__year">{earlyPayoff.year} years</span>
      </Paper>
    </Page>
  );
};

export default connect(mapStateToProps)(Summary);
