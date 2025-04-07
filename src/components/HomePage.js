import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, ordenarProductos } from "../redux/store";
import Navbar from "./Navbar";
import Card from "./Card";
import "../styles/Cards.css";

const HomePage = () => {
  const dispatch = useDispatch();

  const productosFiltrados = useSelector(
    (state) => state.productos.productosFiltrados
  );
  const numeroPagina = useSelector((state) => state.productos.numeroPagina);
  const productosPorPagina = useSelector(
    (state) => state.productos.productosPorPagina
  );
  const isLoading = useSelector((state) => state.productos.loading);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleOrden = (e) => {
    const valor = e.target.value;
    if (valor) dispatch(ordenarProductos(valor));
  };

  const dispatchPagina = (tipo) => {
    dispatch({ type: "CAMBIAR_PAGINA", payload: tipo });
  };

  // Paginación
  const indiceUltimoProducto = numeroPagina * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(
    indicePrimerProducto,
    indiceUltimoProducto
  );
  const totalPaginas = Math.ceil(
    productosFiltrados.length / productosPorPagina
  );

  if (isLoading) {
    return <p style={{ textAlign: "center" }}>Cargando productos...</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <Navbar />
      <h2>Productos</h2>

      {/* Ordenamiento */}
      <select onChange={handleOrden} defaultValue="">
        <option value="" disabled>
          Ordenar por...
        </option>
        <option value="name-asc">Nombre A-Z</option>
        <option value="name-desc">Nombre Z-A</option>
        <option value="price-asc">Precio Menor a Mayor</option>
        <option value="price-desc">Precio Mayor a Menor</option>
        <option value="stock-asc">Stock Menor a Mayor</option>
        <option value="stock-desc">Stock Mayor a Menor</option>
      </select>

      <div className="card-container" style={{ marginTop: "1rem" }}>
        {productosActuales.length > 0 ? (
          productosActuales.map((producto) => (
            <Card key={producto.id} producto={producto} />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No hay productos disponibles</p>
        )}
      </div>

      {/* Paginado */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          background: "#f9f9f9",
          padding: "10px 0",
          textAlign: "center",
          boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
          zIndex: 10,
        }}
      >
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
