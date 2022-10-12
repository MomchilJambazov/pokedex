import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FieldProps } from '../../../app/types';
import PokemonTypeBadge from '../../PokemonTypeBadge';
import { POKEMON_TYPES } from '../../../app/constants';

function PokemonTypeSelect({
  control, fieldName, label, required,
}:FieldProps): JSX.Element {
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
            <MenuItem key="none" value="">None</MenuItem>
            {POKEMON_TYPES.map((type) => (
              <MenuItem key={type} value={type}>
                <PokemonTypeBadge type={type} />
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}

export default PokemonTypeSelect;
