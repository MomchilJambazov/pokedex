// TODO: add types
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

export const pokedexSlice = createSlice({
  name: 'pokemons',
  initialState: {
    pokemonList: [],
  },
  reducers: {
    add: (state, action) => {
      state.pokemonList.push(action.payload);
    },
  },
});

export const { add } = pokedexSlice.actions;

export default pokedexSlice.reducer;
