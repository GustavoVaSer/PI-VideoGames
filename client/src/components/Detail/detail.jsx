import React, { useEffect, useState } from 'react';
import styles from './detail.module.css';

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
    return <p>No details for this game...</p>;
  }

  const {
    id,
    name,
    background_image,
    platforms,
    description_raw,
    released,
    rating,
    genres
  } = gameDetails;

  return (
    <div className={styles.detailContainer}>
      <h2>Game Detail</h2>
      <h3>Name: {name}</h3>
      <p>Game ID: {id}</p>
        <div className={styles.contentContainer}>
          <img src={background_image} alt={name} className={styles.image} />
          <p className={styles.description}>Description: {description_raw}</p>
        </div>
      <p className={styles.platforms}>Platforms: {platforms.map(platform => platform.platform.name).join(', ')}</p>
      <p>Released: {released}</p>
      <p>Rating: {rating}</p>
      <p className={styles.genres}>Genres: {genres.map(genre => genre.name).join(', ')}</p>
    </div>
  );
}

export default GameDetail;
