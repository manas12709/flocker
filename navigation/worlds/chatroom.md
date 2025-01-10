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
    let selectedChannelId = null;
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
        const postData = {
            title: "Comment on Random Discussion",
            comment: message,
            channel_id: selectedChannelId,
        };
        try {
            // Send POST request to backend, purpose is to write to database
            const response = await fetch(`${pythonURI}/api/post`, {
                ...fetchOptions,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            if (!response.ok) {
                throw new Error('Failed to add post: ' + response.statusText);
            }
            // Successful post
            const result = await response.json();
            document.getElementById('postForm').reset();
        } catch (error) {
            // Present alert on error from backend
            console.error('Error adding post:', error);
        }
    }
    window.sendMessage = sendMessage;
    async function sendToGeminiAPI(interest1, interest2) {
        const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=ADDKEYHEREBEFORESHOWING";
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
    async function fetchGroups() {
        try {
            const response = await fetch(`${pythonURI}/api/groups/filter`, {
                ...fetchOptions,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ section_name: "Prism" }) // Adjust the section name as needed
            });
            if (!response.ok) {
                throw new Error('Failed to fetch groups: ' + response.statusText);
            }
            const groups = await response.json();
            const groupSelect = document.getElementById('group_id');
            groups.forEach(group => {
                const option = document.createElement('option');
                option.value = group.name; // Use group name for payload
                option.textContent = group.name;
                groupSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    }
    async function fetchChannels(groupName) {
        try {
            const response = await fetch(`${pythonURI}/api/channels/filter`, {
                ...fetchOptions,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ group_name: groupName })
            });
            if (!response.ok) {
                throw new Error('Failed to fetch channels: ' + response.statusText);
            }
            const channels = await response.json();
            const channelSelect = document.getElementById('channel_id');
            channelSelect.innerHTML = '<option value="">Select a channel</option>'; // Reset channels
            channels.forEach(channel => {
                const option = document.createElement('option');
                option.value = channel.id;
                option.textContent = channel.name;
                channelSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching channels:', error);
        }
    }
    document.getElementById('group_id').addEventListener('change', function() {
        const groupName = this.value;
        if (groupName) {
            fetchChannels(groupName);
        } else {
            document.getElementById('channel_id').innerHTML = '<option value="">Select a channel</option>'; // Reset channels
        }
    });
    /**
     * Handle form submission for selection
     * Select Button: Computer fetches and displays posts
     */
    document.getElementById('selectionForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const groupId = document.getElementById('group_id').value;
        const channelId = document.getElementById('channel_id').value;
        selectedChannelId = document.getElementById('channel_id').value;
        if (groupId && channelId) {
            fetchData(channelId);
        } else {
            alert('Please select both group and channel.');
        }
    });
    async function displayCurrentInterests() {
        try {
            const response = await fetch(pythonURI + "/api/user", fetchOptions);
            const userData = await response.json();
            if (userData.interests) {
                const formattedInterests = userData.interests.split(',').map(i => i.trim()).filter(i => i).join(', ');
                const interestList = formattedInterests.split(", ")
                console.log(interestList[0])
                document.getElementById('interest1').innerText = `Interest 1: ${interestList[0]}`;
                document.getElementById('interest2').innerText = `Interest 2: ${interestList[1]}`;
            }
        } catch (error) {
            console.error('Error fetching current interests:', error);
        }
    }
    async function fetchData(channelId) {
        try {
            const response = await fetch(`${pythonURI}/api/posts/filter`, {
                ...fetchOptions,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ channel_id: selectedChannelId })
            });
            if (!response.ok) {
                throw new Error('Failed to fetch posts: ' + response.statusText);
            }
            // Parse the JSON data
            const postData = await response.json();
            // Target the chatbox
            const chatBox = document.getElementById('chatBox');
            chatBox.innerHTML = ''; 
            postData.forEach(postItem => {
                const messageElement = document.createElement('div');
                messageElement.className = 'chat-message';
                messageElement.innerHTML = `
                    <p><strong>${postItem.comment}</strong></p>
                `;
                chatBox.appendChild(messageElement);
            });
            // Auto-scroll to the bottom
            chatBox.scrollTop = chatBox.scrollHeight;
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to load chat messages.');
        }
    }
    window.updateAIQuestionAndCreateChannel = updateAIQuestionAndCreateChannel;
    fetchGroups();
    displayCurrentInterests()
</script>
<div class="main">
    <div class="interests">
        <div id="interest1"></div>
        <div id="interest2"></div>
    </div>
    <div class="chat-container">
    <h2>
        <span class="ai-text">AI Generated Prompt</span><br>
        <span id="aiQuestion">What are your opinions on the Engines of F1 Cars?</span>
    </h2>
    <button 
    onclick="updateAIQuestionAndCreateChannel(
        document.getElementById('interest1').textContent, 
        document.getElementById('interest2').textContent
    )"
>Generate New Question & Create Channel</button>
    <div class="form-container">
            <h2>Select Group and Channel</h2>
            <form id="selectionForm">
                <label for="group_id">Group:</label>
                <select id="group_id" name="group_id" required>
                    <option value="">Select a group</option>
                </select>
                <label for="channel_id">Channel:</label>
                <select id="channel_id" name="channel_id" required>
                    <option value="">Select a channel</option>
                </select>
                <button type="submit">Select</button>
            </form>
        </div>
    <div id="chatBox"></div>
    <div class="message-input">
        <input type="text" id="messageInput" placeholder="Send a Message">
        <button onclick="sendMessage()">Send</button>
    </div>
</div>
</div>

