import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PokemonCard from '../../components/PokemonCard';
import { State } from '../../app/types';
import EmptyState from '../../components/EmptyState';

function FavoritesPage() {
  const favoritePokemonNames = useSelector((state:State) => state.pokedex.favoritePokemonNames);

  return (
    <>
      <Typography variant="h4" sx={{ mt: 4, textAlign: 'center' }}>Favorite Pokemons</Typography>
      <Grid sx={{ mt: 4 }} container spacing={2}>
        {favoritePokemonNames.map((name) => (
          <PokemonCard key={name} name={name} />
        ))}
      </Grid>
      {!favoritePokemonNames.length
        && (
        <EmptyState
          title="Empty"
          subtitle="You don&apos;t have favorite Pokemon yet"
          linkTo="/pokedex"
          buttonColor="primary"
          cta="Browse the Pokedex"
        />
        )}
    </>
  );
}

export default FavoritesPage;
