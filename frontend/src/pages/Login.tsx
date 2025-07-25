import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://neurosalud.onrender.com";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Por favor, completa todos los campos");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("user", username);
        navigate("/symptoms");
      } else {
        setError(data.message || "Usuario o contraseña incorrectos");
      }
    } catch (err) {
      setError("Error en el servidor");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-96 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Bienvenido a <span className="text-blue-600">NeuroSalud</span>
        </h1>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded-lg p-3 w-full mb-4 focus:ring focus:ring-blue-300"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-lg p-3 w-full mb-4 focus:ring focus:ring-blue-300"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-700 transition"
        >
          Iniciar Sesión
        </button>
        <p className="mt-4 text-gray-500">¿No tienes cuenta?</p>
        <button
          onClick={() => navigate("/register")}
          className="bg-green-500 text-white px-6 py-3 rounded-lg w-full hover:bg-green-600 transition mt-3"
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}

export default Login;
