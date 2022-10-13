import { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import PokedexKeyboardNavigation from '../../components/PokedexKeyboardNavigation';
import PokemonIntroCard from '../../components/PokemonIntroCard';
import PokemonOverview from '../../components/PokemonOverview';
import PokemonAbilities from '../../components/PokemonAbilities';
import PokemonStats from '../../components/PokemonStats';
import PokemonEvolutionGraph from '../../components/PokemonEvolutionGraph';
import SnackbarAlert from '../../components/SnackbarAlert';
import usePokemonApi from '../../hooks/usePokemonApi';
import useSpeciesApi from '../../hooks/useSpeciesApi';
import useGameVersionApi from '../../hooks/useGameVersionApi';
import { DEFAULT_GAME_VERSION } from '../../app/constants';
import { Pokemon, State } from '../../app/types';

function PokemonDetailsPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { id: nameOrId } = params;
  const [activeVersion, setActiveVersion] = useState(DEFAULT_GAME_VERSION);
  const pokemonQuery = usePokemonApi(nameOrId);
  const speciesQuery = useSpeciesApi(nameOrId);
  const versionQuery = useGameVersionApi(activeVersion);
  const versionGroupName = versionQuery?.data?.version_group.name;
  const addedPokemonList: Pokemon[] = useSelector((state:State) => state?.pokedex?.addedPokemonList);

  // eslint-disable-next-line max-len
  const customPokemon = addedPokemonList.find(({ name, id }) => nameOrId === name || nameOrId === id?.toString()) || null;

  const pokemonData = customPokemon || {
    ...speciesQuery.data,
    ...pokemonQuery.data,
  };

  const hasError = (pokemonQuery.isError || speciesQuery.isError) && !customPokemon;
  const isLoading = (pokemonQuery.isLoading || speciesQuery.isLoading) && !customPokemon;

  const {
    name,
    id: pokemonId,
    height,
    weight,
    stats,
    base_experience: baseExperience,
    abilities,
    evolution_chain: evolutionChain,
    capture_rate: captureRate,
    habitat,
  }: Pokemon = pokemonData;

  const { url: evolutionChainUrl } = evolutionChain || {};
  const pokemonHabitat = habitat ? habitat?.name.replaceAll('-', ' ') : null;

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

  return (
    <Grid container spacing={2} sx={{ mt: 12 }}>
      <Grid item xs={12} md={6} lg={4} sx={{ position: 'relative' }}>
        <PokemonIntroCard
          data={pokemonData}
          activeVersion={activeVersion}
          setActiveVersion={setActiveVersion}
          versionGroup={versionGroupName}
          goToNextPokemon={goToNextPokemon}
          goToPreviousPokemon={goToPreviousPokemon}
          isLoading={isLoading}
          hasError={hasError}
        />
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
      <SnackbarAlert open={hasError} severity="error" message="Something went wrong" setOpen={() => {}} closable={false} />
    </Grid>
  );
}

export default PokemonDetailsPage;
