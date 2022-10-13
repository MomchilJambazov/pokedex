import { useEffect } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import pokemonImageEmpty from '../../static/empty-pokeball.png';
import PokemonTypeBadge from '../PokemonTypeBadge';
import FavoriteToggleButton from '../FavoriteToggleButton';
import {
  AnyObject, NestedObject, ShortDescription, Pokemon, PokemonType,
} from '../../app/types';

interface PokemonIntroCardProps {
  data: Pokemon,
  isLoading: boolean,
  activeVersion: string,
  versionGroup: string,
  hasError: boolean,
  setActiveVersion: (arg: string) => void,
  goToPreviousPokemon: () => void,
  goToNextPokemon: () => void,
}

const SkeletonCard = () => (
  <Card sx={{ boxShadow: '0 5px 10px #d0efef' }}>
    <CardContent>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="110%"
        height={250}
        sx={{ m: -2, mb: 2 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Skeleton
          animation="wave"
          variant="text"
          width="70%"
          height={40}
        />
        <Box
          sx={{
            minWidth: '96px',
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', mt: 2 }}>
        <Skeleton
          animation="wave"
          variant="text"
          width="40px"
          height="60px"
        />
        <Box width="100%" sx={{ ml: 2, mt: 1 }}>
          <Skeleton animation="wave" variant="text" width="100%" />
          <Skeleton animation="wave" variant="text" width="70%" />
        </Box>
      </Box>
      <Skeleton
        animation="wave"
        variant="text"
        width="100%"
        height={60}
      />
    </CardContent>
  </Card>
);

const PokemonIntroCard = ({
  data, isLoading, hasError, versionGroup, activeVersion, setActiveVersion, goToPreviousPokemon, goToNextPokemon,
}:PokemonIntroCardProps) => {
  const {
    name,
    id: pokemonId,
    sprites,
    flavor_text_entries: availableShortDescriptions,
  } = data;

  const availableVersions = availableShortDescriptions
    ?.filter((entry: ShortDescription) => entry.language.name === 'en')
    .map((e: ShortDescription) => e.version.name);

  useEffect(() => {
    if (
      availableVersions?.length
      && !availableVersions.includes(activeVersion)
    ) {
      setActiveVersion(availableVersions[0]);
    }
  }, [activeVersion, availableVersions, setActiveVersion]);

  if (isLoading || hasError) {
    return <SkeletonCard />;
  }

  const homePicture = sprites?.other?.home.front_default;
  const officialArtwork = sprites?.other?.['official-artwork']?.front_default;
  const avatar = homePicture || officialArtwork || pokemonImageEmpty;
  const { versions: spritesByGenerations } = sprites || {};
  const flattenObject = (obj:NestedObject) => {
    const flat = Object.values(obj).reduce((acc: AnyObject, el: AnyObject) => ({ ...acc, ...el }));
    return flat;
  };

  const spritesByVersions: AnyObject = spritesByGenerations ? flattenObject(spritesByGenerations) : {};

  const pokemonVersionImagePreview = spritesByVersions?.[versionGroup]?.front_default;

  const getPokemonEnglishFlavorText = () => availableShortDescriptions?.map(
    (entry: ShortDescription) => entry.language.name === 'en'
      && entry.version.name === activeVersion
      && entry.flavor_text,
  );

  const renderPokemonTypeBadges = () => data.types.map((el: PokemonType) => (
    el.type.name && <PokemonTypeBadge key={el.type.name} type={el.type.name} />
  ));

  return (
    <>
      <img
        src={avatar}
        alt={name}
        style={{
          margin: '0 auto',
          left: 0,
          right: 0,
          maxHeight: '390px',
          maxWidth: '390px',
          position: 'absolute',
          top: '-105px',
        }}
      />
      <Card sx={{ boxShadow: '0 5px 10px #d0efef' }}>
        <CardContent>
          <Box
            sx={{
              m: -2,
              mb: 2,
              background: data
                ? data.color.name
                : 'silver',
              height: '250px',
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              sx={{ m: 0, textTransform: 'capitalize', mb: 1 }}
              gutterBottom
              variant="h4"
              component="div"
            >
              {name}
              <FavoriteToggleButton name={name} />
            </Typography>
            <Box
              sx={{
                minWidth: '96px',
                display: 'flex',
                justifyContent: 'end',
              }}
            >
              {renderPokemonTypeBadges()}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', mt: 2 }}>
            {versionGroup && pokemonVersionImagePreview && (
            <Box sx={{ mr: 1, mb: 1 }}>
              <img className="" src={pokemonVersionImagePreview} />
            </Box>
            )}
            <Typography
              sx={{ mb: 3 }}
              variant="body2"
              color="text.secondary"
            >
              {getPokemonEnglishFlavorText()}
            </Typography>
          </Box>

          {availableVersions?.length && availableVersions.includes(activeVersion) && (
            <FormControl sx={{ mt: 2 }} fullWidth>
              <InputLabel>Game version</InputLabel>
              <Select
                size="small"
                value={activeVersion}
                label="Game version"
                onChange={(e: SelectChangeEvent) => setActiveVersion(e.target.value)}
              >
                {availableVersions?.map((v: string) => (
                  <MenuItem key={v} value={v}>
                    <Typography
                      sx={{ textTransform: 'capitalize' }}
                      component="span"
                    >
                      {v.replaceAll('-', ' ')}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between' }}>
          {pokemonId > 1 && (
          <Button variant="text" onClick={goToPreviousPokemon}>
            Previous
          </Button>
          )}
          <Button variant="text" onClick={goToNextPokemon}>
            Next
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default PokemonIntroCard;
