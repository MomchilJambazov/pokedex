import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { BoxProps } from '@mui/material';

import styles from './index.module.scss';

export interface PokemonCardProps {
  box?: BoxProps,
}

function PokemonCard({ box } : PokemonCardProps) {
  const defaults = PokemonCard.defaultProps;
  const boxProps = { ...defaults.box, ...box } as BoxProps;

  return (
    <Box {...boxProps}>
      <Link to="/pokemon/1">Pokemon 1</Link>
    </Box>
  );
}

PokemonCard.defaultProps = {
  box: {},
};

export default PokemonCard;
