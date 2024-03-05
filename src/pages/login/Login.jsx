import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/login.css";
import { TextField, Button } from "@mui/material";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    login: "",
    senha: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        loginData
      );
      console.log(response);
      const token = response.data.token;
      localStorage.setItem("token", token);
      alert("Usuário autenticado com sucesso!");
      navigate("/clientes");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Login"
          type="text"
          name="login"
          value={loginData.login}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Senha"
          type="senha"
          name="senha"
          value={loginData.senha}
          onChange={handleChange}
          required
        />
        <Button variant="contained" type="submit">
          Entrar
        </Button>
      </form>
    </div>
  );
};

export default Login;
