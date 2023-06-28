import styles from "./card.module.css"

function Card({user}) {
const {id, name, slug, image, year_end, year_start} = user;

  return (
    <div className={styles.card}>
        <h2>{id}:</h2>
        <h4>{name}:</h4>
        <h4>{slug}:</h4>
        <h4>{image}</h4>
        <h4>{year_end}</h4>
        <h4>{year_start}</h4>
        {/* <h4>{game_counts}</h4>
        <h4>{image_background}</h4> */}
        <div>
            <img src="" alt="" />
        </div>
    </div>
  );
}

export default Card;