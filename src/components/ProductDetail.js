// src/components/ProductDetail.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const producto = useSelector((state) =>
    state.productos.productos.find((p) => p.id === parseInt(id))
  );

  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    image_url: "",
    descripcion: "",
  });

  useEffect(() => {
    if (producto) {
      setForm(producto);
    }
  }, [producto]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardarCambios = async () => {
    if (isNaN(form.price) || Number(form.price) <= 0) {
      alert("El precio debe ser un número mayor a 0");
      return;
    }

    if (Number(form.stock) < 0) {
      alert("El stock no puede ser negativo");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/productos/${id}`,
        form
      );
      dispatch({ type: "ACTUALIZAR_PRODUCTO", payload: response.data });
      setEditando(false);
      navigate("/"); // volver a home
    } catch (error) {
      alert("Error al actualizar");
    }
  };

  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Detalle de {producto.name}</h2>
      {!editando ? (
        <>
          <img src={producto.image_url} alt={producto.name} width="200" />
          <p>Precio: ${producto.price}</p>
          <p>Stock: {producto.stock}</p>
          <p>Descripción: {producto.descripcion}</p>
          <button onClick={() => setEditando(true)}>Editar</button>
        </>
      ) : (
        <>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nombre"
          />
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Precio"
          />
          <input
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
          />
          <input
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            placeholder="Imagen"
          />
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
          />
          <br />
          <button onClick={guardarCambios}>Guardar</button>
          <button onClick={() => setEditando(false)}>Cancelar</button>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
