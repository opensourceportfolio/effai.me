import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import React from 'react';

import { FormInputs } from '../../../model/state';

interface StateProps {
  inputs: FormInputs;
}

interface DispatchProps {
  onChange: (payload: Partial<FormInputs>) => void;
}

type Props = StateProps & DispatchProps;

export default function IsHomeOwner(props: Props) {
  return (
    <FormControlLabel
      control={
        <Switch
          name="isHomeOwner"
          onChange={(_, value) => props.onChange({ isHomeOwner: value })}
          checked={props.inputs.isHomeOwner}
        />
      }
      label="Are you a home owner"
    />
  );
}
