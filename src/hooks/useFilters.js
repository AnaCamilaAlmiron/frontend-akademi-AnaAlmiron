import { useSearchParams } from "react-router-dom";

const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category"); //  guardar la categoria filtrada en la URL.
  const sortBy = searchParams.get("sortBy"); // En la URL guardar sortBy que va a decidir que propiedad del array ordenar.
  const order = searchParams.get("order"); //  guardar el orden es decir, "asc" o "desc" para ascendente o descendente.

  // Funcion para cambiar la URL los parametros de sortBy y order.
  const setSortBy = (sortBy, order) => {
    setSearchParams((previousSearchParams) => {
      if (sortBy === null && order === null) {
        previousSearchParams.delete("sortBy");
        previousSearchParams.delete("order");
      } else {
        previousSearchParams.set("sortBy", sortBy);
        previousSearchParams.set("order", order);
      }

      // Cada vez que cambia el orden, resetea el numero de pagina
      previousSearchParams.set("page", "1");

      return previousSearchParams;
    });
  };

  // Funcion para cambiar la categoria en la URL
  const setCategory = (newCategory) => {
    setSearchParams((previousSearchParams) => {
      if (newCategory === null) {
        previousSearchParams.delete("category");
      } else {
        previousSearchParams.set("category", newCategory);
      }

      // Cada vez que cambia la categoria, resetea el numero de pagina
      previousSearchParams.set("page", "1");

      return previousSearchParams;
    });
  };

  return {
    category,
    sortBy,
    order,
    setSortBy,
    setCategory,
  };
};

export default useFilters;
