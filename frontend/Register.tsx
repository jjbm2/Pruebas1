import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!username || !password || !confirmPassword) {
      setError("Por favor, completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
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
        setSuccess("Usuario registrado correctamente");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setError(data.message || "Error al registrar usuario");
      }
    } catch (err) {
      setError("Error en el servidor");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-400 to-teal-500">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-96 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Crear cuenta en <span className="text-green-600">NeuroSalud</span>
        </h1>
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
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
        <p className="mt-4 text-gray-500">¿Ya tienes cuenta?</p>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg w-full hover:bg-gray-600 transition mt-3"
        >
          Volver al Login
        </button>
      </div>
    </div>
  );
}

export default Register;
