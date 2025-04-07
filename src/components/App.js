import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ProductDetail from "./ProductDetail";
import EditProduct from "./EditProduct";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/edit/:id" element={<EditProduct />} />
    </Routes>
  );
};

export default App;
