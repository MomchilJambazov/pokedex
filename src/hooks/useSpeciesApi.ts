import { useQuery } from '@tanstack/react-query';
import { BASE_API_URL } from '../app/constants';

type Props = string | number | undefined;

export default function useSpeciesApi(nameOrId: Props) {
  const queryInfo = useQuery(
    ['species', nameOrId],
    () => fetch(`${BASE_API_URL}/pokemon-species/${nameOrId}`).then(
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
