import React from 'react';
import { useDispatch } from 'react-redux';
import { sortVideoGames } from '../../redux/action';

function SortingOptions({setCurrentGames}) {
  const dispatch = useDispatch();


  const handleSort = (type) => {
    dispatch(sortVideoGames(type));
  };

  return (
    <div>
      <h2>Sorting Options</h2>
      <button onClick={() => handleSort('name-asc')}>Sort by Name (A-Z)</button>
      <button onClick={() => handleSort('name-desc')}>Sort by Name (Z-A)</button>
      <button onClick={() => handleSort('rating-asc')}>Sort by Rating (Low to High)</button>
      <button onClick={() => handleSort('rating-desc')}>Sort by Rating (High to Low)</button>
    </div>
  );
}

export default SortingOptions;
