// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import FiHeader from 'component/fi/header';
import FiTab from 'component/fi/tab';
import FiSwipeableViews from 'component/fi/swipeable-view';
import ShareDialog from 'component/page/share-dialog';
import type { State, FormInputs } from 'model/state';
import { loadUserData } from 'action/fi';

type StateProps = {
  isShareMenuShowing: boolean,
  input: FormInputs,
};

type DispatchProps = {
  onLoad: () => Promise<void>,
};

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: State) => ({
  isShareMenuShowing: state.navigation.isShareMenuShowing,
  input: state.input,
});

const mapDispatchToProps = {
  onLoad: loadUserData,
};

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    return (
      <div>
        <FiHeader />
        <FiTab />
        <FiSwipeableViews />
        <ShareDialog />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
