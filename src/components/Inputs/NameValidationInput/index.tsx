import {
  ChangeEvent, useState, useEffect, useCallback,
} from 'react';
import { useSelector } from 'react-redux';
import { Controller } from 'react-hook-form';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDebounce } from 'usehooks-ts';
import { FieldProps, Pokemon } from '../../../app/types';
import { MAX_POKEMON_NAME_LENGTH, BASE_API_URL } from '../../../app/constants';

function NameValidationInput({
  control,
  fieldName,
  label,
  setError,
  errors,
  clearErrors,
}: FieldProps & { setError: any; errors: any; clearErrors: any }): JSX.Element {
  const [value, setValue] = useState<string>('');
  const [isValidating, setValidating] = useState<boolean>(false);
  const debouncedValue = useDebounce<string>(value, 500);
  const customPokemonList: Pokemon[] = useSelector(
    (state: any) => state?.pokedex?.pokemonList,
  );

  const validate = useCallback(
    async (nameCandidate: string) => {
      setValidating(true);
      const isNameUsed = customPokemonList.find(
        ({ name }) => nameCandidate.toLocaleLowerCase() === name.toLocaleLowerCase(),
      );
      const result = await fetch(
        `${BASE_API_URL}/pokemon/${nameCandidate.toLocaleLowerCase()}`,
      );
      if (nameCandidate && (result.status !== 404 || isNameUsed)) {
        setError('nameTaken', {
          type: 'custom',
          message: 'Pokemon with this name already exists!',
        });
      } else {
        clearErrors('nameTaken');
      }
      setValidating(false);
    },
    [clearErrors, customPokemonList, setError],
  );

  useEffect(() => {
    validate(debouncedValue);
  }, [debouncedValue, validate]);

  const handleNameValidation = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const nameTakenError = errors.nameTaken?.message;

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <>
          <FormControl required fullWidth>
            <InputLabel htmlFor="name">{label}</InputLabel>
            <OutlinedInput
              id="name"
              label={label}
              error={nameTakenError}
              inputProps={{
                onChange: handleNameValidation,
                maxLength: MAX_POKEMON_NAME_LENGTH,
              }}
              endAdornment={(
                <InputAdornment position="end">
                  {isValidating && <CircularProgress size={26} />}
                  {value && !isValidating && nameTakenError && (
                    <CancelIcon color="error" />
                  )}
                  {value && !isValidating && !nameTakenError && (
                    <CheckCircleIcon color="success" />
                  )}
                </InputAdornment>
              )}
              {...field}
            />
          </FormControl>
          <small style={{ color: 'red' }}>{nameTakenError}</small>
        </>
      )}
    />
  );
}

export default NameValidationInput;
