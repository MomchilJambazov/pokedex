import { Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { FieldProps } from '../../../app/types';

function SliderWithLabel({
  control, fieldName, label,
}:FieldProps): JSX.Element {
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <Box sx={{ display: 'flex' }}>
          <Box sx={{
            textAlign: 'right', py: 1, pr: 3, whiteSpace: 'nowrap',
          }}
          >
            {`${label}: ${field.value}`}
          </Box>
          <Slider
            {...field}
            valueLabelDisplay="auto"
            max={255}
            min={1}
            step={1}
          />
        </Box>
      )}
    />
  );
}

SliderWithLabel.defaultProps = {
  required: false,
};

export default SliderWithLabel;
