import React from 'react';
import Cards from '../../components/Cards/cards';
import NavBar from '../../components/NavBar/navBar';
import style from './home.module.css'

function Home() {
  return (
    <div className={style.home}>
      <h1>PI Videogames</h1>
      <p>Esta es la home page</p>
      <NavBar />
      <Cards />
    </div>
  );
}

export default Home;
