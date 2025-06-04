---
layout: post
search_exclude: true
hide: true
show_reading_time: false
---

<!-- Page styling -->
<style>
  body {
    font-family: sans-serif;
    background: #f2f2f2;
    color: #222;
  }

  /* Username input field styling */
  #usernameInput {
    padding: 10px;
    font-size: 16px;
    width: 100%;
    margin-bottom: 15px;
    background: #fff;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  /* Grid layout: chat area on left, sidebar on right */
  .chat-grid {
    display: grid;
    grid-template-columns: 1fr 250px;
    gap: 10px;
    max-width: 960px;
    height: 520px;
    margin: 0 auto;
  }

  /* Main chat container */
  .chat-area {
    background: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }

  /* Area where messages are shown */
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

  /* Input field for messages */
  #msgInput {
    padding: 10px;
    font-size: 14px;
    margin-bottom: 8px;
    width: 100%;
    border: 1px solid #ccc;
    background: #fff;
    color: #000;
  }

  /* Send button styling */
  #sendBtn {
    padding: 10px;
    font-size: 14px;
    background-color: #28a745;
    color: white;
    border: none;
    width: 100%;
    cursor: pointer;
  }

  /* Sidebar: channel buttons and user list */
  .channel-sidebar {
    background: #f9f9f9;
    border: 1px solid #ccc;
    padding: 10px;
    height: 100%;
    box-sizing: border-box;
  }

  /* Style for room/channel buttons */
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

  /* Online users list */
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

  /* Responsive layout for smaller screens */
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

<!-- Username input field -->
<input id="usernameInput" placeholder="Enter your name..." />

<!-- Main grid layout: chat + sidebar -->
<div class="chat-grid">
  <!-- Chat area -->
  <div class="chat-area">
    <div id="messages"></div> <!-- Messages appear here -->
    <input id="msgInput" placeholder="Type your message..." /> <!-- Message input -->
    <button id="sendBtn" onclick="sendMessage()">Send</button> <!-- Send button -->
  </div>

  <!-- Sidebar with channel buttons and users list -->
  <div class="channel-sidebar">
    <strong>Channels</strong><br>
    <button class="channel-button" onclick="joinChannel('general')"># general</button>
    <button class="channel-button" onclick="joinChannel('tech')"># tech</button>
    <button class="channel-button" onclick="joinChannel('random')"># random</button>
    <button class="channel-button" onclick="joinChannel('help')"># help</button>
    <br><span style="color: #111; font-weight: bold;">🟢 Online Users</span>
    <ul id="onlineUsers"></ul> <!-- List of online users -->
  </div>
</div>

<!-- Load Socket.IO library -->
<script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
<script>
  // Connect to the Socket.IO server at this URL
  const socket = io("http://localhost:8505");
  // Global state
  let username = "";
  let currentRoom = "";
  // When username is entered
  document.getElementById("usernameInput").addEventListener("change", function () {
    username = this.value;
  });
  // Join a new chat channel
  function joinChannel(room) {
    if (!username) {
      alert("Please enter your name first.");
      return;
    }
    // If already in a room, leave it
    if (currentRoom) {
      socket.emit("leave", { username, room: currentRoom });
    }
    // Set current room and reset messages + user list
    currentRoom = room;
    document.getElementById("messages").innerHTML = "";
    document.getElementById("onlineUsers").innerHTML = "";
    // Notify server of new join
    socket.emit("join", { username, room });
  }
  // Send a message to the server
  function sendMessage() {
    const msg = document.getElementById("msgInput").value;
    if (msg && currentRoom) {
      socket.emit("send_message", {
        username,
        room: currentRoom,
        msg,
      });
      document.getElementById("msgInput").value = ""; // Clear input
    }
  }
  // Pressing ENTER sends message
  document.getElementById("msgInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
  // Display incoming message from server
  socket.on("message", (data) => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${data.username}</strong>: ${data.msg} <span style="color:#888; font-size: 12px;">(${data.timestamp})</span>`;
    document.getElementById("messages").appendChild(div);
    document.getElementById("messages").scrollTop = messages.scrollHeight; // Scroll to latest
  });
  // Update list of online users
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
