import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <h1>Pokedex</h1>
      <Link to="/pokedex">Pokedex</Link>
    </>
  );
}

export default Header;
