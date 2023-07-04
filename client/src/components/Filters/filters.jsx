import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOriginFilter, fetchVideogamesByGender } from '../../redux/action';

function Filters() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genreFilter); // Obtén la lista de géneros desde el estado de Redux
  const origins = useSelector((state) => state.origins); // Obtén la lista de orígenes desde el estado de Redux

  const handleGenreFilter = (genre) => {
    dispatch(fetchVideogamesByGender(genre))
  };

  const handleOriginFilter = (origin) => {
    dispatch(setOriginFilter(origin));
  };

  return (
    <div>
      <h2>Filters</h2>
      <div>
      <label htmlFor="genre-select">Choose a genre:</label>
          <select name="genres" id="genre-select" onChange={(e) => handleGenreFilter(e.target.value)}>
            <option value="">--Please choose an option--</option>
            {genres && genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
      </div>
      <div>
        <h3>Origin</h3>
        {origins && origins.map((origin) => (
          <button key={origin.id} onClick={() => handleOriginFilter(origin.name)}>
            {origin.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;