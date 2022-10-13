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
import EmptyState from '../../components/EmptyState';

interface Props {
  data: Pokemon,
  hasError: boolean,
  isLoading: boolean
}

function PokemonDetailsPageWithData({ data, hasError, isLoading }:Props) {
  const navigate = useNavigate();
  const [activeVersion, setActiveVersion] = useState(DEFAULT_GAME_VERSION);

  const versionQuery = useGameVersionApi(activeVersion);
  const versionGroupName = versionQuery?.data?.version_group.name;

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
  }: Pokemon = data;

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
          data={data}
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

function PokemonDetailsPageWithApi({ nameOrId }: {nameOrId: string}) {
  const [notFound, setNotFound] = useState(false);
  const pokemonQuery = usePokemonApi(nameOrId);
  const speciesQuery = useSpeciesApi(nameOrId);
  const pokemonData = {
    ...speciesQuery.data,
    ...pokemonQuery.data,
  };

  const { error } = pokemonQuery;

  if (error instanceof Error) {
    if (error.message.includes('404') && !notFound) {
      setNotFound(true);
    }
  }

  const hasError = (pokemonQuery.isError || speciesQuery.isError);
  const isLoading = (pokemonQuery.isLoading || speciesQuery.isLoading);

  return notFound
    ? (
      <EmptyState
        title="404 Pokemon not found"
        subtitle="The Pokemon you are looking for does not exist"
        linkTo="/add-pokemon"
        buttonColor="success"
        cta="Create your own"
      />
    )
    : <PokemonDetailsPageWithData data={pokemonData} isLoading={isLoading} hasError={hasError} />;
}

function PokemonDetailsPage() {
  const params = useParams();
  const { id: nameOrId } = params;
  const addedPokemonList: Pokemon[] = useSelector((state:State) => state?.pokedex?.addedPokemonList);
  const customPokemon = addedPokemonList.find(({ name, id }) => nameOrId === name || nameOrId === id?.toString());

  return customPokemon
    ? <PokemonDetailsPageWithData data={customPokemon} isLoading={false} hasError={false} />
    : <PokemonDetailsPageWithApi nameOrId={nameOrId || ''} />;
}

export default PokemonDetailsPage;
