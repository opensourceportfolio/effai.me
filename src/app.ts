// @flow
import { loadUserData } from 'action/fi';
import FiHeader from 'component/fi/header';
import FiSwipeableViews from 'component/fi/swipeable-view';
import FiTab from 'component/fi/tab';
import ShareDialog from 'component/page/share-dialog';
import { FormInputs, State } from 'model/state';
import * as React from 'react';
import { connect } from 'react-redux';

interface StateProps {
  isShareMenuShowing: boolean;
  input: FormInputs;
};

interface DispatchProps {
  onLoad: () => Promise<void>;
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
