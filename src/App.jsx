import Formulario from "./componentes/formulario/Formulario.jsx";
// import ModalUnstyled from "./componentes/Modal.jsx";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
// import Login from "./componentes/login/Login.jsx";
// import Cadastro from "./componentes/cadastro/Cadastro.jsx";
function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
    </Switch>
  );
}

export default App;
