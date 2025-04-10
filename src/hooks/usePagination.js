import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export const productsPerPage = 5; // Cuantos productos hay por pagina.

const usePagination = (productos) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const currentPage = searchParams.get("page");

    // Si la URL no tiene un "page" definido. Empezar desde "1"
    if (currentPage === null) {
      setSearchParams((previousSearchParams) => {
        previousSearchParams.set("page", 1);
        return previousSearchParams;
      });
    }
  }, [searchParams]);

  const currentPage = searchParams.get("page") ?? "1"; // Por ejemplo si la URL es http://localhost:3000/?page=1, entonces esto devuelve "1" en string. Si no existe ?page=1, devuelve 0.
  const totalPages = Math.ceil(productos.length / productsPerPage) - 1;

  const setCurrentPage = (newPageNumber) => {
    setSearchParams((previousSearchParams) => {
      previousSearchParams.set("page", newPageNumber);

      return previousSearchParams;
    });
  };

  return {
    totalPages,
    currentPage: Number(currentPage),
    setCurrentPage,
  };
};

export default usePagination;
