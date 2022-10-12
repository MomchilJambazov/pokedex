import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import PokemonTypeBadge from '../../components/PokemonTypeBadge';
import ImageUpload from './ImageUploader';

const pokemonTypeOptions = ['bug', 'dragon', 'fairy', 'ghost', 'fight', 'fighting', 'dark', 'flying', 'poison', 'fire', 'ice', 'psychic', 'rock', 'steel', 'grass', 'ground', 'electric', 'normal', 'water'];

const defaultValues = {
  avatar: '',
  name: '',
  type_1: '',
  type_2: '',
  hp: 20,
  attack: 20,
  defence: 20,
  speed: 20,
  special_attack: 20,
  special_defence: 20,
  ability_1: null,
  ability_2: null,
  ability_3: null,
};
interface DefaultValues {
  avatar: string,
  name: string,
  hp: number,
  attack: number,
  defence: number,
  speed: number,
  special_attack: number,
  special_defence: number,
  type_1: string,
  type_2: string,
  ability_1: string,
  ability_2: string,
  ability_3: string,
}

type FieldName = keyof DefaultValues;

interface FieldProps { control:any, fieldName: FieldName; label: string; required?: boolean }

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
function PokemonTypeSelect({
  control, fieldName, label, required,
}:FieldProps): JSX.Element {
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <FormControl sx={{ mt: 1 }} fullWidth>
          <InputLabel id={fieldName}>{label}</InputLabel>
          <Select
            labelId={fieldName}
            label={label}
            required={required}
            sx={{ height: 56, flexGrow: 1 }}
            {...field}
          >
            <MenuItem key="none" value="">None</MenuItem>
            {pokemonTypeOptions.map((type) => (
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

function AbilityAutocomplete({
  control, fieldName, label, required,
}:FieldProps): JSX.Element {
  const abilitiesQuery = useQuery(
    ['abilities'],
    () => fetch('https://pokeapi.co/api/v2/ability?limit=1000').then((r) => r.json()),
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

const AddPokemonPage = () => {
  const {
    control, setValue, reset, handleSubmit,
  } = useForm({ defaultValues });
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const onSubmit = (data: any) => {
    dispatch({
      type: 'pokemons/add',
      payload: data,
    });
    setLastUpdate(Date.now());
    reset();
  };

  return (
    <>
      <Typography variant="h4" sx={{ my: 4 }}>
        Add Pokemon
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={6} md={4}>
            <ImageUpload control={control} fieldName="avatar" setValue={setValue} lastUpdate={lastUpdate} />
          </Grid>
          <Grid item xs={6} md={8}>
            <Typography variant="h6">Pokemon name</Typography>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  required
                  label="Name"
                  fullWidth
                  variant="outlined"
                  {...field}
                />
              )}
            />
            <Typography variant="h6">Types</Typography>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <PokemonTypeSelect control={control} fieldName="type_1" label="Type 1" required />
              <PokemonTypeSelect control={control} fieldName="type_2" label="Type 2" />
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography variant="h6">Stats</Typography>
              <SliderWithLabel control={control} fieldName="hp" label="HP" />
              <SliderWithLabel control={control} fieldName="attack" label="Attack" />
              <SliderWithLabel control={control} fieldName="defence" label="Defence" />
              <SliderWithLabel control={control} fieldName="speed" label="Speed" />
              <SliderWithLabel control={control} fieldName="special_attack" label="Special attack" />
              <SliderWithLabel control={control} fieldName="special_defence" label="Special defence" />
            </Box>
            <Typography variant="h6">Abilities</Typography>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <AbilityAutocomplete control={control} fieldName="ability_1" label="Ability 1" required />
              <AbilityAutocomplete control={control} fieldName="ability_2" label="Ability 2" />
              <AbilityAutocomplete control={control} fieldName="ability_3" label="Ability 3" />
            </Box>
          </Grid>
        </Grid>
        <Button variant="contained" size="large" type="submit">Create</Button>
      </form>
    </>
  );
};

SliderWithLabel.defaultProps = {
  required: false,
};

PokemonTypeSelect.defaultProps = {
  required: false,
};

AbilityAutocomplete.defaultProps = {
  required: false,
};

export default AddPokemonPage;
