import React from "react";
import FiltersPanel from "./FiltersPanel";
import Card from "./Card";
import useGetProducts from "../hooks/useGetProducts";
import usePagination, { productsPerPage } from "../hooks/usePagination";
import useFilters from "../hooks/useFilters";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const { productosCargados, getProductsOnPage } = useGetProducts();
  const { order, sortBy, category } = useFilters();

  const productos = getProductsOnPage(sortBy, order, category);

  const { currentPage, setCurrentPage, totalPages } = usePagination(productos);

  const productsOnPage = productos.slice(
    currentPage * productsPerPage,
    currentPage * productsPerPage + productsPerPage
  );

  if (!productosCargados) {
    return <p style={{ textAlign: "center" }}>Cargando productos...</p>;
  }

  return (
    <div className={styles.wrapper}>
      <h2>Productos</h2>
      <section className={styles.container}>
        <FiltersPanel />
        <div className={styles.productContainer}>
          {productsOnPage.length > 0 ? (
            productsOnPage.map((producto) => (
              <Card key={producto.id} producto={producto} showActions />
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No hay productos disponibles</p>
          )}
          <div className={styles.paginationContainer}>
            <button
              className={styles.button}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              style={{ marginRight: "10px" }}
            >
              Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button
              className={styles.button}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{ marginLeft: "10px" }}
            >
              Siguiente
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
