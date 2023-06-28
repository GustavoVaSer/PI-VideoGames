import { Link } from 'react-router-dom';
import styles from './card.module.css';

function Card({ game }) {
  const { id, name, image, genres } = game;

  return (
    <Link to={`/home/${id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <h2>{name}</h2>
        <img src={image} alt={name} />
        <h4>Genres:</h4>
        <ul>
          {genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

export default Card;
