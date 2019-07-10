import FlatButton from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
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

    const actions = [
      <FlatButton
        key="cancel"
        label="Cancel"
        primary={true}
        onClick={onToggleShare}
      />,
      <FlatButton
        key="copy"
        label="Copy"
        primary={true}
        keyboardFocused={true}
        onClick={() => onCopy(this.textfield)}
      />,
    ];

    return (
      <Dialog
        actions={actions}
        title="Shareable URL"
        modal={false}
        open={open}
        name="ShareableDialog"
      >
        <TextField
          inputRef={link => (this.textfield = link)}
          fullWidth={true}
          value={getLinkRepresentation(input)}
        />
      </Dialog>
    );
  }
}

export default connect(
  mapState,
  mapDispatch,
)(ShareDialog);
