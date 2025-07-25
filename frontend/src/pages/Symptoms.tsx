import { useState } from "react";

const API_URL = "https://neurosalud.onrender.com";

function Symptoms() {
  const [temperature, setTemperature] = useState("");
  const [cough, setCough] = useState(false);
  const [comment, setComment] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!temperature) {
      alert("Por favor, ingresa la temperatura");
      return;
    }

    setLoading(true);
    setRecommendation("");

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          temperature: parseFloat(temperature),
          cough: cough,
          comment: comment,
        }),
      });

      const data = await response.json();
      if (data.recommendation) {
        setRecommendation(
          `${data.recommendation} ⚠️ Estas son recomendaciones, no un diagnóstico. Consulta a un médico para confirmación.`
        );
      } else {
        setRecommendation("No se pudo generar una recomendación.");
      }
    } catch (error) {
      setRecommendation("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Ingresar Síntomas
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="number"
            placeholder="Temperatura (°C)"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
            required
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={cough}
              onChange={(e) => setCough(e.target.checked)}
              className="h-5 w-5 text-indigo-600"
            />
            <span className="text-gray-700">¿Presenta tos?</span>
          </div>

          <textarea
            placeholder="Comentarios (opcional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
            rows={3}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? "Analizando..." : "Obtener Recomendación"}
          </button>
        </form>

        {recommendation && (
          <div className="mt-6 p-4 bg-green-100 border border-green-200 rounded-lg text-green-700 font-semibold text-center">
            {recommendation}
          </div>
        )}
      </div>
    </div>
  );
}

export default Symptoms;
