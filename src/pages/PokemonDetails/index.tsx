import { useParams } from 'react-router-dom';

function PokemonDetailsPage() {
  const params = useParams();

  return (
    <h1>
      Pokemon
      {' '}
      {params.id}
    </h1>
  );
}

export default PokemonDetailsPage;
