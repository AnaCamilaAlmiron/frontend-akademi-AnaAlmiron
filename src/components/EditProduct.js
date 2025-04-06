import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mostrarModal, setMostrarModal] = useState(false);

  const producto = useSelector((state) =>
    state.productos.productos.find((p) => p.id === parseInt(id))
  );

  if (!producto) return <p>Producto no encontrado</p>;

  const handleEliminar = async () => {
    try {
      await axios.delete(`http://localhost:3000/productos/${producto.id}`);
      dispatch({ type: "ELIMINAR_PRODUCTO", payload: producto.id });
      setMostrarModal(false);
      navigate("/");
    } catch (error) {
      alert("Error al eliminar el producto");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Editar producto</h2>
      <p>Nombre: {producto.name}</p>
      <p>Descripción: {producto.descripcion}</p>
      <p>Precio: ${producto.price}</p>
      <p>Stock: {producto.stock}</p>

      <button
        onClick={() => setMostrarModal(true)}
        style={{ backgroundColor: "red", color: "white" }}
      >
        Eliminar
      </button>

      <button onClick={() => navigate(-1)} style={{ marginTop: "20px" }}>
        Volver
      </button>

      {mostrarModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "10px",
              textAlign: "center",
              width: "300px",
            }}
          >
            <h3>¿Eliminar "{producto.name}"?</h3>
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={handleEliminar}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  marginRight: "10px",
                }}
              >
                Confirmar
              </button>
              <button onClick={() => setMostrarModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProduct;
