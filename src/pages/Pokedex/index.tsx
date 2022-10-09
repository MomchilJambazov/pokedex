import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PokemonCard from '../../components/PokemonCard';
import usePokemon from '../../hooks/usePokemon';

function PokedexPage() {
  const [requestParams, setParams] = useState<string>('');
  const query = usePokemon(requestParams);

  const { data } = query;

  const next = data?.next ? `?${data?.next.split('?')[1]}` : '';
  const previous = data?.previous ? `?${data?.previous.split('?')[1]}` : '';

  return (
    <>
      <Grid sx={{ mt: 4 }} container spacing={2}>
        {data?.results.map((pokemon: any) => (
          <PokemonCard key={pokemon?.name} name={pokemon?.name} />
        ))}
      </Grid>
      <Box sx={{
        pt: 3, mb: 4, display: 'flex', justifyContent: 'center', width: '100%',
      }}
      >
        {data?.previous && <Button onClick={() => { setParams(previous); }}>Prev</Button>}
        {data?.next && <Button onClick={() => { setParams(next); }}>Next</Button>}
      </Box>
    </>
  );
}

export default PokedexPage;
