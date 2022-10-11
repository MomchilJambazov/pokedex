import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { useQuery } from '@tanstack/react-query';

function AbilityCard({ ability, versionGroup }:any) {
  const abilityQuery = useQuery(['ability', ability.name], () => fetch(ability.url).then((r) => r.json()), { retry: 2, staleTime: Infinity });
  const { flavor_text_entries: descriptionList, effect_entries: effectEntries } = abilityQuery?.data || {};
  if (!ability) return null;
  const gameFlavour = descriptionList?.filter((description:any) => description?.language.name === 'en' && description?.version_group.name === versionGroup);
  const { flavor_text: flavorDescription } = (gameFlavour?.length && gameFlavour[0]) || {};
  return (
    <Card sx={{ p: 2, mb: 1, boxShadow: '0 5px 10px #d0efef' }}>
      <h4 style={{ textTransform: 'capitalize', marginBottom: '10px' }}>{ability.name.replaceAll('-', ' ')}</h4>
      {abilityQuery.isLoading
        && (
        <Box width="100%">
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="70%" />
        </Box>
        )}
      {effectEntries && effectEntries.filter((entry:any) => entry.language.name === 'en')[0].effect}
      {flavorDescription && <p>{flavorDescription}</p>}
    </Card>
  );
}

export default function PokemonAbilities({ abilities, versionGroup }: {abilities: any[], versionGroup: string}) {
  if (!abilities) return null;
  return (
    <>
      <Typography sx={{ mt: 3 }} variant="h6">Abilities</Typography>

      {abilities.map(({ ability }) => <AbilityCard key={ability.name} ability={ability} versionGroup={versionGroup} />)}
    </>
  );
}
