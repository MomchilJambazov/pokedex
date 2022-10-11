import { Routes, Route, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from './store';
import Header from '../components/Header';
import Pokedex from '../pages/Pokedex';
import PokemonDetails from '../pages/PokemonDetails';
import Favorites from '../pages/Favorites';
import AddPokemon from '../pages/AddPokemon';
import { saveState } from './local-storage-utils';

const queryClient = new QueryClient();

store.subscribe(() => saveState(store.getState()));

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Header />
        <Container component="main">
          <Routes>
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
            <Route path="/add-pokemon" element={<AddPokemon />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<Navigate to="/pokedex" replace />} />
          </Routes>
        </Container>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
