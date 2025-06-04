---
layout: post 
search_exclude: true
show_reading_time: false
permalink: /flockerdoc
title: Flocker Documentation
categories: [Flocker Documentation]
---

# How to Build a WebSocket Chat App  
3 min + read

How to Build a Real-Time Chat App with Flask & Socket.IO  
📁 Step 1: Understand the Project Structure  
🧩 server.py (Backend Logic)  
🧪 index.html (Frontend Chat UI)  
🛠️ Step 2: Set Up the Backend with Socket.IO  
🧩 Step 3: Build the Frontend Interface  
💬 Step 4: Connect the WebSocket Events  
👨‍💻 Best Practices for Real-Time Apps  
✅ Summary Checklist  
Jun 4, 2025

---

## How to Build a Real-Time Chat App with Socket.IO  
This guide helps you create a real-time chat app using Flask-SocketIO for the backend and HTML/JS for the frontend. It supports chat rooms, user tracking, and live message broadcasting.

---

### 📁 Step 1: Understand the Project Structure

You’ll need these key files:

- **server.py** — Flask app with WebSocket logic using `flask_socketio`  
- **index.html** — Frontend interface with HTML, CSS, and JS  
- **style.css** *(optional)* — Custom styling  
- **socket.io** — Used via CDN

Folder layout:

```
chat-app/
│
├── server.py
├── templates/
│   └── index.html
└── static/
    └── style.css
```

---

### 🧩 server.py (Backend Logic)

This handles:

- Connecting users to rooms  
- Broadcasting messages  
- Tracking online users  
- Saving chat history  

Key libraries:  
`flask`, `flask_socketio`, `collections.defaultdict`

Example:
```python
@socketio.on('join')
def handle_join(data):
    # Adds user to room and broadcasts message
```

---

### 🧪 index.html (Frontend UI)

This provides:

- Input for username  
- Buttons to switch rooms  
- Message display area  
- Input for sending messages

Includes:

- `socket.io.min.js` via CDN  
- Clean layout using Flexbox or Grid  
- JavaScript that handles `emit()` and `on()` events

---

### 🛠️ Step 2: Set Up the Backend with Socket.IO

1. **Install dependencies**:
```bash
pip install flask flask-socketio eventlet
```

2. **Create `server.py`**:
```python
from flask import Flask, render_template
from flask_socketio import SocketIO, emit, join_room

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route("/")
def index():
    return render_template("index.html")

@socketio.on('join')
def on_join(data):
    join_room(data['room'])
    emit('message', {'username': 'System', 'msg': f"{data['username']} joined {data['room']}."}, room=data['room'])

@socketio.on('send_message')
def handle_msg(data):
    emit('message', data, room=data['room'])

if __name__ == '__main__':
    socketio.run(app, port=8505, debug=True)
```

---

### 🧩 Step 3: Build the Frontend Interface

Create `templates/index.html`:

- Username input  
- Buttons for channels  
- Message box  
- Display messages from server

Connect via WebSocket:
```js
const socket = io("http://localhost:8505");
socket.emit("join", { username, room });
socket.on("message", (data) => { /* show message */ });
```

---

### 💬 Step 4: Connect the WebSocket Events

You’ll need these events:

| Event             | Sent By   | Purpose                               |
|------------------|-----------|---------------------------------------|
| `'join'`         | Frontend  | User joins a chat room                |
| `'message'`      | Backend   | Broadcast message to all in room      |
| `'send_message'` | Frontend  | Sends user message to server          |
| `'online_users'` | Backend   | *(Optional)* Send list of users       |

---

### 👨‍💻 Best Practices for Real-Time Apps

- **Use unique usernames** to avoid confusion  
- **Keep rooms predefined** like #general or #help  
- **Add timestamps** to every message  
- **Emit only to specific rooms** to avoid leakage  
- **Polish UI** with clear mobile-friendly layout

---

### ✅ Summary Checklist

- [x] Setup `server.py` with Flask-SocketIO  
- [x] Build `index.html` with chat input and buttons  
- [x] Add JS logic to send and receive WebSocket events  
- [x] Define and join rooms using Socket.IO  
- [x] Test switching rooms and real-time messaging  
- [x] Deploy frontend (GitHub Pages) and backend (Render, AWS, etc.)

---

Now you’ve got a real-time chat app—modular, clean, and interactive. With just a few files and WebSocket logic, you can create collaborative tools for your class, community, or club.
