import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import useGetProductById from "../hooks/useGetProductById";
import { getProducts } from "../redux/store";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { producto } = useGetProductById(id);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    image_url: "",
    descripcion: "",
  });

  useEffect(() => {
    if (producto) setForm(producto);
  }, [producto]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardarCambios = async () => {
    const { name, price, stock, image_url, descripcion } = form;

    if (!name.trim() || !descripcion.trim() || !image_url.trim()) {
      alert("Todos los campos deben estar completos.");
      return;
    }

    const precioNum = Number(price);
    const stockNum = Number(stock);

    if (isNaN(precioNum) || precioNum <= 0) {
      alert("El precio debe ser mayor a 0.");
      return;
    }

    if (isNaN(stockNum) || stockNum < 0) {
      alert("El stock no puede ser negativo.");
      return;
    }

    try {
      await axios.put(`http://localhost:5001/PRODUCTS/${id}`, {
        ...form,
        price: precioNum,
        stock: stockNum,
      });
      dispatch(getProducts());
      navigate(`/product/${id}`);
    } catch (error) {
      alert("Error al actualizar el producto.");
      console.error(error);
    }
  };

  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <div className="edit-container">
      <h2 className="edit-title">Modificar producto: {form.name}</h2>
      <div className="edit-form-group">
        <label>Nombre:</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre"
        />
      </div>
      <div className="edit-form-group">
        <label>Precio:</label>
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Precio"
        />
      </div>
      <div className="edit-form-group">
        <label>Stock:</label>
        <input
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
        />
      </div>
      <div className="edit-form-group">
        <label>Imagen URL:</label>
        <input
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          placeholder="URL de imagen"
        />
      </div>
      <div className="edit-form-group">
        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
        />
      </div>
      <div className="edit-buttons">
        <button className="edit-save" onClick={guardarCambios}>
          Guardar
        </button>
        <button className="edit-cancel" onClick={() => navigate(-1)}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditProduct;
