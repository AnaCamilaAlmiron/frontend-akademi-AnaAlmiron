import { Link } from "react-router-dom";

const Card = ({ producto }) => {
  return (
    <div className="card">
      <img src={producto.image_url} alt={producto.name} />
      <h3>{producto.name}</h3>
      <p>Precio: ${producto.price}</p>
      <p>Stock: {producto.stock}</p>

      <Link to={`/product/${producto.id}`}>
        <button className="detalles">Detalle</button>
      </Link>

      <Link to={`/editar/${producto.id}`}>
        <button className="modificar-btn">Modificar</button>
      </Link>
    </div>
  );
};

export default Card;
