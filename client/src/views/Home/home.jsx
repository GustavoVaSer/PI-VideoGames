import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideoGames } from '../../redux/action.js';
import SearchBar from '../../components/SearchBar/searchBar';
import Filters from '../../components/Filters/filters.jsx';
import SortingOptions from '../../components/SortingOptions/sortingOptions';
import Pagination from '../../components/Pagination/pagination';
import Cards from '../../components/Cards/cards';
import styles from './home.module.css'

function Home() {
  const dispatch = useDispatch();
  const videoGames = useSelector((state) => state.videoGames);

  useEffect(() => {
    dispatch(fetchVideoGames());
  }, [dispatch]);

  return (
    <div className={styles.home}>
      <p className={styles.homeDescription}>
        This is your home page where you can search all your favorite videogames info!
      </p>
      <SearchBar />
      <Filters />
      <SortingOptions />
      <div className={styles.cardsContainer}>
        {videoGames.map((game) => (
          <Cards key={game.id} game={game} />
        ))}
      </div>
      <Pagination />
    </div>
  );
}

export default Home;

