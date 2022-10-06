// External imports
import { render, screen } from '@testing-library/react';

import PokemonDetailsPage from '.';

test('Render PokemonDetailsPage', () => {
  render(<PokemonDetailsPage />);
  const element = screen.getByText(/Pokemon/i);
  expect(element).toBeInTheDocument();
});
