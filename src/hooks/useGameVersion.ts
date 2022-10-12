import { useQuery } from '@tanstack/react-query';

export default function useGameVersion(activeVersion: string) {
  const queryInfo = useQuery(
    ['version', activeVersion],
    () => fetch(`https://pokeapi.co/api/v2/version/${activeVersion}`).then((r) => {
      if (!r.ok) {
        throw Error(r.status + r.statusText);
      }
      return r.json();
    }),
    { retry: 2, staleTime: Infinity },
  );
  return queryInfo;
}
