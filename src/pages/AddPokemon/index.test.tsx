import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import store from '../../app/store';
import AddPokemon from '.';

test('Render AddPokemonPage', () => {
  const queryClient = new QueryClient();
  render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AddPokemon />
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>,
  );
  const element = screen.getByText(/Add Pokemon/i);
  expect(element).toBeInTheDocument();
});
