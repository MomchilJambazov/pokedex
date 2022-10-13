import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Favorites from '.';
import store from '../../app/store';

test('Render FavoritesPage', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Favorites />
      </Provider>
    </BrowserRouter>,
  );
  const element = screen.getByText(/Favorite Pokemons/i);
  expect(element).toBeInTheDocument();
});
