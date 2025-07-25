import { useState } from "react";

const API_URL = "https://neurosalud.onrender.com";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Inicio de sesión exitoso ✅");
        // Redirige a Dashboard o Symptoms
        window.location.href = "/symptoms";
      } else {
        setMessage(data.message || "Credenciales incorrectas ❌");
      }
    } catch (error) {
      setMessage("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Iniciar Sesión
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-900 focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-900 focus:ring focus:ring-blue-300"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Ingresar
          </button>
        </form>
        {message && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 font-semibold text-center">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
