import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { State } from '../../app/types';

const FavoriteToggleButton = ({ name }: {name:string}) => {
  const dispatch = useDispatch();
  const favoritePokemonNames = useSelector((state:State) => state.pokedex.favoritePokemonNames);
  const isFavorite = favoritePokemonNames?.includes(name);

  const addToFavorites = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch({
      type: 'pokemon/addToFavorites',
      payload: name,
    });
  };

  const removeFromFavorites = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch({
      type: 'pokemon/removeFromFavorites',
      payload: name,
    });
  };

  return isFavorite
    ? <IconButton onClick={removeFromFavorites}><FavoriteIcon htmlColor="red" /></IconButton>
    : <IconButton onClick={addToFavorites}><FavoriteBorderIcon /></IconButton>;
};

export default FavoriteToggleButton;
