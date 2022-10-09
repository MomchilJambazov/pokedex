import { useQuery } from '@tanstack/react-query';

type Props = string | undefined;

export default function usePokemon(queryParams: Props) {
  const queryInfo = useQuery(['pokemon', queryParams], () => fetch(`https://pokeapi.co/api/v2/pokemon/${queryParams}`).then((r) => r.json()), { retry: 2 });
  return queryInfo;
}
