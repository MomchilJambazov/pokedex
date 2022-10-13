import { useQuery } from '@tanstack/react-query';
import { BASE_API_URL } from '../app/constants';

export default function useGameVersionApi(activeVersion: string) {
  const queryInfo = useQuery(
    ['version', activeVersion],
    () => fetch(`${BASE_API_URL}/version/${activeVersion}`).then((r) => {
      if (!r.ok) {
        throw Error(r.status + r.statusText);
      }
      return r.json();
    }),
    { retry: 2, staleTime: Infinity },
  );
  return queryInfo;
}
