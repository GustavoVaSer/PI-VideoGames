import React from 'react';
import styles from './landingPage.module.css';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className={styles.landingPage}>
      <h1 className={styles.title}>Welcome to your Videogames Page!</h1>
      <Link to="/home">
        <button>Lets Start!</button>
      </Link>
    </div>
  );
}

export default LandingPage;
