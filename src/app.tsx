import { loadUserData } from 'action/fi';
import FiHeader from 'component/fi/header';
import FiSwipeableViews from 'component/fi/swipeable-view';
import FiTab from 'component/fi/tab';
import ShareDialog from 'component/page/share-dialog';
import { ThunkDispatch } from 'model/redux';
import { FormInputs, State } from 'model/state';
import * as React from 'react';
import { connect } from 'react-redux';

interface StateProps {
  isShareMenuShowing: boolean;
  input: FormInputs;
}

interface DispatchProps {
  onLoad: () => void;
}

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: State): StateProps => ({
  isShareMenuShowing: state.navigation.isShareMenuShowing,
  input: state.input,
});

const mapDispatchToProps = (dispatch: ThunkDispatch): DispatchProps => ({
  onLoad: () => dispatch(loadUserData()),
});

class App extends React.Component<Props> {
  public componentDidMount() {
    this.props.onLoad();
  }

  public render() {
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
