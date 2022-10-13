import { createSlice } from '@reduxjs/toolkit';
import { Pokemon, PokemonAction } from './types';

export const pokedexSlice = createSlice({
  name: 'pokemons',
  initialState: {
    pokemonList: [] as Pokemon[],
    pokemonDetails: {},
  },
  reducers: {
    add: (state, action: PokemonAction) => {
      state.pokemonList.push(action.payload);
    },
  },
});

export const { add } = pokedexSlice.actions;

export default pokedexSlice.reducer;
