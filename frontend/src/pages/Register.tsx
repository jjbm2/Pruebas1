import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage("Usuario registrado exitosamente ✅");
      } else {
        setMessage(data.message || "Error en el registro ❌");
      }
    } catch (error) {
      setMessage("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-500">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-96">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Registro
        </h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Registrarse
          </button>
        </form>
        {message && (
          <p className="text-center text-sm mt-4 text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}

export default Register;
