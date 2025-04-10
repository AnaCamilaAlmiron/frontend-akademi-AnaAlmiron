import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import ProductDetail from "./ProductDetail";
import EditProduct from "./EditProduct";
import { Provider } from "react-redux";
import store from "../redux/store";
import "../styles/App.css";
import styles from "./App.module.css";

const App = () => {
  return (
    <div className={styles.app}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/edit/:id" element={<EditProduct />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
