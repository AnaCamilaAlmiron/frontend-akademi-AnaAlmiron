import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const productos = useSelector((state) => state.productos.productos);
  const producto = productos.find((p) => String(p.id) === id);

  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Detalle de {producto.name}</h2>
      <img src={producto.image_url} alt={producto.name} width="200" />
      <p>Precio: ${producto.price}</p>
      <p>Stock: {producto.stock}</p>
      <p>Descripción: {producto.descripcion}</p>

      {/* <Link to={`/edit/${producto.id}`}>
        <button style={{ marginRight: "10px" }}>Modificar</button>
      </Link> */}

      <button onClick={() => navigate("/")}>Volver</button>
    </div>
  );
};

export default ProductDetail;
