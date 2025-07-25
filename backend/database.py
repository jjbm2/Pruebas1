import sqlite3

def init_db():
    conn = sqlite3.connect('health.db')
    c = conn.cursor()

    # Tabla para síntomas
    c.execute('''CREATE TABLE IF NOT EXISTS records (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                temperature REAL,
                cough INTEGER,
                comment TEXT,
                prediction TEXT,
                user TEXT
                )''')

    # Tabla para usuarios
    c.execute('''CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                password TEXT
                )''')

    conn.commit()
    conn.close()

def add_user(username, password):
    conn = sqlite3.connect('health.db')
    c = conn.cursor()
    try:
        c.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
        conn.commit()
        return True
    except:
        return False
    finally:
        conn.close()

def check_user(username, password):
    conn = sqlite3.connect('health.db')
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
    result = c.fetchone()
    conn.close()
    return result is not None
