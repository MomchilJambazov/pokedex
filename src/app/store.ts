import { configureStore } from '@reduxjs/toolkit';
import pokedexReducer from './pokedexSlice';
import { loadState } from './local-storage-utils';

export default configureStore({
  reducer: {
    pokedex: pokedexReducer,
  },
  preloadedState: loadState(),
});
