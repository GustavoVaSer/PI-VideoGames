import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGenreFilter, setOriginFilter } from '../../redux/action';

function Filters() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres); // Obtén la lista de géneros desde el estado de Redux
  const origins = useSelector((state) => state.origins); // Obtén la lista de orígenes desde el estado de Redux

  const handleGenreFilter = (genre) => {
    dispatch(setGenreFilter(genre));
  };

  const handleOriginFilter = (origin) => {
    dispatch(setOriginFilter(origin));
  };

  return (
    <div>
      <h2>Filters</h2>
      <div>
        <h3>Genre</h3>
        {genres.map((genre) => (
          <button key={genre.id} onClick={() => handleGenreFilter(genre.name)}>
            {genre.name}
          </button>
        ))}
      </div>
      <div>
        <h3>Origin</h3>
        {origins.map((origin) => (
          <button key={origin.id} onClick={() => handleOriginFilter(origin.name)}>
            {origin.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Filters;