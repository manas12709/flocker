---
layout: post
search_exclude: true
hide: true
show_reading_time: false
---

<style>
  body {
    font-family: sans-serif;
    background: #f2f2f2;
    color: #222;
  }

  #usernameInput {
    padding: 10px;
    font-size: 16px;
    width: 100%;
    margin-bottom: 15px;
    background: #fff;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  .chat-grid {
    display: grid;
    grid-template-columns: 1fr 250px;
    gap: 10px;
    max-width: 960px;
    height: 520px;
    margin: 0 auto;
  }

  .chat-area {
    background: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }

  #messages {
    flex-grow: 1;
    overflow-y: auto;
    background: #fcfcfc;
    padding: 10px;
    border: 1px solid #eee;
    margin-bottom: 10px;
    font-size: 14px;
    color: #000;
  }

  #msgInput {
    padding: 10px;
    font-size: 14px;
    margin-bottom: 8px;
    width: 100%;
    border: 1px solid #ccc;
    background: #fff;
    color: #000;
  }

  #sendBtn {
    padding: 10px;
    font-size: 14px;
    background-color: #28a745;
    color: white;
    border: none;
    width: 100%;
    cursor: pointer;
  }

  .channel-sidebar {
    background: #f9f9f9;
    border: 1px solid #ccc;
    padding: 10px;
    height: 100%;
    box-sizing: border-box;
  }

  .channel-button {
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 5px;
    background: #007BFF;
    color: white;
    border: none;
    font-size: 14px;
    cursor: pointer;
  }

  .channel-button:hover {
    background: #0056b3;
  }

  #onlineUsers {
    font-size: 13px;
    padding-left: 15px;
    margin-top: 10px;
    background-color: #ffffff !important;
    color: #111 !important;
    list-style: disc;
  }

  #onlineUsers li {
    color: #111 !important;
    background: transparent !important;
    margin-bottom: 4px;
  }

  @media (max-width: 768px) {
    .chat-grid {
      grid-template-columns: 1fr;
      height: auto;
    }

    .channel-sidebar {
      margin-top: 15px;
    }
  }
</style>

<input id="usernameInput" placeholder="Enter your name..." />

<div class="chat-grid">
  <div class="chat-area">
    <div id="messages"></div>
    <input id="msgInput" placeholder="Type your message..." />
    <button id="sendBtn" onclick="sendMessage()">Send</button>
  </div>
  <div class="channel-sidebar">
    <strong>Channels</strong><br>
    <button class="channel-button" onclick="joinChannel('general')"># general</button>
    <button class="channel-button" onclick="joinChannel('tech')"># tech</button>
    <button class="channel-button" onclick="joinChannel('random')"># random</button>
    <button class="channel-button" onclick="joinChannel('help')"># help</button>

<br><span style="color: #111; font-weight: bold;">🟢 Online Users</span>
    <ul id="onlineUsers"></ul>
  </div>
</div>

<script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
<script>
  const socket = io("http://localhost:8505");
  let username = "";
  let currentRoom = "";

  document.getElementById("usernameInput").addEventListener("change", function () {
    username = this.value;
  });

  function joinChannel(room) {
    if (!username) {
      alert("Please enter your name first.");
      return;
    }

    if (currentRoom) {
      socket.emit("leave", { username, room: currentRoom });
    }

    currentRoom = room;
    document.getElementById("messages").innerHTML = "";
    document.getElementById("onlineUsers").innerHTML = "";
    socket.emit("join", { username, room });
  }

  function sendMessage() {
    const msg = document.getElementById("msgInput").value;
    if (msg && currentRoom) {
      socket.emit("send_message", {
        username,
        room: currentRoom,
        msg,
      });
      document.getElementById("msgInput").value = "";
    }
  }

  // ENTER key sends message
  document.getElementById("msgInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  socket.on("message", (data) => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${data.username}</strong>: ${data.msg} <span style="color:#888; font-size: 12px;">(${data.timestamp})</span>`;
    document.getElementById("messages").appendChild(div);
    document.getElementById("messages").scrollTop = messages.scrollHeight;
  });

  socket.on("online_users", (users) => {
    const list = document.getElementById("onlineUsers");
    list.innerHTML = "";
    users.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = user;
      list.appendChild(li);
    });
  });
</script>
