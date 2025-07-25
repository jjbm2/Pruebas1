import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Symptoms from "./pages/Symptoms";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/symptoms" element={<Symptoms />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
