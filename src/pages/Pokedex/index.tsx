import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import PokemonCard from '../../components/PokemonCard';
import usePokemonApi from '../../hooks/usePokemonApi';
import { Pokemon, State } from '../../app/types';
import { RESULTS_PER_PAGE } from '../../app/constants';

interface PageControlsProps {
  resultsPerPage: number,
  previousUrl: string,
  nextUrl: string,
  setParams: (arg: string) => void,
  setResultsPerPage: (arg: number) => void
}

const PageControls = ({
  previousUrl, nextUrl, setParams, setResultsPerPage, resultsPerPage,
}:PageControlsProps) => {
  const nextPageParams = nextUrl ? `?${nextUrl.split('?')[1]}` : '';
  const previousPageParams = previousUrl ? `?${previousUrl.split('?')[1]}` : '';

  const handleChange = (e: SelectChangeEvent<any>) => {
    setResultsPerPage(parseInt(e.target.value, 10));
  };

  return (
    <Box
      sx={{
        mt: 4,
        py: 3,
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <InputLabel id="results-per-page">Results per page</InputLabel>
        <Select
          value={resultsPerPage}
          size="small"
          onChange={handleChange}
        >
          {RESULTS_PER_PAGE.map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
        </Select>
      </Box>
      <Box>
        {previousUrl && (
        <Button onClick={() => setParams(previousPageParams)}>
          Prev
        </Button>
        )}
        {nextUrl && (
        <Button onClick={() => setParams(nextPageParams)}>
          Next
        </Button>
        )}
      </Box>
    </Box>
  );
};

function PokedexPage() {
  const [resultsPerPage, setResultsPerPage] = useState(RESULTS_PER_PAGE[0]);
  const [requestParams, setParams] = useState<string>(`?limit=${resultsPerPage}`);
  const addedPokemonList = useSelector((state:State) => state?.pokedex?.addedPokemonList);
  const { data, isLoading } = usePokemonApi(requestParams);

  const renderEmptyList = (numberOfElements:number) => (
    new Array(numberOfElements).fill('').map(() => <PokemonCard key={Math.random()} isFetching name="" />)
  );

  useEffect(() => {
    setParams(`?limit=${resultsPerPage}`);
  }, [resultsPerPage]);

  return (
    <>
      <Grid sx={{ mt: 4 }} container spacing={2}>
        {isLoading && renderEmptyList(resultsPerPage)}
        {data?.results.map((pokemon: Pokemon) => (
          <PokemonCard key={pokemon?.name} name={pokemon?.name} />
        ))}
        {/*
          TODO: When API pages are exhausted and there is no next page we are then listing
          all custom added pokemons, they will not be paginated. This functionality can be
          improved, when other features like search, sort and filtering are implemented.
        */}
        {!isLoading && !data?.next && addedPokemonList.map((pokemon: Pokemon) => (
          <PokemonCard key={pokemon?.name} name={pokemon?.name} />
        ))}
      </Grid>
      {data && (
        <PageControls
          nextUrl={data.next}
          previousUrl={data.previous}
          setParams={setParams}
          resultsPerPage={resultsPerPage}
          setResultsPerPage={setResultsPerPage}
        />
      )}
    </>
  );
}

export default PokedexPage;
