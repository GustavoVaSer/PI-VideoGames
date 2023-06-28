import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/action';

function Pagination() {
  const dispatch = useDispatch();
  const videoGames = useSelector((state) => state.videoGames); // Obtén la lista de videojuegos desde el estado de Redux
  const itemsPerPage = 15; // Número de videojuegos por página

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(videoGames.length / itemsPerPage);

  const handleClick = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  // Calcula el índice de inicio y fin de los videojuegos a mostrar en la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVideoGames = videoGames.slice(startIndex, endIndex);

  return (
    <div>
      <h2>Pagination</h2>
      <div>
        {currentVideoGames.map((game) => (
          // Renderiza los videojuegos en la página actual
          <div key={game.id}>{game.name}</div>
        ))}
      </div>
      <div>
        {/* Renderiza los botones de paginación */}
        {renderPaginationButtons()}
      </div>
    </div>
  );
}

export default Pagination;
