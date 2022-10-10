import { render, screen } from '@testing-library/react';
import Favorites from '.';

test('Render FavoritesPage', () => {
  render(<Favorites />);
  const element = screen.getByText(/Hello World!/i);
  expect(element).toBeInTheDocument();
});
