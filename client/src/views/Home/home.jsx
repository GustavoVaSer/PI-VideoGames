import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchVideoGames } from '../../redux/action.js';
import SearchBar from '../../components/SearchBar/searchBar';
import Filters from '../../components/Filters/filters.jsx';
import SortingOptions from '../../components/SortingOptions/sortingOptions';
import Pagination from '../../components/Pagination/pagination';
import styles from './home.module.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const itemsPerPage = 15;

const API_KEY = "1d449c3663a04ff6b2ed70c1faca004b";

function Home() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  
  useEffect(() => {
    dispatch(fetchVideoGames(`https://api.rawg.io/api/games?key=${API_KEY}&page=${currentPage}&page_size=${itemsPerPage}`));
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
