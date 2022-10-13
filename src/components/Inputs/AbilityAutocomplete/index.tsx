import { Controller } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FieldProps } from '../../../app/types';
import { BASE_API_URL } from '../../../app/constants';

function AbilityAutocomplete({
  control, fieldName, label, required,
}:FieldProps): JSX.Element {
  const abilitiesQuery = useQuery(
    ['abilities'],
    () => fetch(`${BASE_API_URL}/ability?limit=1000`).then((r) => r.json()),
    { retry: 2, staleTime: Infinity },
  );

  const abilityOptions = abilitiesQuery?.data?.results.map(({ name }: {name: string}) => name) || [];
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          disablePortal
          onChange={(event, item) => {
            onChange(item);
          }}
          value={value}
          options={abilityOptions}
          sx={{ flexGrow: 1 }}
          renderInput={(params) => (
            <TextField
              label={label}
              required={required}
              {...params}
            />
          )}
        />
      )}
    />
  );
}

export default AbilityAutocomplete;
