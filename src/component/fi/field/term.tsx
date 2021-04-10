import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React from 'react';

import { FormInputs } from '../../../model/state';

interface StateProps {
  term: number;
}

interface DispatchProps {
  onChange: (payload: Partial<FormInputs>) => void;
}

type Props = StateProps & DispatchProps;

export default function Term(props: Props) {
  const { onChange, term } = props;
  const onChangeHandler = (e: React.ChangeEvent<{ value: unknown }>) =>
    onChange({ term: e.target.value as string });

  const terms = ['30', '25', '15'];

  return (
    <FormControl classes={{ root: 'mui-field is-full-width' }}>
      <InputLabel htmlFor="term">Term of loan</InputLabel>
      <Select
        inputProps={{ name: 'term' }}
        name="term"
        onChange={onChangeHandler}
        value={term}
      >
        {terms.map((year) => (
          <MenuItem key={year} value={year}>{`${year} years`}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
