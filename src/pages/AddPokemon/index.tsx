import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ImageUpload from './ImageUploader';
import SnackbarAlert from '../../components/SnackbarAlert';
import SliderWithLabel from '../../components/Inputs/SliderWithLabel';
import DropdownSelect from '../../components/Inputs/DropdownSelect';
import AbilityAutocomplete from '../../components/Inputs/AbilityAutocomplete';
import NumberInput from '../../components/Inputs/NumberInput';
import NameValidationInput from '../../components/Inputs/NameValidationInput';
import PokemonTypeSelect from '../../components/Inputs/PokemonTypeSelect';
import usePokemonApi from '../../hooks/usePokemonApi';
import { DefaultValues, Pokemon, State } from '../../app/types';
import {
  POKEMON_HABITATS,
  POKEMON_COLORS,
  MAX_WEIGHT_KG,
  MAX_HEIGHT_M,
  MAX_CAPTURE_RATE,
  MAX_BASE_EXPERIENCE,
  MAX_POKEMON_SHORT_DESCRIPTION_LENGTH,
  FALLBACK_POKEMON_COUNT,
} from '../../app/constants';

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

const AddPokemonPage = () => {
  const {
    control, setValue, reset, handleSubmit, setError, formState: { errors }, clearErrors,
  } = useForm({ defaultValues });
  const pokemonQuery = usePokemonApi('');
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [showSuccessAlert, setSuccessAlert] = useState(false);
  const addedPokemonList = useSelector((state:State) => state?.pokedex?.addedPokemonList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lastCreatedPokemonId = useRef<number|null>(null);

  const generateId = () => {
    // TODO: This id generation does not check for id collision with other custom pokemon ids
    const pokemonCount = pokemonQuery.data.count || FALLBACK_POKEMON_COUNT; // fallback value for pokemon count retrieved from api
    const customPokemonCount = addedPokemonList?.length;
    const incrementedId = pokemonCount + customPokemonCount + 1;
    return incrementedId;
  };

  const mapFormDataToPokemonContract = (data: DefaultValues) => {
    const newPokemonId = generateId();
    lastCreatedPokemonId.current = newPokemonId;

    const pokemonAbilities = [];
    if (data.ability_1) pokemonAbilities.push({ ability: { name: data.ability_1 } });
    if (data.ability_2) pokemonAbilities.push({ ability: { name: data.ability_2 } });
    if (data.ability_3) pokemonAbilities.push({ ability: { name: data.ability_3 } });

    const pokemon: Pokemon = {
      id: newPokemonId,
      name: data.name.toLowerCase(),
      color: { name: data.color },
      height: data.height * 10,
      weight: data.weight * 10,
      base_experience: data.base_experience,
      evolution_chain: null,
      capture_rate: data.capture_rate,
      stats: [{
        base_stat: data.hp,
        stat: { name: 'hp' },
      },
      {
        base_stat: data.speed,
        stat: { name: 'speed' },
      },
      {
        base_stat: data.defence,
        stat: { name: 'defence' },
      },
      {
        base_stat: data.attack,
        stat: { name: 'attack' },
      },
      {
        base_stat: data.special_attack,
        stat: { name: 'special_attack' },
      },
      {
        base_stat: data.special_defence,
        stat: { name: 'special_defence' },
      }],
      types: [{ slot: 1, type: { name: data.type_1 } }, { slot: 2, type: { name: data.type_2 } }],
      abilities: pokemonAbilities,
      sprites: { other: { home: { front_default: data.avatar } } },
      flavor_text_entries: [{ flavor_text: data.short_description, language: { name: 'en' }, version: { name: 'red' } }],
      habitat: { name: data.habitat },
    };
    return pokemon;
  };

  const onSubmit:SubmitHandler<typeof defaultValues> = (data) => {
    const newPokemon = mapFormDataToPokemonContract(data as unknown as DefaultValues);
    dispatch({
      type: 'pokemon/createPokemon',
      payload: newPokemon,
    });
    setSuccessAlert(true);
    setLastUpdate(Date.now());
    reset();
  };

  const handleRedirect = () => {
    navigate(`/pokemon/${lastCreatedPokemonId.current}`);
  };

  return (
    <>
      <Typography variant="h4" sx={{ my: 4, textAlign: 'center' }}>Add Pokemon</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={6} md={4}>
            <ImageUpload control={control} fieldName="avatar" setValue={setValue} lastUpdate={lastUpdate} />
          </Grid>
          <Grid item xs={6} md={8}>
            <Typography variant="h6">Pokemon details</Typography>
            <NameValidationInput
              control={control}
              fieldName="name"
              label="Name"
              setError={setError}
              errors={errors}
              clearErrors={clearErrors}
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
                    maxLength: MAX_POKEMON_SHORT_DESCRIPTION_LENGTH,
                  }}
                  variant="outlined"
                  {...field}
                />
              )}
            />
            <Box sx={{ display: 'flex', gap: '10px', mt: 3 }}>
              <NumberInput control={control} fieldName="weight" label="Weight (kg)" min={0.1} max={MAX_WEIGHT_KG} step={0.1} setValue={setValue} type="float" />
              <NumberInput control={control} fieldName="height" label="Height (m)" min={0.1} max={MAX_HEIGHT_M} step={0.1} setValue={setValue} type="float" />
              <NumberInput control={control} fieldName="base_experience" label="Base experience" min={1} max={MAX_BASE_EXPERIENCE} step={1} setValue={setValue} />
              <NumberInput control={control} fieldName="capture_rate" label="Capture rate" min={1} max={MAX_CAPTURE_RATE} step={1} setValue={setValue} />
            </Box>
            <Box sx={{ display: 'flex', gap: '10px', my: 2 }}>
              <DropdownSelect control={control} fieldName="color" label="Color" options={POKEMON_COLORS} required />
              <DropdownSelect control={control} fieldName="habitat" label="Habitat" options={POKEMON_HABITATS} />
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

export default AddPokemonPage;
