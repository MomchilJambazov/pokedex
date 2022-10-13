import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PokemonCard from '../../components/PokemonCard';
import usePokemonApi from '../../hooks/usePokemonApi';
import { Pokemon } from '../../app/types';
import { DEFAULT_EMPTY_LIST_LENGTH } from '../../app/constants';

function PokedexPage() {
  const [requestParams, setParams] = useState<string>('');
  const { data, isLoading } = usePokemonApi(requestParams);

  const next = data?.next ? `?${data?.next.split('?')[1]}` : '';
  const previous = data?.previous ? `?${data?.previous.split('?')[1]}` : '';

  const renderEmptyList = (numberOfElements:number) => (
    new Array(numberOfElements).fill('').map(() => <PokemonCard key={Math.random()} isFetching name="" />)
  );

  return (
    <>
      <Grid sx={{ mt: 4 }} container spacing={2}>
        {isLoading && renderEmptyList(DEFAULT_EMPTY_LIST_LENGTH)}
        {data?.results.map((pokemon: Pokemon) => (
          <PokemonCard key={pokemon?.name} name={pokemon?.name} />
        ))}
      </Grid>
      <Box
        sx={{
          pt: 3,
          mb: 4,
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {data?.previous && (
          <Button
            onClick={() => {
              setParams(previous);
            }}
          >
            Prev
          </Button>
        )}
        {data?.next && (
          <Button
            onClick={() => {
              setParams(next);
            }}
          >
            Next
          </Button>
        )}
      </Box>
    </>
  );
}

export default PokedexPage;
