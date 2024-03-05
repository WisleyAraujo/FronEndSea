import React, { useEffect, useState } from "react";
import "./css/formulario.css";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import Tabela from "../tabela/Tabela.jsx";

const Formulario = () => {
  const initialState = {
    nome: "",
    cpf: "",
    endereco: {
      cep: "",
      logradouro: "",
      bairro: "",
      cidade: "",
      uf: "",
      complemento: "",
    },
    telefones: [{ numero: "", ddd: "", tipo: "" }],
    emails: [{ id: "", email: "" }],
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleEnderecoChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      endereco: {
        ...formData.endereco,
        [name]: value,
      },
    });

    if (name === "cep" && value.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${value}/json/`
        );
        const { logradouro, bairro, localidade, uf } = response.data;
        setFormData({
          ...formData,
          endereco: {
            ...formData.endereco,
            logradouro,
            bairro,
            cidade: localidade,
            uf,
          },
        });
      } catch (error) {
        console.error("Erro ao consultar CEP:", error);
      }
    }
  };

  const handleTelefoneChange = (e, index) => {
    const { name, value } = e.target;
    const newTelefones = [...formData.telefones];
    newTelefones[index] = {
      ...newTelefones[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      telefones: newTelefones,
    });
  };

  const handleAddTelefone = () => {
    setFormData({
      ...formData,
      telefones: [...formData.telefones, { numero: "", ddd: "", tipo: "" }],
    });
  };

  const handleEmailChange = (e, id) => {
    const { value } = e.target;
    const newEmails = formData.emails.map((email) =>
      email.id === id ? { ...email, email: value } : email
    );
    setFormData({
      ...formData,
      emails: newEmails,
    });
  };

  const handleAddEmail = () => {
    setFormData({
      ...formData,
      emails: [...formData.emails, { id: generateId(), email: "" }],
    });
  };

  const handleDeleteEmail = (id) => {
    const updatedEmails = formData.emails.filter((email) => email.id !== id);
    setFormData({
      ...formData,
      emails: updatedEmails,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/clientes/cadastrar", formData);
      setFormData(initialState);
      console.log(formData);
      alert("Dados Enviados com Sucesso :)");
    } catch (error) {
      alert("Os daados nao foram enviados");
      console.error("Erro ao enviar os dados:", error);
    }
  };

  return (
    <>
      <form className="formulario" onSubmit={handleSubmit}>
        <h2>Preencha o Formulário</h2>
        <div className="campo">
          <TextField
            label="Nome"
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            fullWidth
            required
          />
        </div>
        <div className="campo">
          <TextField
            required
            fullWidth
            label="CPF"
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
          />
        </div>
        <div className="campo">
          <h4>Endereço:</h4>
          <TextField
            fullWidth
            required
            label="CEP"
            type="text"
            name="cep"
            value={formData.endereco.cep}
            onChange={handleEnderecoChange}
          />
        </div>
        <div className="campo">
          <TextField
            required
            label="Logradouro"
            type="text"
            name="logradouro"
            value={formData.endereco.logradouro}
            onChange={handleEnderecoChange}
          />
          <TextField
            required
            label="Bairro"
            type="text"
            name="bairro"
            value={formData.endereco.bairro}
            onChange={handleEnderecoChange}
          />
          <TextField
            required
            label="Cidade"
            type="text"
            name="cidade"
            value={formData.endereco.cidade}
            onChange={handleEnderecoChange}
          />
          <TextField
            required
            label="UF"
            type="text"
            name="uf"
            value={formData.endereco.uf}
            onChange={handleEnderecoChange}
          />
          <TextField
            label="Complemento"
            type="text"
            name="complemento"
            value={formData.endereco.complemento}
            onChange={handleEnderecoChange}
          />
        </div>

        {formData.telefones.map((telefone, index) => (
          <div key={index} className="campo">
            <h4>Telefone: </h4>
            <TextField
              fullWidth
              required
              label="Numero"
              placeholder="Ensira seu numero de telefone"
              type="text"
              name="numero"
              value={telefone.numero}
              onChange={(e) => handleTelefoneChange(e, index)}
            />
            <TextField
              required
              label="DDD"
              placeholder="Insira o DDD"
              type="text"
              name="ddd"
              value={telefone.ddd}
              onChange={(e) => handleTelefoneChange(e, index)}
            />
            <TextField
              required
              label="Tipo"
              placeholder="Insira o tipo (ex: celular, fixo)"
              type="text"
              name="tipo"
              value={telefone.tipo}
              onChange={(e) => handleTelefoneChange(e, index)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddTelefone}>
          Adicionar Telefone
        </button>
        {formData.emails.map((email, index) => (
          <div key={index} className="campo">
            <h4>Email:</h4>
            <TextField
              fullWidth
              type="text"
              label="Email"
              name="email"
              value={email.email}
              onChange={(e) => handleEmailChange(e, email.id)}
            />
            {formData.emails.length > 1 && (
              <Button
                variant="outlined"
                endIcon={<DeleteIcon />}
                onClick={() => handleDeleteEmail(email.id)}
              >
                Excluir
              </Button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddEmail}>
          Adicionar Email
        </button>

        <Button variant="contained" type="submit" endIcon={<SendIcon />}>
          Enviar
        </Button>
      </form>
    </>
  );
};

export default Formulario;
