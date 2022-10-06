import { Routes, Route, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';

import Header from '../components/Header';
import Pokedex from '../pages/Pokedex';
import PokemonDetails from '../pages/PokemonDetails';

// Component definition
function App() {
  return (

    <>
      <Header />
      <Container component="main">
        <Routes>
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
          <Route path="*" element={<Navigate to="/pokedex" replace />} />
        </Routes>
      </Container>
    </>
  );
}

// Default export
export default App;
