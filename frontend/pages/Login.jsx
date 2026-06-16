import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
   const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(login === "admin" && password === "1234"){
      navigate("/dashboard");
    }
  }
  return (
    <div className="login-container">

      <div className="top-decoration">
        <div className="line orange"></div>
        <div className="line green"></div>
        <div className="line blue"></div>
      </div>

      <img
        src="/logo.png"
        alt="Logo"
        className="logo-right"
      />

      <div className="login-card">
        <form className="login-card" onSubmit={handleSubmit}>

        <h2>BIENVENUE CHEZ BOYNADJI</h2>

         

           <input
             type="text"
             placeholder="Login"
             className="input-field"
             onChange={(e)=>setLogin(e.target.value)}
          />

        <input
          type="password"
          placeholder="Mot de passe"
          className="input-field"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="login-btn">
          Se connecter
        </button>
         

        <p className="forgot-password">
          Mot de Passe Oublié ?
        </p>

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