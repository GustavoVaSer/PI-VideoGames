import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchVideoGames, fetchGenres } from '../../redux/action.js';
import SearchBar from '../../components/SearchBar/searchBar';
import Filters from '../../components/Filters/filters.jsx';
import SortingOptions from '../../components/SortingOptions/sortingOptions';
import Pagination from '../../components/Pagination/pagination';
import styles from './home.module.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const itemsPerPage = 15;

function Home() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  
  useEffect(() => {
    // const url = `https://api.rawg.io/api/games?key=${API_KEY}&page=${currentPage}&page_size=${itemsPerPage}`;
    const url = `http://localhost:3001/videogames?page_size=${itemsPerPage}`;
    dispatch(fetchVideoGames(url));
    dispatch(fetchGenres(`http://localhost:3001/genres/`))
  }, [dispatch, currentPage]);

  return (
    <div className={styles.home}>
      <p className={styles.homeDescription}>
        This is your home page where you can search all your favorite videogames info!
      </p>
      <SearchBar />
      <Filters />
      <SortingOptions  />
      <div className={styles.cardsContainer}>
        <Pagination  />
      </div>
        <Link to="/form" className={styles.formButton}>Create your Videogame !</Link>
    </div>
  );
}

export default Home;
