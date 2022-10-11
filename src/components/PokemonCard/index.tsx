import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import usePokemon from '../../hooks/usePokemon';
import PokemonTypeBadge from '../PokemonTypeBadge';

export interface PokemonCardProps {
  name: string;
}

function PokemonCard({ name }: PokemonCardProps) {
  const query = usePokemon(name);

  const { data, isLoading, isError } = query;
  const image = data?.sprites?.other['official-artwork']?.front_default;

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Link style={{ textDecoration: 'none' }} to={`/pokemon/${name}`}>
        <Card sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {isLoading ? (
            <>
              <Box sx={{ p: 2, width: '100%' }}>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1.75rem' }}
                  width="100%"
                  animation="wave"
                />
                <Skeleton width="20%" animation="wave" />
                <br />
                <Skeleton
                  variant="circular"
                  width={32}
                  height={32}
                  animation="wave"
                />
              </Box>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={180}
                height={140}
              />
            </>
          ) : (
            <>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography
                    sx={{ textTransform: 'capitalize' }}
                    component="div"
                    variant="h5"
                  >
                    {data?.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    #
                    {data?.id}
                  </Typography>
                  {data?.types?.map((el: any) => (
                    <PokemonTypeBadge key={el.type.name} type={el.type.name} />
                  ))}
                </CardContent>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={image}
                alt={name}
              />
            </>
          )}
        </Card>
      </Link>
    </Grid>
  );
}

export default PokemonCard;
