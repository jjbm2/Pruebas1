import os
import joblib
from sklearn.ensemble import RandomForestClassifier
import numpy as np

MODEL_PATH = "health_model.pkl"

# Si ya existe el modelo, lo carga
if os.path.exists(MODEL_PATH):
    model = joblib.load(MODEL_PATH)
else:
    model = RandomForestClassifier()
    # Entrenamiento inicial básico
    X = np.array([[36.5, 0], [38.0, 1], [39.5, 1]])
    y = ["Normal", "Posible gripe", "Fiebre alta"]
    model.fit(X, y)
    joblib.dump(model, MODEL_PATH)

def predict_health(features):
    prediction = model.predict([features])[0]

    # Recomendaciones según predicción
    if prediction == "Normal":
        return "Todo parece bien. Mantente hidratado y descansa."
    elif prediction == "Posible gripe":
        return "Posible gripe. Toma líquidos, mantente en reposo y controla la fiebre."
    elif prediction == "Fiebre alta":
        return "Fiebre alta detectada. Busca atención médica lo antes posible."
    else:
        return "Consulta con un profesional de salud."

def train_model(features, label):
    # Simula entrenamiento incremental
    X_new = np.array([features])
    y_new = [label]
    X_old, y_old = np.array([[36.5, 0], [38.0, 1]]), ["Normal", "Posible gripe"]
    X_train = np.vstack([X_old, X_new])
    y_train = y_old + y_new
    model.fit(X_train, y_train)
    joblib.dump(model, MODEL_PATH)
