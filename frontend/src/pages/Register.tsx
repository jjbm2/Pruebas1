import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://neurosalud.onrender.com";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Usuario registrado exitosamente.");
        navigate("/login");
      } else {
        setMessage(data.message || "Error al registrar usuario");
      }
    } catch (error) {
      setMessage("Error al conectar con el servidor");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-500 to-teal-600 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-teal-700 mb-6">Registro</h1>
        <form onSubmit={handleRegister} className="space-y-6">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
            required
          />
          <button type="submit" className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition">
            Registrar
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
}

export default Register;
