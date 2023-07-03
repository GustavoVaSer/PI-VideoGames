import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/action';
import { useSelector } from 'react-redux';
import Card from '../Card/card';
import styles from './pagination.module.css';

function Pagination() {
  const dispatch = useDispatch();
  const itemsPerPage = 15;
  const currentGames = useSelector((state) => state.videoGames);
  const currentPage = useSelector((state) => state.currentPage);

  const handleClick = (pageNumber) => {
    let nextPage = currentPage;

    if (pageNumber === "prev") {
      nextPage = currentPage - 1;
    } else if (pageNumber === "next") {
      nextPage = currentPage + 1;
    } else {
      nextPage = pageNumber;
    }

    dispatch(setCurrentPage(nextPage));
  };

  const totalPages = Math.ceil(currentGames.count / itemsPerPage);

  const renderPaginationButtons = () => {
    return (
      <div className={styles.buttonsContainer}>
        <button onClick={() => handleClick("prev")} disabled={currentPage === 1}>
          &lt; Anterior
        </button>
        <button onClick={() => handleClick("next")} disabled={currentPage === totalPages}>
          Siguiente &gt;
        </button>
      </div>
    );
  };

  return (
    <div >
      <h2 className={styles.select}>Select your Game Card</h2>
      <div className={styles.container}>
        {currentGames.map((game) => (
          <Card
            key={game.id}
            name={game.name}
            image={game.background_image}
            genres={game.genres}
            id={game.id}
          />
        ))}
      </div>
      <div>{renderPaginationButtons()}</div>
    </div>
  );
}

export default Pagination;
