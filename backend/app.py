from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from model import predict_health, train_model

app = Flask(__name__)
CORS(app)
@app.route('/')
def home():
    return "✅ API NeuroSalud funcionando. Endpoints: /login, /register, /predict"

# ✅ Inicializa la BD
def init_db():
    conn = sqlite3.connect('health.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS records (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                temperature REAL,
                cough INTEGER,
                comment TEXT,
                prediction TEXT
                )''')
    c.execute('''CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                password TEXT
                )''')
    conn.commit()
    conn.close()

init_db()

# ✅ Registro de usuario
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"success": False, "message": "Faltan datos"}), 400

    try:
        conn = sqlite3.connect('health.db')
        c = conn.cursor()
        c.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
        conn.commit()
        conn.close()
        return jsonify({"success": True, "message": "Usuario registrado exitosamente"})
    except sqlite3.IntegrityError:
        return jsonify({"success": False, "message": "El usuario ya existe"}), 400

# ✅ Login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    conn = sqlite3.connect('health.db')
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
    user = c.fetchone()
    conn.close()

    if user:
        return jsonify({"success": True})
    return jsonify({"success": False, "message": "Credenciales incorrectas"})

# ✅ Predicción
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        temperature = float(data['temperature'])
        cough = 1 if data['cough'] else 0
        comment = data.get('comment', '')

        # Modelo hace predicción
        prediction = predict_health([temperature, cough])

        # Guardar en BD
        conn = sqlite3.connect('health.db')
        c = conn.cursor()
        c.execute("INSERT INTO records (temperature, cough, comment, prediction) VALUES (?, ?, ?, ?)",
                  (temperature, cough, comment, prediction))
        conn.commit()
        conn.close()

        # Reentrenar modelo
        train_model([temperature, cough], prediction)

        return jsonify({"recommendation": prediction + " ⚠️ Esto es solo una sugerencia. Para un diagnóstico preciso, visita a tu médico."})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
