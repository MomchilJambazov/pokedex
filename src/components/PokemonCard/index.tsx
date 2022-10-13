import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import usePokemonApi from '../../hooks/usePokemonApi';
import PokemonTypeBadge from '../PokemonTypeBadge';
import { PokemonType, State, Pokemon } from '../../app/types';
import FavoriteToggleButton from '../FavoriteToggleButton';

export interface Props {
  name: string;
  isFetching?: boolean;
}

export interface PokemonCardProps {
  data: Pokemon;
  isLoading: boolean;
  hasError: boolean;
}

const PokemonCardSkeleton = () => (
  <Card sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
  </Card>
);

function PokemonCardWithData({ data, isLoading, hasError }: PokemonCardProps) {
  const image = data?.sprites?.other['official-artwork']?.front_default || data?.sprites?.other.home?.front_default;

  return (
    <Grid item xs={12} md={6} lg={4}>
      {(isLoading || hasError)
        ? <PokemonCardSkeleton />
        : (
          <Box sx={{ position: 'relative' }}>
            <Link style={{ textDecoration: 'none' }} to={`/pokemon/${data.name}`}>
              <Card sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography
                        sx={{ textTransform: 'capitalize', ml: 1 }}
                        component="div"
                        variant="h5"
                      >
                        {data.name}
                      </Typography>
                      <Typography
                        sx={{ ml: 1 }}
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        #
                        {data.id}
                      </Typography>
                    </Box>

                  </CardContent>
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={image}
                  alt={data.name}
                />
              </Card>
            </Link>
            <Box sx={{ position: 'absolute', bottom: '15px', left: '15px' }}>
              {data?.types?.map((el: PokemonType) => (
                <PokemonTypeBadge key={el.type.name} type={el.type.name} />
              ))}
              <FavoriteToggleButton name={data?.name} />
            </Box>
          </Box>
        )}
    </Grid>
  );
}

function PokemonCardWithApi({ name, isFetching = false }: Props) {
  const query = usePokemonApi(name);
  const { data, isLoading, isError } = query;

  return <PokemonCardWithData data={data} isLoading={isLoading || isFetching} hasError={isError} />;
}

function PokemonCard({ name, isFetching }: Props) {
  const lowerCasedName = name.toLowerCase();
  const addedPokemonList = useSelector((state:State) => state?.pokedex?.addedPokemonList);
  const customPokemon = addedPokemonList?.find((pokemon) => pokemon.name.toLowerCase() === lowerCasedName);
  return customPokemon?.name
    ? <PokemonCardWithData data={customPokemon} isLoading={false} hasError={false} />
    : <PokemonCardWithApi name={lowerCasedName} isFetching={isFetching} />;
}

PokemonCardWithApi.defaultProps = {
  isFetching: false,
};

PokemonCard.defaultProps = {
  isFetching: false,
};

export default PokemonCard;
