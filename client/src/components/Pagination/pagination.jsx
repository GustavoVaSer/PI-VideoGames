import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/action';
import { useSelector } from 'react-redux';


function Pagination() {
  const dispatch = useDispatch();
  const itemsPerPage = 15;
  const [currentGames, setCurrentGames] = useState([]);
  const currentPage = useSelector((state) => state.currentPage);

  const API_KEY = "1d449c3663a04ff6b2ed70c1faca004b";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=${currentPage}&page_size=${itemsPerPage}`);
        const data = await response.json();
        const gamesToLoad = data.results;
        setCurrentGames(gamesToLoad);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage]);

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
      <div>
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
    <div>
      <h2>Pagination</h2>
      <div>
        {currentGames.map((game) => (
          <div key={game.id}>{game.name}</div>
        ))}
      </div>
      <div>{renderPaginationButtons()}</div>
    </div>
  );
}

export default Pagination;
