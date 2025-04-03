import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

const initialState = { productos: [], numeroPagina: 1 };

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, productos: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  productos: productReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export const getProducts = () => (dispatch) => {
  fetch("http://localhost:5001/PRODUCTS") // Petición GET
    .then((res) => res.json()) // Convertir respuesta en JSON
    .then((data) => {
      console.log("Productos cargados:", data);
      dispatch({ type: "SET_PRODUCTS", payload: data }); // Actualizar productos en Redux
    })
    .catch((err) => console.error("Error cargando productos:", err));
};

export default store;
