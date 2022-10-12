import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
import SnackbarAlert from '../../components/SnackbarAlert';
import usePokemon from '../../hooks/usePokemon';

const pokemonTypeOptions = ['bug', 'dragon', 'fairy', 'ghost', 'fight', 'dark', 'flying', 'poison', 'fire', 'ice', 'psychic', 'rock', 'steel', 'grass', 'ground', 'electric', 'normal', 'water'];
const pokemonHabitats = ['grassland', 'forest', 'waters-edge', 'sea', 'cave', 'mountain', 'rough-terrain', 'urban', 'rare'];
const pokemonColors = ['red', 'blue', 'yellow', 'green', 'black', 'brown', 'purple', 'gray', 'white', 'pink'];

const defaultValues = {
  avatar: '',
  name: '',
  type_1: '',
  type_2: '',
  height: 1,
  weight: 10,
  base_experience: 50,
  capture_rate: 50,
  habitat: '',
  short_description: '',
  color: '',
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
  height: number,
  weight: number,
  base_experience: number,
  capture_rate: number,
  habitat: string,
  short_description: string,
  color: string,
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
        <FormControl sx={{ mt: 1 }} fullWidth required={required}>
          <InputLabel id={fieldName}>{label}</InputLabel>
          <Select
            labelId={fieldName}
            label={label}
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
                {option.replaceAll('-', ' ')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}

DropdownSelect.defaultProps = {
  required: false,
};

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

const AddPokemonPage = () => {
  const {
    control, setValue, reset, handleSubmit,
  } = useForm({ defaultValues });
  const pokemonQuery = usePokemon('');
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [showSuccessAlert, setSuccessAlert] = useState(false);
  const state:any = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lastCreatedPokemonId = useRef<number|null>(null);

  const generateId = () => {
    const pokemonCount = pokemonQuery.data.count || 1200; // fallback value for pokemon count retrieved from api
    const customPokemonCount = state.pokedex.pokemonList.length;
    const incrementedId = pokemonCount + customPokemonCount + 1;
    return incrementedId;
  };

  const onSubmit = (data: any) => {
    const newPokemonId = generateId();
    const pokemonData = {
      id: newPokemonId,
      ...data,
    };
    dispatch({
      type: 'pokemons/add',
      payload: pokemonData,
    });
    setSuccessAlert(true);
    setLastUpdate(Date.now());
    reset();
    lastCreatedPokemonId.current = newPokemonId;
  };

  const handleRedirect = () => {
    navigate(`/pokemon/${lastCreatedPokemonId.current}`);
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
            <Typography variant="h6">Pokemon details</Typography>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  required
                  label="Name"
                  fullWidth
                  inputProps={{
                    maxLength: 60,
                  }}
                  variant="outlined"
                  {...field}
                />
              )}
            />
            <Controller
              name="short_description"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{ mt: 2 }}
                  required
                  label="Short description"
                  fullWidth
                  inputProps={{
                    maxLength: 500,
                  }}
                  variant="outlined"
                  {...field}
                />
              )}
            />
            <Box sx={{ display: 'flex', gap: '10px', mt: 3 }}>
              <NumberInput control={control} fieldName="weight" label="Weight (kg)" min={0.1} max={5000} step={0.1} setValue={setValue} type="float" />
              <NumberInput control={control} fieldName="height" label="Height (m)" min={0.1} max={50} step={0.1} setValue={setValue} type="float" />
              <NumberInput control={control} fieldName="base_experience" label="Base experience" min={1} max={255} step={1} setValue={setValue} />
              <NumberInput control={control} fieldName="capture_rate" label="Capture rate" min={1} max={100} step={1} setValue={setValue} />
            </Box>
            <Box sx={{ display: 'flex', gap: '10px', my: 2 }}>
              <DropdownSelect control={control} fieldName="color" label="Color" options={pokemonColors} required />
              <DropdownSelect control={control} fieldName="habitat" label="Habitat" options={pokemonHabitats} />
            </Box>
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
            <Button variant="contained" size="large" type="submit" sx={{ my: 3, width: '100%' }}>Create Pokemon</Button>
          </Grid>
        </Grid>
      </form>
      <SnackbarAlert
        open={showSuccessAlert}
        severity="success"
        setOpen={setSuccessAlert}
        message="Pokemon created successfully!"
        action={lastCreatedPokemonId.current ? (
          <Button onClick={handleRedirect} color="inherit" size="small">
            Visit page
          </Button>
        ) : undefined}
      />
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
