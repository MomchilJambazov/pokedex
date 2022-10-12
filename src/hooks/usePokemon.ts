import { useQuery } from '@tanstack/react-query';

type Props = string | number | undefined;

export default function usePokemon(queryParams: Props) {
  const queryInfo = useQuery(
    ['pokemon', queryParams],
    () => fetch(`https://pokeapi.co/api/v2/pokemon/${queryParams}`).then((r) => {
      if (!r.ok) {
        throw Error(r.status + r.statusText);
      }
      return r.json();
    }),
    {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  );
  return queryInfo;
}
