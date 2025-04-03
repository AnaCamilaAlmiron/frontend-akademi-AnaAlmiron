import React, { useEffect } from "react";
import Card from "./Card";
import "../styles/Cards.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/store";

const App = () => {
  const productos = useSelector((store) => store.productos.productos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <div>
      <div className="card-container">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <Card key={producto.id} producto={producto} />
          ))
        ) : (
          <p>No se encontraron resultados</p>
        )}
      </div>
    </div>
  );
};

export default App;
