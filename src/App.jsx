import Tabela from "./componentes/tabela/Tabela.jsx";
import Formulario from "./componentes/formulario/Formulario.jsx";
import ModalUnstyled from "./componentes/Modal.jsx";
function App() {
  return (
    <>
      <ModalUnstyled>
        <Formulario />
      </ModalUnstyled>
      <Tabela />
    </>
  );
}

export default App;
