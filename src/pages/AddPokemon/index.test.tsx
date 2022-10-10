import { render, screen } from '@testing-library/react';
import AddPokemon from '.';

test('Render AddPokemonPage', () => {
  render(<AddPokemon />);
  const element = screen.getByText(/Hello World!/i);
  expect(element).toBeInTheDocument();
});
