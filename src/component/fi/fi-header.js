import React from 'lib/react';
import { connect } from 'lib/react-redux';
import Header from 'component/mdl/layout/header';
import { years } from 'service/calculator';
import { meta } from 'service/meta';
import { i18n } from 'service/i18n';
import { changeTab } from 'action/navigation';

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  onNavigation: changeTab
};

const fiAge = (yrs) => {
  if (isNaN(yrs) || yrs > meta.range) {
    return i18n.fiStatus.never;
  } else if (yrs <= 0) {
    return i18n.fiStatus.done;
  } else {
    return i18n.fiStatus.formatter(yrs);
  }
};

const FiHeader = ({input, navigation, onNavigation}) => {
  const yrs = years(input);
  const options = {
    tabIndex: navigation.tabIndex,
    row: [
      {text: i18n.header.links.known, url: '#information', onNavigation},
      {text: i18n.header.links.chart, url: '#chart', onNavigation},
    ]
  };

  return (
    <Header title={fiAge(yrs)} options={options} />
  );
};

const container = connect(mapStateToProps, mapDispatchToProps);

export default container(FiHeader);
