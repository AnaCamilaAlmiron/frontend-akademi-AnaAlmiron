import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

/** Listado de acciones posibles sobre el store */
export const setProducts = createAction("setProducts");

const productsReducer = createReducer(
  {
    productos: [], // La lista de todos los productos.
    productosCargados: false, // Una variable para saber si los productos fueron cargados correctamente.
  },
  (builder) => {
    builder.addCase(setProducts, (state, action) => {
      // Cuando se llama a setProducts, cambia state.productos
      state.productos = action.payload;
      state.productosCargados = true;
    });
  }
);

// Thunk para cargar los productos
export const getProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:5001/PRODUCTS");
      const data = await response.json();

      dispatch(setProducts(data));
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };
};

const store = configureStore({
  reducer: productsReducer,
});

export default store;
