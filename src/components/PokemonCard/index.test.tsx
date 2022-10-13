import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PokemonCardWithData } from '.';
import store from '../../app/store';

const mockPokemonData = {
  name: 'Pikachu',
  id: 25,
  types: [
    {
      slot: 1,
      type: {
        name: 'electric',
      },
    },
  ],
  sprites: {
    other: {
      'official-artwork': {
        front_default: '',
      },
    },
  },
  weight: 60,
  height: 4,
  color: { name: 'yellow' },
  flavor_text_entries: [],
  evolution_chain: { url: '' },
  capture_rate: 190,
  stats: [
    {
      base_stat: 35,
      effort: 0,
      stat: {
        name: 'hp',
        url: 'https://pokeapi.co/api/v2/stat/1/',
      },
    },
    {
      base_stat: 55,
      effort: 0,
      stat: {
        name: 'attack',
        url: 'https://pokeapi.co/api/v2/stat/2/',
      },
    },
    {
      base_stat: 40,
      effort: 0,
      stat: {
        name: 'defense',
        url: 'https://pokeapi.co/api/v2/stat/3/',
      },
    },
    {
      base_stat: 50,
      effort: 0,
      stat: {
        name: 'special-attack',
        url: 'https://pokeapi.co/api/v2/stat/4/',
      },
    },
    {
      base_stat: 50,
      effort: 0,
      stat: {
        name: 'special-defense',
        url: 'https://pokeapi.co/api/v2/stat/5/',
      },
    },
    {
      base_stat: 90,
      effort: 2,
      stat: {
        name: 'speed',
        url: 'https://pokeapi.co/api/v2/stat/6/',
      },
    },
  ],
  base_experience: 112,
  abilities: [
    {
      ability: {
        name: 'static',
        url: 'https://pokeapi.co/api/v2/ability/9/',
      },
      is_hidden: false,
      slot: 1,
    },
    {
      ability: {
        name: 'lightning-rod',
        url: 'https://pokeapi.co/api/v2/ability/31/',
      },
      is_hidden: true,
      slot: 3,
    },
  ],
};

test('Render Pokemon card', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <PokemonCardWithData data={mockPokemonData} isLoading={false} hasError={false} />
      </Provider>
    </BrowserRouter>,
  );
  const element = screen.getByText(/Pikachu/i);
  expect(element).toBeInTheDocument();
});
