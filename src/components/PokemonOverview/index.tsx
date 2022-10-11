import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

interface MiniCardProps {
  label: string;
  value: number | string | undefined | null;
}

interface PokemonOverviewProps {
  height: number;
  weight: number;
  baseExperience: number;
  captureRate: number;
  habitat: string | undefined | null;
}

function MiniCard({ label, value }: MiniCardProps) {
  if (value === null) return null;
  return (
    <Card
      sx={{
        boxShadow: '0 5px 10px #d0efef',
        p: 2,
        flexGrow: 1,
        textAlign: 'center',
      }}
    >
      <h4>{label}</h4>
      {value ? (
        <Typography color="primary" variant="h5">
          {value}
        </Typography>
      ) : (
        <Skeleton
          animation="wave"
          width="50px"
          height="25px"
          sx={{ mx: 'auto' }}
        />
      )}
    </Card>
  );
}

export default function PokemonOverview({
  height,
  weight,
  baseExperience,
  captureRate,
  habitat,
}: PokemonOverviewProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
      <MiniCard label="Height" value={height} />
      <MiniCard label="Weight" value={weight} />
      <MiniCard label="Base XP" value={baseExperience} />
      <MiniCard label="Capture rate" value={captureRate} />
      <MiniCard label="Habitat" value={habitat} />
    </Box>
  );
}
