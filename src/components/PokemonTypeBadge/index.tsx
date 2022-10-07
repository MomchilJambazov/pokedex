import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import BugIcon from '../../static/pokemon-type-icons/bug.svg';
import DragonIcon from '../../static/pokemon-type-icons/dragon.svg';
import FairyIcon from '../../static/pokemon-type-icons/fairy.svg';
import GhostIcon from '../../static/pokemon-type-icons/ghost.svg';
import FightIcon from '../../static/pokemon-type-icons/fight.svg';
import DarkIcon from '../../static/pokemon-type-icons/dark.svg';
import FlyingIcon from '../../static/pokemon-type-icons/flying.svg';
import PoisonIcon from '../../static/pokemon-type-icons/poison.svg';
import FireIcon from '../../static/pokemon-type-icons/fire.svg';
import IceIcon from '../../static/pokemon-type-icons/ice.svg';
import PsychicIcon from '../../static/pokemon-type-icons/psychic.svg';
import RockIcon from '../../static/pokemon-type-icons/rock.svg';
import SteelIcon from '../../static/pokemon-type-icons/steel.svg';
import GrassIcon from '../../static/pokemon-type-icons/grass.svg';
import GroundIcon from '../../static/pokemon-type-icons/ground.svg';
import ElectricIcon from '../../static/pokemon-type-icons/electric.svg';
import NormalIcon from '../../static/pokemon-type-icons/normal.svg';
import WaterIcon from '../../static/pokemon-type-icons/water.svg';

interface PokemonTypeBadgeProps {
  type: string;
}

function PokemonTypeBadge({ type }: PokemonTypeBadgeProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokedex?type=${type}`);
  };

  const renderIcon = () => {
    switch (type) {
      case 'bug': return <img src={BugIcon} width="48px" alt={type} />;
      case 'dragon': return <img src={DragonIcon} width="48px" alt={type} />;
      case 'fairy': return <img src={FairyIcon} width="48px" alt={type} />;
      case 'ghost': return <img src={GhostIcon} width="48px" alt={type} />;
      case 'fight': return <img src={FightIcon} width="48px" alt={type} />;
      case 'fighting': return <img src={FightIcon} width="48px" alt={type} />;
      case 'dark': return <img src={DarkIcon} width="48px" alt={type} />;
      case 'flying': return <img src={FlyingIcon} width="48px" alt={type} />;
      case 'poison': return <img src={PoisonIcon} width="48px" alt={type} />;
      case 'fire': return <img src={FireIcon} width="48px" alt={type} />;
      case 'ice': return <img src={IceIcon} width="48px" alt={type} />;
      case 'psychic': return <img src={PsychicIcon} width="48px" alt={type} />;
      case 'rock': return <img src={RockIcon} width="48px" alt={type} />;
      case 'steel': return <img src={SteelIcon} width="48px" alt={type} />;
      case 'grass': return <img src={GrassIcon} width="48px" alt={type} />;
      case 'ground': return <img src={GroundIcon} width="48px" alt={type} />;
      case 'electric': return <img src={ElectricIcon} width="48px" alt={type} />;
      case 'normal': return <img src={NormalIcon} width="48px" alt={type} />;
      case 'water': return <img src={WaterIcon} width="48px" alt={type} />;
      default:
        return <ViewInArIcon width="48px" />;
    }
  };

  return (
    <Tooltip arrow sx={{ p: 0, m: 0 }} title={<Typography sx={{ textTransform: 'capitalize' }}>{type}</Typography>}>
      <IconButton onClick={handleClick}>
        {renderIcon()}
      </IconButton>
    </Tooltip>
  );
}

export default PokemonTypeBadge;
