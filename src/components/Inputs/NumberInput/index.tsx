import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { FieldName } from '../../../app/types';

interface NumberInputProps {
  control:any,
  fieldName: FieldName;
  label: string;
  min: number,
  max: number,
  step: number,
  type?: 'int' | 'float',
  setValue: (a:FieldName, b:number) => void,
}
function NumberInput({
  control, fieldName, label, min, max, step, setValue, type,
}:NumberInputProps): JSX.Element {
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <TextField
          required
          type="number"
          label={label}
          fullWidth
          variant="outlined"
          {...field}
          inputProps={{
            min,
            max,
            step,
          }}
          onChange={(e) => {
            let value = type === 'float' ? parseFloat(e.target.value) : parseInt(e.target.value, 10);
            if (value > max) value = max;
            if (value < min) value = min;
            setValue(fieldName, value);
          }}
        />
      )}
    />
  );
}

NumberInput.defaultProps = {
  type: 'int',
};

export default NumberInput;
