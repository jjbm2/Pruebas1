import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function Symptoms() {
  const [temperature, setTemperature] = useState("");
  const [cough, setCough] = useState(false);
  const [comment, setComment] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!temperature) {
      alert("Por favor ingresa la temperatura");
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
          cough,
          comment,
        }),
      });

      const data = await response.json();
      if (data.recommendation) {
        setRecommendation(
          `${data.recommendation} ⚠️ Esto es solo una recomendación, acude a un médico para diagnóstico preciso.`
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-600 to-indigo-500">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-96">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Síntomas
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            placeholder="Temperatura (°C)"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={cough}
              onChange={() => setCough(!cough)}
              className="mr-2"
            />
            <label>¿Presenta tos?</label>
          </div>
          <textarea
            placeholder="Comentario (opcional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border p-3 rounded-lg"
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
          <div className="mt-4 bg-green-100 p-4 rounded-lg text-green-700 font-semibold">
            {recommendation}
          </div>
        )}
      </div>
    </div>
  );
}

export default Symptoms;
