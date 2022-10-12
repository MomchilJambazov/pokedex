import { createSlice } from '@reduxjs/toolkit';
import { Pokemon, Action } from './types';

export const pokedexSlice = createSlice({
  name: 'pokemons',
  initialState: {
    pokemonList: [],
    pokemonDetails: {},
  },
  reducers: {
    add: (state, action: Action) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.pokemonList.push(action.payload);
    },
  },
});

export const { add } = pokedexSlice.actions;

export default pokedexSlice.reducer;
