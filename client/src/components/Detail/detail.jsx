import React from 'react';

function GameDetail({ match }) {
  // Obtén el ID del videojuego de los parámetros de la URL
  const gameId = match.params.id;

  // Realiza cualquier lógica adicional para obtener los detalles del videojuego

  return (
    <div>
      <h2>Game Detail</h2>
      <p>Game ID: {gameId}</p>
      {/* Renderiza los detalles del videojuego */}
    </div>
  );
}

export default GameDetail;
