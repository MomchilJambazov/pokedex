import { useQuery } from '@tanstack/react-query';
import { BASE_API_URL } from '../app/constants';

type Props = string | number | undefined;

export default function usePokemonApi(queryParams: Props) {
  const queryInfo = useQuery(
    ['pokemon', queryParams],
    () => fetch(`${BASE_API_URL}/pokemon/${queryParams}`).then((r) => {
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
