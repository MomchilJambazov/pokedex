import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PokedexPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/').then((r) => r.json()).then((r) => setData(r));

    return () => {
      // cancel request
    };
  }, []);

  if (!data) {
    return <span>Loading...</span>;
  }

  return (
    <ul>
      {data?.results.map((pokemon: any) => <li key={pokemon.name}><Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link></li>)}
    </ul>
  );
}

export default PokedexPage;
