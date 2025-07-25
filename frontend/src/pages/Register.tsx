import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    if (!username || !password) {
      setError("Por favor, completa todos los campos");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.success) {
        setSuccess("Usuario registrado exitosamente");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setError(data.message || "Error al registrar");
      }
    } catch (err) {
      setError("Error en el servidor");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-500 to-teal-600">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-96 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Registro</h1>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded-lg p-3 w-full mb-4 focus:ring focus:ring-green-300"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-lg p-3 w-full mb-4 focus:ring focus:ring-green-300"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <button
          onClick={handleRegister}
          className="bg-green-600 text-white px-6 py-3 rounded-lg w-full hover:bg-green-700 transition"
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}

export default Register;
