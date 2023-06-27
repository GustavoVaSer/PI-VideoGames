import styles from "./card.module.css"

function Card() {
  return (
    <div className={styles.card}>
        <h2>ID:</h2>
        <h4>Name:</h4>
        <h4>Slug:</h4>
        <h4>Image</h4>
        <h4>YearEnd</h4>
        <h4>YearCount</h4>
        <div>
            <img src="" alt="" />
        </div>
    </div>
  );
}

export default Card;