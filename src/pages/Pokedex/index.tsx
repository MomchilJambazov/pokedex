import PokemonCard from '../../components/PokemonCard';

function PokedexPage() {
  return (
    <PokemonCard
      box={{
        sx: {
          background: 'red',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    />
  );
}

export default PokedexPage;
