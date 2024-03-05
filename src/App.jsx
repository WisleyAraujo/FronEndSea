
import Login from "./pages/login/Login.jsx";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Clientes  from "./pages/Clientes.jsx";



function App() {
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  const PrivateRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/clientes"
          element={<PrivateRoute element={<Clientes />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
