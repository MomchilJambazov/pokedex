import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { useQuery } from '@tanstack/react-query';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import PokedexKeyboardNavigation from '../../components/PokedexKeyboardNavigation';

const DEFAULT_GAME_VERSION = 'red';

function PokemonDetailsPage() {
  const params = useParams();
  const navigate = useNavigate();

  const { id } = params;

  const [activeVersion, setActiveVersion] = useState(DEFAULT_GAME_VERSION);

  const pokemonQuery = useQuery(['pokemon', id], () => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((r) => r.json()));

  const {
    name, sprites, types, id: pokemonId,
  }: any = pokemonQuery?.data || {};
  const { name: speciesName, url: speciesUrl } = pokemonQuery?.data?.species || {};

  const speciesQuery: any = useQuery(['species', speciesName], () => (speciesUrl ? fetch(speciesUrl).then((r) => r.json()) : null));
  const species = speciesQuery.data;

  const versionQuery = useQuery(['version', activeVersion], () => fetch(`https://pokeapi.co/api/v2/version/${activeVersion}`).then((r) => r.json()));

  const homePicture = sprites?.other?.home.front_default;
  const officialArtwork = sprites?.other?.['official-artwork'].front_default;

  const avatar = homePicture || officialArtwork;
  const { versions: spriteVersions } = sprites || {};
  const vSprites: any = sprites ? Object.values(spriteVersions).reduce((acc: any, el: any) => ({ ...acc, ...el })) : {};
  const versionGroupName = versionQuery?.data?.version_group.name;
  const pokemonVersionPreview = vSprites?.[versionGroupName]?.front_default;

  const availableVersions = species?.flavor_text_entries.filter((entry: any) => entry.language.name === 'en').map((e: any) => e.version.name);

  useEffect(() => {
    if (availableVersions?.length && !availableVersions.includes(activeVersion)) {
      setActiveVersion(availableVersions[0]);
    }
  }, [activeVersion, availableVersions]);

  const goToPreviousPokemon = useCallback(() => {
    const previousPokemonId = parseInt(pokemonId, 10) - 1;
    if (!Number.isInteger(previousPokemonId) || previousPokemonId < 1) return; // early return to prevent negative values
    navigate(`/pokemon/${previousPokemonId}`);
  }, [navigate, pokemonId]);

  const goToNextPokemon = useCallback(() => {
    const nextPokemonId = parseInt(pokemonId, 10) + 1;
    if (!Number.isInteger(nextPokemonId)) return;
    navigate(`/pokemon/${nextPokemonId}`);
  }, [navigate, pokemonId]);

  if (!pokemonQuery.data) {
    return null;
  }

  if (pokemonQuery.isLoading) {
    return <>Loading...</>;
  }

  if (pokemonQuery.isError) {
    return <>Error</>;
  }

  return (
    <>
      <img src={avatar} alt={name} style={{ maxWidth: '35%', marginBottom: '-270px' }} />

      <Card sx={{ maxWidth: '35%' }}>
        <CardContent>
          <Box sx={{
            m: -2, mb: 2, background: species ? species?.color?.name : '', height: '250px',
          }}
          />
          <Typography sx={{ textTransform: 'capitalize', mb: 1 }} gutterBottom variant="h4" component="div">
            {name}
          </Typography>
          {types.map((el:any) => <Chip key={el.type.name} sx={{ mr: 1, mb: 1, textTransform: 'capitalize' }} label={el.type.name} />)}
          <Box sx={{ display: 'flex', mt: 2 }}>
            {versionGroupName && pokemonVersionPreview && <Box sx={{ mr: 1, mb: 1 }}><img className="" src={pokemonVersionPreview} /></Box>}
            <Typography sx={{ mb: 3 }} variant="body2" color="text.secondary">
              {species && species?.flavor_text_entries?.map((entry:any) => entry.language.name === 'en' && entry.version.name === activeVersion && entry.flavor_text)}
            </Typography>
          </Box>
          {availableVersions?.length && availableVersions.includes(activeVersion) && (
          <FormControl sx={{ mt: 2 }} fullWidth>
            <InputLabel>Game version</InputLabel>
            <Select
              size="small"
              value={activeVersion}
              label="Game version"
              onChange={(e:SelectChangeEvent) => setActiveVersion(e.target.value)}
            >
              {availableVersions?.map((v:string) => <MenuItem key={v} value={v}><Typography sx={{ textTransform: 'capitalize' }} component="span">{v.replaceAll('-', ' ')}</Typography></MenuItem>)}
            </Select>
          </FormControl>
          )}
        </CardContent>
        <CardActions>
          {pokemonId > 1 && <Button variant="text" onClick={goToPreviousPokemon}>Previous</Button>}
          <Button variant="text" onClick={goToNextPokemon}>Next</Button>
        </CardActions>
      </Card>
      <PokedexKeyboardNavigation next={goToNextPokemon} prev={goToPreviousPokemon} />
    </>
  );
}

export default PokemonDetailsPage;
