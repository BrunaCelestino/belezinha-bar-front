import React, { useState } from "react";
import "./Login.css";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.message === "Login autorizado") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        setUser({ username: data.username, token: data.token });
      } else {
        setError("Usuário ou senha incorretos");
      }
    } catch {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <img
          src="/images/avatar.png"
          alt="Logo Login"
          className="login-logo"
        />
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
