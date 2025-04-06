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
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  productos: productsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

export const getProducts = () => (dispatch) => {
  fetch("http://localhost:5001/PRODUCTS")
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: "SET_PRODUCTS", payload: data });
    })
    .catch((err) => console.error("Error cargando productos:", err));
};
