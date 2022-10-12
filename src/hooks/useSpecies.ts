import { useQuery } from '@tanstack/react-query';

type Props = string | number | undefined;

export default function useSpecies(nameOrId: Props) {
  const queryInfo = useQuery(
    ['species', nameOrId],
    () => fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameOrId}`).then(
      (r) => {
        if (!r.ok) {
          throw Error(r.status + r.statusText);
        }
        return r.json();
      },
    ),
    {
      retry: 2,
      staleTime: Infinity,
    },
  );
  return queryInfo;
}
