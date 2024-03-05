import { useState } from "react";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "./css/Cadastro.css";

const Cadastro = () => {
  const [userData, setUserData] = useState({
    login: "",
    senha: "",
    role: "", // Define o valor padrão para a role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/auth/register", userData);
      alert("Usuário registrado com sucesso!");
      setUserData({
        login: "",
        senha: "",
        role: "",
      });
    } catch (error) {
      alert("Erro ao registrar usuário");
      console.error("Erro ao registrar usuário:", error);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Login"
          type="text"
          name="login"
          value={userData.login}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Senha"
          type="password"
          name="senha"
          value={userData.senha}
          onChange={handleChange}
          required
        />
        <FormControl fullWidth>
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            name="role"
            value={userData.role}
            onChange={handleChange}
            required
          >
            <MenuItem value="ADMIN">Admin</MenuItem>
            <MenuItem value="USER">User</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" type="submit">
          Registrar
        </Button>
      </form>
    </div>
  );
};

export default Cadastro;
