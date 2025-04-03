import React, { useState } from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="accordion-toggle" onClick={toggleAccordion}>
        Filtros ▼
        {isOpen && (
          <div className="accordion-content">
            <button className="filtro">Monitor</button>
            <button className="filtro">Teclado</button>
            <button className="filtro">Mouse</button>
            <button className="filtro">Parlantes</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
