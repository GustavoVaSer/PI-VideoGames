import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../redux/action';

function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    console.log("Botón de búsqueda clicado");
    dispatch(setSearchTerm(searchValue));
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <input type="text" value={searchValue} onChange={handleChange} placeholder="Search video games..." />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;