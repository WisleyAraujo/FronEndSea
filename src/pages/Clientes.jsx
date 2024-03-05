import Formulario from "./formulario/Formulario.jsx";
import ModalUnstyled from "../componentes/Modal.jsx";
import Tabela from "./tabela/Tabela.jsx";

const Clientes = () => {
  return (
    <>
      <Tabela />
      <ModalUnstyled>
        <Formulario />
      </ModalUnstyled>
    </>
  );
};

export default Clientes;
