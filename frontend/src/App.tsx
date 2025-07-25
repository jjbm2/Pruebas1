import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Symptoms from "./pages/Symptoms";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/symptoms" element={<Symptoms />} />
        <Route path="*" element={<h1 className="text-center mt-10 text-2xl font-bold">404 - Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
