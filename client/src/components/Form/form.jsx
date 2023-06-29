import React, { useState } from 'react';

const API_KEY = "1d449c3663a04ff6b2ed70c1faca004b";

function Form() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [platforms, setPlatforms] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [rating, setRating] = useState('');
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones del formulario
    if (!name || !image || !description || !platforms || !releaseDate || !rating || genres.length === 0) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    const newGame = {
      name,
      image,
      description,
      platforms,
      releaseDate,
      rating,
      genres,
    };

    fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=15`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGame),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Nuevo videojuego creado:', data);

        // Resetear los campos del formulario después de enviar
        setName('');
        setImage('');
        setDescription('');
        setPlatforms('');
        setReleaseDate('');
        setRating('');
        setGenres([]);
        setError('');
      })
      .catch(error => {
        console.error('Error al crear el nuevo videojuego:', error);
        setError('Ocurrió un error al crear el nuevo videojuego. Por favor, inténtalo nuevamente.');
      });
  };

  const handleGenreChange = (e) => {
    const selectedGenreValues = Array.from(e.target.selectedOptions, (option) => option.value);
    const selectedGenres = selectedGenreValues.map((value) => ({
      id: value,
      name: value,
    }));
    setGenres(selectedGenres);
  };

  return (
    <div>
      <h2>Crear Nuevo Videojuego</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="image">Imagen:</label>
          <input type="text" id="image" value={image} onChange={(e) => setImage(e.target.value)} />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label htmlFor="platforms">Plataformas:</label>
          <input type="text" id="platforms" value={platforms} onChange={(e) => setPlatforms(e.target.value)} />
        </div>
        <div>
          <label htmlFor="releaseDate">Fecha de lanzamiento:</label>
          <input type="text" id="releaseDate" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input type="number" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} />
        </div>
        <div>
          <label htmlFor="genres">Géneros:</label>
          <select id="genres" multiple value={genres} onChange={handleGenreChange}>
            <option value="accion">Acción</option>
            <option value="aventura">Aventura</option>
            <option value="estrategia">Estrategia</option>
            <option value="rol">Rol</option>
          </select>
        </div>
        <button type="submit">Crear Videojuego</button>
      </form>
    </div>
  );
}

export default Form;
