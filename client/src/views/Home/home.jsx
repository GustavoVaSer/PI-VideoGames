import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/action';
import Cards from '../../components/Cards/cards';
import NavBar from '../../components/NavBar/navBar';
import styles from './home.module.css'

function Home() {

  const dispatch = useDispatch()
  const allUsers = useSelector((state) => state.allUsers)

  useEffect(() => {
    dispatch(getUsers())
    // return (() => {
    //   clearDetail()
    // })
  },[dispatch])

  return (
    <div className={styles.home}>
      <p className={styles.homeDescription}>This is your home page where you can search all your favorites videogames info!</p>
      <NavBar />
      <Cards allUsers = {allUsers} />
    </div>
  );
}

export default Home;

