import React from "react";
import useGetProducts from "../hooks/useGetProducts";
import { uniqBy } from "lodash";
import useFilters from "../hooks/useFilters";
import styles from "./FiltersPanel.module.css";

const FiltersPanel = () => {
  const { productos } = useGetProducts();
  const { setSortBy, setCategory } = useFilters();

  // Traer todas las cateogrias disponibles que existen en productos
  const allCategories = uniqBy(productos, (producto) => producto.category).map(
    (producto) => producto.category
  );

  const handleSortBy = (e) => {
    // Caso cuando no quiero ordenar por nada.
    if (e.target.value === "") {
      setSortBy(null, null);
    } else {
      const [sortBy, order] = e.target.value.split("-"); // Separar el guion para tener el sortBy y el order.

      setSortBy(sortBy, order);
    }
  };

  const handleCategoryChange = (e) => {
    // Caso cuando selecciono "Todos", quiero eliminar el filtro de categoria.
    if (e.target.value === "") {
      setCategory(null);
    } else {
      setCategory(e.target.value);
    }
  };

  return (
    <aside className={styles.panel}>
      <label className={styles.label}>Ordenar por</label>
      <select className={styles.select} onChange={handleSortBy}>
        <option value="">Ordenar por...</option>
        <option value="name-asc">Nombre A-Z</option>
        <option value="name-desc">Nombre Z-A</option>
        <option value="price-asc">Precio Menor a Mayor</option>
        <option value="price-desc">Precio Mayor a Menor</option>
        <option value="stock-asc">Stock Menor a Mayor</option>
        <option value="stock-desc">Stock Mayor a Menor</option>
      </select>
      <label className={styles.label}>Categoria</label>
      <select className={styles.select} onChange={handleCategoryChange}>
        <option value="">Todos</option>
        {allCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </aside>
  );
};

export default FiltersPanel;
