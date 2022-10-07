import { Routes, Route, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Header from '../components/Header';
import Pokedex from '../pages/Pokedex';
import PokemonDetails from '../pages/PokemonDetails';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Header />
      <Container component="main">
        <Routes>
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
          <Route path="*" element={<Navigate to="/pokedex" replace />} />
        </Routes>
      </Container>
    </QueryClientProvider>
  );
}

export default App;
