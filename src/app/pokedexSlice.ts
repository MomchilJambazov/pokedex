import { createSlice } from '@reduxjs/toolkit';
import { Action, PokemonAction, PokemonStore } from './types';

const initialState: PokemonStore = {
  addedPokemonList: [],
  pokemonDetails: {},
  favoritePokemonNames: [],
};

export const pokedexSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    createPokemon: (state, action: PokemonAction) => ({
      ...state,
      addedPokemonList: [...state.addedPokemonList, action.payload],
    }),
    addToFavorites: (state, action: Action) => ({
      ...state,
      favoritePokemonNames: [...state.favoritePokemonNames, action.payload],
    }),
    removeFromFavorites: (state, action: Action) => ({
      ...state,
      favoritePokemonNames: state.favoritePokemonNames.filter((name) => name !== action.payload),
    }),
  },
});

export const { createPokemon, addToFavorites, removeFromFavorites } = pokedexSlice.actions;

export default pokedexSlice.reducer;
