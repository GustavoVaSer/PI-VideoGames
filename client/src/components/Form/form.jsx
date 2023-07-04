import React, { useState } from 'react';
import styles from './form.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { createVideoGame } from '../../redux/action';

function Form() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [platforms, setPlatforms] = useState('');
  const [released, setReleaseDate] = useState('');
  const [rating, setRating] = useState('');
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const genresList = useSelector((state) => state.genreFilter); 

  const handleSubmit = (e) => {
    
    e.preventDefault();

    // Validaciones del formulario
    if (!name || !image || !description || !platforms || !released || !rating || genres.length === 0) {
      setError('Please complete all the fields.');
      return;
    }
    const newGame = {
      name,
      image,
      description,
      platforms,
      released,
      rating,
      genres,
    };
    dispatch(createVideoGame(newGame))

    // fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=15`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(newGame),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Nuevo videojuego creado:', data);

    //     setName('');
    //     setImage('');
    //     setDescription('');
    //     setPlatforms('');
    //     setReleaseDate('');
    //     setRating('');
    //     setGenres([]);
    //     setError('');
    //   })
    //   .catch(error => {
    //     console.error('Error al crear el nuevo videojuego:', error);
    //     setError('Ocurrió un error al crear el nuevo videojuego. Por favor, inténtalo nuevamente.');
    //   });
  };

  const handleGenreChange = (e) => {
    const selectedGenreValues = Array.from(e.target.selectedOptions, (option) => option.value);
    const selectedGenres = selectedGenreValues.map((value) => ({
      // id: value,
      name: value,
    }));
    setGenres(selectedGenres);
  };

  return (
    <div className={styles.formContainer}>
    <h2 className={styles.formTitle}>Create your new VideoGame !</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label className={styles.labels} htmlFor="name">Name:</label>
          <input className={styles.inputField} type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className={styles.labels} htmlFor="image">Image:</label>
          <input className={styles.inputField} type="text" id="image" value={image} onChange={(e) => setImage(e.target.value)} />
        </div>
        <div>
          <label className={styles.labels} htmlFor="description">Description:</label>
          <textarea className={styles.textareaField} id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label className={styles.labels} htmlFor="platforms">Plataforms:</label>
          <input className={styles.inputField} type="text" id="platforms" value={platforms} onChange={(e) => setPlatforms(e.target.value)} />
        </div>
        <div>
          <label className={styles.labels} htmlFor="releaseDate">Release Date:</label>
          <input className={styles.inputField} type="text" id="releaseDate" value={released} onChange={(e) => setReleaseDate(e.target.value)} />
        </div>
        <div>
          <label className={styles.labels} htmlFor="rating">Rating:</label>
          <input className={styles.inputField} type="number" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} />
        </div>
        <div>
          <label className={styles.labels} htmlFor="genres">Genres:</label>
          <select className={styles.selectField} id="genres" multiple value={genres} onChange={handleGenreChange}>
            {/* <option className={styles.option} value="Action">Action</option>
            <option className={styles.option} value="Adventure">Advenures</option>
            <option className={styles.option} value="Strategy">Strategy</option>
            <option className={styles.option} value="Rol">Rol</option> */}
            {genresList && genresList.map((genre) => (
              <option key={genre.id} className={styles.option}  value={genre.name.toLowerCase()}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <button className={styles.button} type="submit">Lets Create!</button>
      </form>
    </div>
  );
}

export default Form;
