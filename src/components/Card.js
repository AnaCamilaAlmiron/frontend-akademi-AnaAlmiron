const Card = ({ producto }) => {
  console.log("URL de imagen:", producto.image_url);
  return (
    <div className="card">
      <img src={producto.image_url} alt={producto.name} />
      <h3>{producto.name}</h3>
      <p className="descripcion">{producto.descripcion}</p>
      <p>Precio: ${producto.price}</p>
      <div className="stock-btn">
        <button className="stock"> - </button>
        <p>Stock: {producto.stock}</p>
        <button className="stock"> + </button>
      </div>
      <button className="detalles">Detalles</button>
      <button className="modificar-btn">Modificar</button>
    </div>
  );
};

export default Card;
