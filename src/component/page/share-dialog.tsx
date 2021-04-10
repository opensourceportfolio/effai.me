import FlatButton from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { toggleShare } from 'action/navigation';
import { FormInputs, State } from 'model/state';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface StateProps {
  open: boolean;
  input: FormInputs;
}

interface DispatchProps {
  onToggleShare: () => void;
  onCopy: (textfield: HTMLInputElement | null | undefined) => void;
}

type Props = StateProps & DispatchProps;

const mapState = (state: State) => ({
  open: state.navigation.isShareMenuShowing,
  input: state.input,
});

const mapDispatch = (dispatch: Dispatch) => ({
  onToggleShare: () => dispatch(toggleShare()),
  onCopy: (textfield: HTMLInputElement | null | undefined) => {
    if (textfield) {
      textfield.select();
      document.execCommand('copy');
    }
  },
});

const getLinkRepresentation = (formInputs: FormInputs) => {
  return `https://effai.me?values=${JSON.stringify(formInputs)}`;
};

class ShareDialog extends React.Component<Props> {
  private textfield: HTMLInputElement | null | undefined;

  public render() {
    const { open, input, onCopy, onToggleShare } = this.props;

    return (
      <Dialog open={open}>
        <DialogTitle>Shareable URL</DialogTitle>
        <TextField
          inputRef={(link) => (this.textfield = link)}
          fullWidth={true}
          value={getLinkRepresentation(input)}
        />
        <DialogActions>
          <FlatButton key="cancel" color="primary" onClick={onToggleShare}>
            Cancel
          </FlatButton>
          <FlatButton
            key="copy"
            color="secondary"
            onClick={() => onCopy(this.textfield)}
          >
            Copy
          </FlatButton>
        </DialogActions>
      </Dialog>
    );
  }
}

export default connect(mapState, mapDispatch)(ShareDialog);
