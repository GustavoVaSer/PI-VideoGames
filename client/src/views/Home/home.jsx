import React from 'react';
import Cards from '../../components/Cards/cards';
import NavBar from '../../components/NavBar/navBar';
import styles from './home.module.css'

function Home() {
  return (
    <div className={styles.home}>
      <h1 className={styles.homeTitle}> PI Videogames</h1>
      <p>Esta es la home page</p>
      <NavBar />
      <Cards />
    </div>
  );
}

export default Home;

