import { render, screen } from '@testing-library/react';
import PokemonCard from '.';

test('Render Component', () => {
  render(<PokemonCard name="pickachu" />);
  const element = screen.getByText(/Hello World!/i);
  expect(element).toBeInTheDocument();
});
