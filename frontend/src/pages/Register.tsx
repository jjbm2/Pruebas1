import { useState } from "react";

const API_URL = "https://neurosalud.onrender.com";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Usuario registrado exitosamente ✅");
        // Redirige a Login
        setTimeout(() => (window.location.href = "/login"), 1500);
      } else {
        setMessage(data.message || "Error en el registro ❌");
      }
    } catch (error) {
      setMessage("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-500 to-teal-600 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          Registrarse
        </h1>
        <form onSubmit={handleRegister} className="space-y-6">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-900 focus:ring focus:ring-green-300"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-900 focus:ring focus:ring-green-300"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Registrarse
          </button>
        </form>
        {message && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 font-semibold text-center">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
