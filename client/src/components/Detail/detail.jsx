import React, { useEffect, useState } from 'react';

const API_KEY = "1d449c3663a04ff6b2ed70c1faca004b";

function GameDetail({ match }) {
  const gameId = match.params.id;
  const [gameDetails, setGameDetails] = useState(null);

  useEffect(() => {
    fetch(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`)
      .then(response => response.json())
      .then(data => setGameDetails(data))
      .catch(error => {
        console.error('Error fetching game details:', error);
      });
  }, [gameId]);

  if (!gameDetails) {
    return <p>Loading game details...</p>;
  }

  return (
    <div>
      <h2>Game Detail</h2>
      <h3>Name: {gameDetails.name}</h3>
      <p>Game ID: {gameId}</p>
      {/* Renderiza los demás detalles del videojuego */}
      <img src={gameDetails.background_image} alt={gameDetails.name} />
      <p>Description: {gameDetails.description_raw}</p>
      {/* Agrega más elementos HTML para mostrar los demás detalles del videojuego */}
    </div>
  );
}

export default GameDetail;
