import Card from "../Card/card";
import styles from "./cards.module.css"

function Cards({allUsers}) {

  const userList = allUsers;

  return (
    <div className={styles.cards}>
      {userList && userList.map(user => 
        <Card user= {user}/>)}
    </div>
  );
}

export default Cards;