import React from 'react';
import Form from '../Form/form';
import styles from "./create.module.css"

function Create() {
  return (
    <div className={styles.create}>
      <h1>Crear Nuevo Videojuego</h1>
      <Form />
    </div>
  );
}

export default Create;
