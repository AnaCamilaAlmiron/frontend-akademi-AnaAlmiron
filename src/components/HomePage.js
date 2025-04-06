import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import Card from "./Card";
import { getProducts } from "../redux/store";
import "../styles/Cards.css";

const HomePage = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((store) => store.productos.loading);
  const productosFiltrados = useSelector(
    (state) => state.productos.productosFiltrados
  );
  const numeroPagina = useSelector((state) => state.productos.numeroPagina);
  const productosPorPagina = useSelector(
    (state) => state.productos.productosPorPagina
  );

  // Cálculo para paginación
  const indiceUltimoProducto = numeroPagina * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(
    indicePrimerProducto,
    indiceUltimoProducto
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const dispatchPagina = (tipo) => {
    dispatch({ type: "CAMBIAR_PAGINA", payload: tipo });
  };

  const totalPaginas = Math.ceil(
    productosFiltrados.length / productosPorPagina
  );

  if (isLoading) {
    return <p style={{ textAlign: "center" }}>Cargando productos...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="card-container">
        {productosActuales.length > 0 ? (
          productosActuales.map((producto) => (
            <Card key={producto.id} producto={producto} />
          ))
        ) : (
          <p className="noCoincide" style={{ textAlign: "center" }}>
            No hay productos disponibles
          </p>
        )}
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={() => dispatchPagina("anterior")}
          disabled={numeroPagina === 1}
          style={{ marginRight: "10px" }}
        >
          Anterior
        </button>
        <span>
          Página {numeroPagina} de {totalPaginas}
        </span>
        <button
          onClick={() => dispatchPagina("siguiente")}
          disabled={numeroPagina === totalPaginas}
          style={{ marginLeft: "10px" }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default HomePage;
