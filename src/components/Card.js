const Card = ({ producto }) => {
  console.log("URL de imagen:", producto.image_url);
  return (
    <div className="card">
      <img src={producto.image_url} alt={producto.name} />
      <h3>{producto.name}</h3>
      <p>{producto.descripcion}</p>
      <p>Precio: ${producto.price}</p>
      <p>Stock: {producto.stock}</p>
      <button className="detalles">Detalles</button>
    </div>
  );
};

export default Card;
