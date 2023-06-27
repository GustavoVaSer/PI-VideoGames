import React from 'react';
import styles from './navBar.module.css';

function NavBar() {
  return (
    <div className={styles.searchBox}>
      <form>
        <input type="text" placeholder="Search your game!" />
        <button className={styles.button}>Search</button>
      </form>
    </div>
  );
}

export default NavBar;
