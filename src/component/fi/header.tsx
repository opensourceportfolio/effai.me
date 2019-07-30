import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { toggleShare } from 'action/navigation';
import { FutureData } from 'model/future-data';
import { HomeData } from 'model/home-data';
import { InvestmentData } from 'model/investment-data';
import { State } from 'model/state';
import React from 'react';
import { connect } from 'react-redux';
import { getFutureData, getHomeData, getInvestmentData } from 'reducer/fi';
import { Dispatch } from 'redux';
import { years } from 'service/calculator';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';

interface StateProps {
  investmentData: InvestmentData;
  homeData: HomeData;
  futureData: FutureData;
}

interface DispatchProps {
  onToggleShare: () => void;
}

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: State): StateProps => ({
  investmentData: getInvestmentData(state),
  homeData: getHomeData(state),
  futureData: getFutureData(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onToggleShare: () => dispatch(toggleShare()),
});

const fiAge = (age: number): string => {
  if (age > meta.range || isNaN(age)) {
    return i18n.fiStatus.never;
  } else if (age <= 0) {
    return i18n.fiStatus.done;
  } else {
    return i18n.fiStatus.formatter(age);
  }
};
const navigateToBlog = () => {
  window.location.href = 'https://www.medium.com/effai-me';
};

const Header = ({
  investmentData,
  homeData,
  futureData,
  onToggleShare,
}: Props) => {
  const yearsToFI = years(investmentData, homeData, futureData);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" color="inherit">
          {fiAge(yearsToFI)}
        </Typography>
        <Menu open={false}>
          <MenuItem onClick={onToggleShare}>Share Results</MenuItem>
          <MenuItem onClick={navigateToBlog}>My Blog</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
