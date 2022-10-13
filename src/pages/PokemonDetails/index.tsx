import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
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
import PokemonTypeBadge from '../../components/PokemonTypeBadge';
import PokemonOverview from '../../components/PokemonOverview';
import PokemonAbilities from '../../components/PokemonAbilities';
import PokemonStats from '../../components/PokemonStats';
import PokemonEvolutionGraph from '../../components/PokemonEvolutionGraph';
import usePokemon from '../../hooks/usePokemon';
import useSpecies from '../../hooks/useSpecies';
import useGameVersion from '../../hooks/useGameVersion';
import { DEFAULT_GAME_VERSION } from '../../app/constants';
import pokemonImageEmpty from '../../static/empty-pokeball.png';
import {
  AnyObject, NestedObject, ShortDescription, Pokemon, PokemonType,
} from '../../app/types';

function PokemonDetailsPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { id: nameOrId } = params;
  const [activeVersion, setActiveVersion] = useState(DEFAULT_GAME_VERSION);
  const pokemonQuery = usePokemon(nameOrId);
  const speciesQuery = useSpecies(nameOrId);
  const versionQuery = useGameVersion(activeVersion);
  const versionGroupName = versionQuery?.data?.version_group.name;
  const customPokemonList: Pokemon[] = useSelector((state:any) => state?.pokedex?.pokemonList);

  // eslint-disable-next-line max-len
  const customPokemon = customPokemonList.find(({ name, id }) => nameOrId === name || nameOrId === id?.toString()) || null;

  const pokemonData = customPokemon || {
    ...speciesQuery.data,
    ...pokemonQuery.data,
  };

  const hasError = (pokemonQuery.isError || speciesQuery.isError) && !customPokemon;
  const isLoading = (pokemonQuery.isLoading || speciesQuery.isLoading) && !customPokemon;

  const {
    name,
    sprites,
    types,
    id: pokemonId,
    height,
    weight,
    stats,
    base_experience: baseExperience,
    abilities,
    flavor_text_entries: availableShortDescriptions,
    evolution_chain: evolutionChain,
    capture_rate: captureRate,
    habitat,
  }: Pokemon = pokemonData;

  const { url: evolutionChainUrl } = evolutionChain || {};
  const pokemonHabitat = habitat ? habitat?.name.replaceAll('-', ' ') : null;
  const homePicture = sprites?.other?.home.front_default;
  const officialArtwork = sprites?.other?.['official-artwork']?.front_default;
  const avatar = homePicture || officialArtwork || pokemonImageEmpty;

  const { versions: spritesByGenerations } = sprites || {};

  const flattenObject = (obj:NestedObject) => {
    const flat = Object.values(obj).reduce((acc: AnyObject, el: AnyObject) => ({ ...acc, ...el }));
    return flat;
  };

  const spritesByVersions: AnyObject = spritesByGenerations ? flattenObject(spritesByGenerations) : {};

  const pokemonVersionImagePreview = spritesByVersions?.[versionGroupName]?.front_default;

  const availableVersions = availableShortDescriptions
    ?.filter((entry: ShortDescription) => entry.language.name === 'en')
    .map((e: ShortDescription) => e.version.name);

  useEffect(() => {
    if (
      availableVersions?.length
      && !availableVersions.includes(activeVersion)
    ) {
      setActiveVersion(availableVersions[0]);
    }
  }, [activeVersion, availableVersions]);

  const goToPreviousPokemon = useCallback(() => {
    const previousPokemonId = pokemonId - 1;
    if (!Number.isInteger(previousPokemonId) || previousPokemonId < 1) return; // early return to prevent negative values
    navigate(`/pokemon/${previousPokemonId}`);
  }, [navigate, pokemonId]);

  const goToNextPokemon = useCallback(() => {
    const nextPokemonId = pokemonId + 1;
    if (!Number.isInteger(nextPokemonId)) return;
    navigate(`/pokemon/${nextPokemonId}`);
  }, [navigate, pokemonId]);

  if (hasError) {
    return <>Error</>;
  }

  return (
    <Grid container spacing={2} sx={{ mt: 12 }}>
      <Grid item xs={12} md={6} lg={4} sx={{ position: 'relative' }}>
        {!isLoading && (
          <img
            src={avatar}
            alt={name}
            style={{
              margin: '0 auto',
              left: 0,
              right: 0,
              maxHeight: '390px',
              maxWidth: '390px',
              position: 'absolute',
              top: '-105px',
            }}
          />
        )}
        <Card sx={{ boxShadow: '0 5px 10px #d0efef' }}>
          <CardContent>
            {isLoading ? (
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="110%"
                height={250}
                sx={{ m: -2, mb: 2 }}
              />
            ) : (
              <Box
                sx={{
                  m: -2,
                  mb: 2,
                  background: pokemonData
                    ? pokemonData?.color?.name
                    : 'silver',
                  height: '250px',
                }}
              />
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              {isLoading ? (
                <Skeleton
                  animation="wave"
                  variant="text"
                  width="70%"
                  height={40}
                />
              ) : (
                <Typography
                  sx={{ m: 0, textTransform: 'capitalize', mb: 1 }}
                  gutterBottom
                  variant="h4"
                  component="div"
                >
                  {name}
                </Typography>
              )}
              <Box
                sx={{
                  minWidth: '96px',
                  display: 'flex',
                  justifyContent: 'end',
                }}
              >
                {isLoading ? (
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={40}
                    height={40}
                  />
                ) : (
                  types?.map((el: PokemonType) => (
                    el.type.name && <PokemonTypeBadge key={el.type.name} type={el.type.name} />
                  ))
                )}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', mt: 2 }}>
              {isLoading ? (
                <>
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width="40px"
                    height="60px"
                  />
                  <Box width="100%" sx={{ ml: 2, mt: 1 }}>
                    <Skeleton animation="wave" variant="text" width="100%" />
                    <Skeleton animation="wave" variant="text" width="70%" />
                  </Box>
                </>
              ) : (
                <>
                  {versionGroupName && pokemonVersionImagePreview && (
                    <Box sx={{ mr: 1, mb: 1 }}>
                      <img className="" src={pokemonVersionImagePreview} />
                    </Box>
                  )}
                  <Typography
                    sx={{ mb: 3 }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {pokemonData
                      && pokemonData.flavor_text_entries.map(
                        (entry: any) => entry.language.name === 'en'
                          && entry.version.name === activeVersion
                          && entry.flavor_text,
                      )}
                  </Typography>
                </>
              )}
            </Box>
            {isLoading ? (
              <Skeleton
                animation="wave"
                variant="text"
                width="100%"
                height={60}
              />
            ) : (
              availableVersions?.length
              && availableVersions.includes(activeVersion) && (
                <FormControl sx={{ mt: 2 }} fullWidth>
                  <InputLabel>Game version</InputLabel>
                  <Select
                    size="small"
                    value={activeVersion}
                    label="Game version"
                    onChange={(e: SelectChangeEvent) => setActiveVersion(e.target.value)}
                  >
                    {availableVersions?.map((v: string) => (
                      <MenuItem key={v} value={v}>
                        <Typography
                          sx={{ textTransform: 'capitalize' }}
                          component="span"
                        >
                          {v.replaceAll('-', ' ')}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )
            )}
          </CardContent>
          {pokemonQuery?.data && (
            <CardActions sx={{ justifyContent: 'space-between' }}>
              {pokemonId > 1 && (
                <Button variant="text" onClick={goToPreviousPokemon}>
                  Previous
                </Button>
              )}
              <Button variant="text" onClick={goToNextPokemon}>
                Next
              </Button>
            </CardActions>
          )}
        </Card>
        <PokedexKeyboardNavigation
          next={goToNextPokemon}
          prev={goToPreviousPokemon}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={8}>
        <PokemonOverview
          height={height}
          weight={weight}
          baseExperience={baseExperience}
          captureRate={captureRate}
          habitat={pokemonHabitat}
        />
        <PokemonAbilities
          abilities={abilities}
          versionGroup={versionGroupName}
        />
        <PokemonStats stats={stats} />
        {evolutionChainUrl && (
          <PokemonEvolutionGraph
            evolutionChainUrl={evolutionChainUrl}
            name={name}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default PokemonDetailsPage;
