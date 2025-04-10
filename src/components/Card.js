import styles from "./Card.module.css";

const Card = ({ producto, showActions }) => {
  return (
    <div className={styles.card}>
      <div
        className={styles.cardImage}
        style={{ backgroundImage: `url(${producto.image_url})` }}
      />

      <div className={styles.cardInfoContainer}>
        <h3 className={styles.cardTitle}>{producto.name}</h3>
        <p className={styles.cardPrice}>
          ${producto.price} / {producto.stock} disponibles
        </p>

        {showActions && (
          <div className={styles.cardActions}>
            <a className={styles.cardLink} href={`/product/${producto.id}`}>
              Ver producto
            </a>
            <a className={styles.cardLink} href={`/edit/${producto.id}`}>
              Editar
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
export default Card;
