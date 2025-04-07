import { useNavigate } from "react-router-dom";

const Card = ({ producto }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        width: "200px",
        textAlign: "center",
      }}
    >
      <img
        src={producto.image_url}
        alt={producto.name}
        style={{ width: "100%" }}
      />

      <h3>{producto.name}</h3>
      <p>Precio: ${producto.price}</p>
      <p>Stock: {producto.stock}</p>

      <button onClick={() => navigate(`/product/${producto.id}`)}>
        Detalle
      </button>
      <button onClick={() => navigate(`/edit/${producto.id}`)}>
        Modificar
      </button>
    </div>
  );
};
export default Card;
