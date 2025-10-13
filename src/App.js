import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Atendimento from "./pages/Atendimento";
import Pedidos from "./pages/Pedidos";
import Caixa from "./pages/Caixa";
import Administracao from "./pages/Administracao";
import "./App.css";

function App() {
  const [user, setUser] = useState(
    localStorage.getItem("token")
      ? { username: localStorage.getItem("username"), token: localStorage.getItem("token") }
      : null
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
  };

  return (
    <Router>
      <div className="app">
        <Header isLogged={!!user} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={!user ? <Login setUser={setUser} /> : <Navigate to="/atendimento" />} />
            <Route path="/atendimento" element={user ? <Atendimento /> : <Navigate to="/" />} />
            <Route path="/pedidos" element={user ? <Pedidos /> : <Navigate to="/" />} />
            <Route path="/caixa" element={user ? <Caixa /> : <Navigate to="/" />} />
            <Route path="/administracao" element={user ? <Administracao /> : <Navigate to="/" />} />
          </Routes>
        </main>
         <Footer />
      </div>
    </Router>
  );
}

export default App;
