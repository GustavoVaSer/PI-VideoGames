import React from 'react';
import { useSelector } from 'react-redux';

function SearchResults() {
  const searchResults = useSelector((state) => state.videoGames); // Obtén los juegos del estado global

  return (
    <div>
      {searchResults.map((game) => (
        <div key={game.id}>
          {/* Aquí puedes mostrar los detalles del juego, como su título, imagen, etc. */}
          <h2>{game.title}</h2>
          <img src={game.image} alt={game.title} />
          {/* ... */}
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
