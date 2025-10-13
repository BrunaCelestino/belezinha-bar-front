import React, { useState } from "react";
import { useLocation, useNavigate  } from "react-router-dom";
import { FaPen , FaBell , FaFolder , FaCog } from "react-icons/fa";

import "./Header.css";

function Header({ isLogged, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

 const navItems = [
    { path: "/atendimento", label: "Atendimento", icon: <FaPen  /> },
    { path: "/pedidos", label: "Pedidos", icon: <FaBell  /> },
    { path: "/caixa", label: "Caixa", icon: <FaFolder  /> },
    { path: "/administracao", label: "Administração", icon: <FaCog /> },
  ];

  const handleClick = (item) => {
    if (isLogged) navigate(item.path);
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/images/logo-azul.png" alt="Logo" />
      </div>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <button
            key={item.path}
            className={`nav-btn ${!isLogged ? "disabled" : ""} ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => handleClick(item)}
            disabled={!isLogged}
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </button>
        ))}
        {isLogged && (
          <button className="logout-btn" onClick={onLogout}>
            Sair
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
