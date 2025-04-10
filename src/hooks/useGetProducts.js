import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/store";
import { orderBy } from "lodash";

const useGetProducts = () => {
  const productos = useSelector((state) => state.productos);
  const productosCargados = useSelector((state) => state.productosCargados);
  const dispatch = useDispatch();

  useEffect(() => {
    // Si los productos no fueron cargados... llamar a getProducts
    if (!productosCargados) {
      dispatch(getProducts());
    }
  }, [productosCargados]);

  // Funcion para traer los productos dada un numero de pagina.
  const getProductsOnPage = (sortByField, order, category) => {
    let resultadoProductos = productos;

    // Filtrar por categoria si es que el usuario especifico categoria.
    if (category !== null) {
      resultadoProductos = resultadoProductos.filter(
        (producto) => producto.category === category
      );
      console.log(resultadoProductos);
    }

    // Ordenar un array usando la funcion orderBy de lodash.
    // Solo ordeno si el usuario especifico un sortByField y un order.
    if (sortByField !== null && order !== null) {
      resultadoProductos = orderBy(resultadoProductos, sortByField, order);
    }

    return resultadoProductos;
  };

  // Podemos devolver productos y productosCargados que son las dos cosas que le interesan a otros componentes.
  return {
    productos,
    productosCargados,
    getProductsOnPage,
  };
};

export default useGetProducts;
