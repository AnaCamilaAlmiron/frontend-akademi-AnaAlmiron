import React, { useState, useEffect } from "react";

const App = () => {
  const [productos, setProductos] = useState([]); // asegura que es un array

  useEffect(() => {
    fetch("http://localhost:5000/PRODUCTS") // corriendo en el puerto 3000, peticion get
      .then((res) => res.json()) // respuesta, convetir en json
      .then((data) => {
        console.log("Productos cargados:", data); // Verifica si los datos están llegando
        setProductos(data);
      }) /// actualazar productos
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  return (
    <div>
      <div className="card">
        {productos.length > 0
          ? productos.map((producto) => (
              <div className="card">
                <img src={producto.image_url} alt="" width="150" />
                <h3>{producto.name}</h3>
                <p>{producto.descripcion}</p>
                <p>Precio: ${producto.price}</p>
                <p>Stock: {producto.stock}</p>
                <button>Detalles</button>
              </div>
            ))
          : console.log("no se encontraron los resultados")}
      </div>
    </div>
  );
};

export default App;
