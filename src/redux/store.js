import Products from "../data/db.json";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

const initialState = { productos: [], numeroPagina: 1 };
const productsSlice = createSlice({
  initialState,
  name: "productos",
  reducers: {
    setProducts: (state, actions) => {
      state.productos = actions.payload;
    },
  },
});

const actions = productsSlice.actions;
const store = configureStore({
  reducer: { productos: productsSlice.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export const getProducts = () => (dispatch) => {
  fetch("http://localhost:5001/PRODUCTS") // corriendo en el puerto 5001, peticion get
    .then((res) => res.json()) // respuesta, convetir en json
    .then((data) => {
      console.log("Productos cargados:", data); // Verifica si los datos están llegando
      dispatch(actions.setProducts(data));
    }) /// actualazar productos
    .catch((err) => console.error("Error cargando productos:", err));
};

export default store;
