import React, { useState, useEffect } from "react";
import Card from "./Card";
import "../styles/Cards.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/store";

const App = () => {
  //const [productos, setProductos] = useState([]); // asegura que es un array
  const productos = useSelector((store) => store.productos.productos); //linea 18 store.js
  console.log(productos);
  const dispatch = useDispatch();
  useEffect(() => {
    // npx json-server src/data/db.json -p 5001
    dispatch(getProducts()); //despachar funcion getproducts de store
  }, []);
  return (
    <div>
      <div className="card-container">
        {productos.length > 0
          ? productos.map((producto) => (
              <Card key={producto.id} producto={producto} />
            ))
          : console.log("no se encontraron los resultados")}
      </div>
    </div>
  );
};

export default App;
