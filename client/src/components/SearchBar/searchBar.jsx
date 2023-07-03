import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchVideoGames, setSearchTerm } from '../../redux/action';
import SearchResults from '../SearchResults/searchResults';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



const API_KEY = "1d449c3663a04ff6b2ed70c1faca004b";

function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSearch = () => {
    const URL = `https://api.rawg.io/api/platforms?key=${API_KEY}`;
    console.log("Botón de búsqueda clicado");
    dispatch(setSearchTerm(searchValue));
    dispatch(fetchVideoGames(URL));
    history.push('/search-results');
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <input type="text" value={searchValue} onChange={handleChange} placeholder="Search video games..." />
      <button onClick={handleSearch}>Search</button>
      <SearchResults /> {/* Renderiza el componente SearchResults */}
    </div>
  );
}

export default SearchBar;

