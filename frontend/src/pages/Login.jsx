import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { username, password }
      );

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Erreur de connexion");
    }
  };

  return (
    <div className="login-container">

      <div className="top-decoration">
        <div className="line orange"></div>
        <div className="line green"></div>
        <div className="line blue"></div>
      </div>

      <div className="logo-area">
        <img src="/logo.jpeg" alt="Logo" className="logo-right" />
        <span className="logo-name">Boynadji</span>
      </div>

      <div className="login-card">
        <form onSubmit={handleLogin}>

          <p className="card-title">Bienvenue à BOYNADJI PLURIEL</p>
          <p className="card-sub">Connectez-vous à votre espace</p>

          <label className="field-label">Identifiant</label>
          <div className="field-wrap">
            <input
              type="text"
              placeholder="Votre login"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <label className="field-label">Mot de passe</label>
          <div className="field-wrap">
            <input
              type="password"
              placeholder="••••••••"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-btn">
            Se connecter
          </button>

          <p className="forgot-password">Mot de passe oublié ?</p>

          <div className="divider-dots">
            <span className="dot orange"></span>
            <span className="dot green"></span>
            <span className="dot blue"></span>
            <span className="dot pink"></span>
            <span className="dot purple"></span>
          </div>

        </form>
      </div>

      <div className="bottom-decoration">
        <div className="line orange"></div>
        <div className="line pink"></div>
        <div className="line purple"></div>
      </div>

    </div>
  );
}

export default Login;
