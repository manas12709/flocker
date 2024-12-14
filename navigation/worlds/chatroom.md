---
layout: post 
search_exclude: true
show_reading_time: false
permalink: /prism/topicchatroom
---
<style>
    body {
        margin: 0;
        font-family: Arial, sans-serif;
        background-color: black;
        color: white;
    }

    header.page {
        background-color: red;
        padding: 20px;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        border-radius: 15px;
    }

    .subtitle {
        margin-top: -10px;
        font-size: 16px;
        color: #ddd;
    }

    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 30px;
    }

    .interests {
        display: flex;
        justify-content: space-between;
        width: 60%;
        margin-bottom: 20px;
        font-size: 18px;
    }

    .chat-container {
        background-color: #1a1a1a;
        width: 100%;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
    }

    .chat-container h2 {
        color: red;
        margin-bottom: 20px;
        text-align: center; 
    }

    #chatBox {
        width: 100%; 
        height: 300px;
        background-color: #000;
        color: white;
        border: 1px solid red;
        border-radius: 5px;
        padding: 10px;
        box-sizing: border-box;
        overflow-y: auto;
    }

    .message-input {
        display: flex;
        margin-top: 10px;
    }

    .message-input input {
        flex: 1;
        padding: 10px;
        font-size: 16px;
        border: 1px solid red;
        border-radius: 5px 0 0 5px;
        outline: none;
        background-color: #333;
        color: white;
    }

    .message-input button {
        padding: 10px 20px;
        font-size: 16px;
        border: none;
        background-color: red;
        color: white;
        border-radius: 0 5px 5px 0;
        cursor: pointer;
    }

    .message-input button:hover {
        background-color: darkred;
    }

    footer {
        margin-top: 20px;
        font-size: 12px;
        color: #aaa;
    }

    .ai-text {
        color: white; 
    }
</style>
<header class="page">
    <div class="subtitle">Chat across the world.</div>
</header>
<script type="module">
    import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';
    async function sendMessage() {
        const chatBox = document.getElementById('chatBox');
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();
        if (message) {
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            chatBox.appendChild(messageElement);
            messageInput.value = '';
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }
    async function sendToGeminiAPI(interest1, interest2) {
        const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyByINR_0sZrKsqkMzNSrqmf9kzbtpZ0X0M";
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: `Create a random question to get two people talking based on their interests. For example, if one interest was F1 Cars, and another interest was Engineering, a possible question you could make is "What are your opinions on the Engines of F1 Cars?". The two interests are ${interest1} and ${interest2}. Just include the question, NOTHING else.` }]
                    }]
                })
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Error communicating with Gemini API:', error);
            return "An error occurred while communicating with the AI.";
        }
    }
    async function createChannel(channelName) {
        const groupId = 3; // Replace with the appropriate group_id
        const attributes = {
            description: "Channel created with AI-generated question."
        };
        try {
            const response = await fetch(`${pythonURI}/api/channel`, {
                ...fetchOptions,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: channelName,
                    group_id: groupId,
                    attributes: attributes
                })
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            console.log('Channel created successfully:', data);
        } catch (error) {
            console.error('Error creating channel:', error);
            alert('An error occurred while creating the channel.');
        }
    }
    async function updateAIQuestionAndCreateChannel(interest1, interest2) {
        const aiQuestionElement = document.getElementById('aiQuestion');
        aiQuestionElement.textContent = "Generating question...";
        const newQuestion = await sendToGeminiAPI(interest1, interest2);
        aiQuestionElement.textContent = newQuestion;
        if (newQuestion && newQuestion !== "An error occurred while communicating with the AI.") {
            await createChannel(newQuestion);
        } else {
            alert("Failed to generate a valid question.");
        }
    }
    async function fetchChannelIdByName(channelName) {
        try {
            const response = await fetch(`${pythonURI}/api/channels/filter`, {
                ...fetchOptions,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: channelName }) // Adjust the API request to filter by channel name
            });
            if (!response.ok) {
                throw new Error('Failed to fetch channel: ' + response.statusText);
            }
            const channels = await response.json();
            if (channels.length === 0) {
                console.warn('No channel found with the name:', channelName);
                return null;
            }
            return channels[0].id; // Return the ID of the first matching channel
        } catch (error) {
            console.error('Error fetching channel ID:', error);
            return null;
        }
    }
    window.updateAIQuestionAndCreateChannel = updateAIQuestionAndCreateChannel;

</script>
<div class="main">
    <div class="interests">
        <div>Interest 1: F1</div>
        <div>Interest 2: Engineering</div>
    </div>
    <div class="chat-container">
    <h2>
        <span class="ai-text">AI Generated Prompt</span><br> 
        <span id="aiQuestion">What are your opinions on the Engines of F1 Cars?</span>
    </h2>
    <button onclick="updateAIQuestionAndCreateChannel('F1', 'Engineering')">Generate New Question & Create Channel</button>
    <div id="chatBox"></div>
    <div class="message-input">
        <input type="text" id="messageInput" placeholder="Send a Message">
        <button onclick="sendMessage()">Send</button>
    </div>
</div>
</div>