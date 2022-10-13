import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FieldProps } from '../../../app/types';

function DropdownSelect({
  control, fieldName, label, required, options,
}:FieldProps & {options: string[]}): JSX.Element {
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <FormControl sx={{ mt: 1 }} fullWidth required={required}>
          <InputLabel id={fieldName}>{label}</InputLabel>
          <Select
            labelId={fieldName}
            label={label}
            sx={{ height: 56, flexGrow: 1 }}
            {...field}
          >
            {!required && <MenuItem key="none" value="">None</MenuItem>}
            {options.map((option) => (
              <MenuItem sx={{ textTransform: 'capitalize' }} key={option} value={option}>
                {option.replace('-', ' ')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}

export default DropdownSelect;
