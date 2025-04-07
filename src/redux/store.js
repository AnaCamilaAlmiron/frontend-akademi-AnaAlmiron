import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";

const initialState = {
  productos: [],
  productosFiltrados: [],
  numeroPagina: 1,
  productosPorPagina: 5,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        productos: action.payload,
        productosFiltrados: action.payload,
      };

    case "FILTRAR_POR_CATEGORIA":
      return {
        ...state,
        productosFiltrados:
          action.payload === "todos"
            ? state.productos
            : state.productos.filter((p) => p.category === action.payload),
      };

    case "CAMBIAR_PAGINA":
      const nuevaPagina =
        action.payload === "siguiente"
          ? state.numeroPagina + 1
          : state.numeroPagina - 1;
      return {
        ...state,
        numeroPagina: nuevaPagina,
      };

    case "ELIMINAR_PRODUCTO":
      return {
        ...state,
        productos: state.productos.filter((p) => p.id !== action.payload),
        productosFiltrados: state.productosFiltrados.filter(
          (p) => p.id !== action.payload
        ),
      };

    case "ORDENAR_PRODUCTOS":
      const ordenados = [...state.productosFiltrados];
      const [campo, orden] = action.payload.split("-");

      ordenados.sort((a, b) => {
        if (campo === "price" || campo === "stock") {
          return orden === "asc" ? a[campo] - b[campo] : b[campo] - a[campo];
        } else {
          return orden === "asc"
            ? a[campo].localeCompare(b[campo])
            : b[campo].localeCompare(a[campo]);
        }
      });

      return {
        ...state,
        productosFiltrados: ordenados,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  productos: productsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:5001/PRODUCTS");
      const data = await response.json();

      console.log("DATA desde API:", data);

      dispatch({ type: "SET_PRODUCTS", payload: data });
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };
};

export const ORDENAR_PRODUCTOS = "ORDENAR_PRODUCTOS";

export const ordenarProductos = (criterio) => ({
  type: ORDENAR_PRODUCTOS,
  payload: criterio,
});
