import React from "react";
import { useParams } from "react-router-dom";
import useGetProductById from "../hooks/useGetProductById";
import styles from "./ProductDetail.module.css";
import Card from "./Card";

const ProductDetail = () => {
  const { id } = useParams();
  const { producto } = useGetProductById(id);

  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <div className={styles.wrapper}>
      <h2>Detalle de {producto.name}</h2>
      <div className={styles.linkContainer}>
        <a href="/" className={styles.link}>
          Volver
        </a>
      </div>
      <Card key={producto.id} producto={producto} />
    </div>
  );
};

export default ProductDetail;
