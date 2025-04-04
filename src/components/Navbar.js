import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleFilter = (category) => {
    dispatch({ type: "FILTRAR_POR_CATEGORIA", payload: category });
  };

  return (
    <nav className="navbar">
      <div className="accordion-toggle" onClick={toggleAccordion}>
        Filtros ▼
        {isOpen && (
          <div className="accordion-content">
            <button className="filtro" onClick={() => handleFilter("todos")}>
              Todos
            </button>
            <button
              className="filtro"
              onClick={() => handleFilter("Monitores")}
            >
              Monitores
            </button>
            <button className="filtro" onClick={() => handleFilter("Teclados")}>
              Teclados
            </button>
            <button className="filtro" onClick={() => handleFilter("Mouses")}>
              Mouses
            </button>
            <button
              className="filtro"
              onClick={() => handleFilter("Parlantes")}
            >
              Parlantes
            </button>
            <button
              className="filtro"
              onClick={() => handleFilter("Auriculares")}
            >
              Auriculares
            </button>
            <button className="filtro" onClick={() => handleFilter("Pads")}>
              Pads
            </button>
            <button className="filtro" onClick={() => handleFilter("Cables")}>
              Cables
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
