import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ClientesTable.css"; //

const Tabela = () => {
  const [clientes, setClientes] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:8080/clientes/listar")
        .then((response) => setClientes(response.data))
        .catch((error) =>
          console.error("Erro ao buscar clientes da API:", error)
        );
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectCliente = (cliente) => {
    setSelectedCliente(cliente);
  };

  const handleDeleteCliente = () => {
    if (!selectedCliente) return;
    axios
      .delete(`http://localhost:8080/clientes/deletar/${selectedCliente.id}`)
      .then(() => {
        setClientes(
          clientes.filter((cliente) => cliente.id !== selectedCliente.id)
        );
        alert(`Cliente ${selectedCliente.nome} removido!`);
        setSelectedCliente(null);
      })
      .catch((error) => alert("Erro ao deletar cliente:", error));
  };

  const handleAlterarCliente = () => {
    // Lógica para alterar os dados do cliente selecionado
  };

  return (
    <div className="clientes-table-container">
      <table className="clientes-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nome.toString()}</td>
              <td>{cliente.cpf}</td>
              <td>
                {cliente.endereco.logradouro}, {cliente.endereco.bairro},{" "}
                {cliente.endereco.cidade} - {cliente.endereco.uf}
              </td>
              <td>
                {cliente.telefones
                  .map((tel) => `${tel.ddd} ${tel.numero}`)
                  .join(", ")}
              </td>
              <td>{cliente.emails[0].email}</td>
              <td>
                <button
                  className="select-button"
                  onClick={() => handleSelectCliente(cliente)}
                >
                  Selecionar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCliente && (
        <div className="selected-cliente">
          <h2>Cliente Selecionado:</h2>
          <p>Nome: {selectedCliente.nome}</p>
          <p>CPF: {selectedCliente.cpf}</p>
          <p>
            Endereço: {selectedCliente.endereco.logradouro},{" "}
            {selectedCliente.endereco.bairro}, {selectedCliente.endereco.cidade}{" "}
            - {selectedCliente.endereco.uf}
          </p>
          <p>
            Telefones:{" "}
            {selectedCliente.telefones
              .map(
                (tel) =>
                  ` ${tel.telefone_tipo}: (${tel.ddd})  ${tel.numero}`
              )
              .join("/  ")}
          </p>
          <p>Email: {selectedCliente.emails[0].email}</p>
          <p>CEP: {selectedCliente.endereco.cep}</p>
          <button onClick={handleDeleteCliente}>Deletar Cliente</button>
          <button onClick={handleAlterarCliente}>Alterar Dados</button>
        </div>
      )}
    </div>
  );
};

export default Tabela;
