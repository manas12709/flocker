---
layout: post 
search_exclude: true
show_reading_time: false
permalink: /prism/frqpage
---

<style>
    body {
        margin: 0;
        font-family: Arial, sans-serif;
        background-color: #2c3e50; /* Dark background */
        color: #ecf0f1; /* Light text color */
    }

    header.page {
        background-color: #e74c3c; /* Red header */
        padding: 30px;
        text-align: center;
        font-size: 28px;
        font-weight: bold;
        border-bottom: 4px solid #c0392b;
        margin-bottom: 30px; /* Increased spacing */
    }

    .subtitle {
        margin-top: -10px;
        font-size: 18px;
        color: #fff;
    }

    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .dropdown {
        margin-bottom: 40px; /* Increased margin for spacing */
    }

    select {
        padding: 15px;
        font-size: 18px;
        border: 2px solid #c0392b;
        border-radius: 5px;
        background-color: #34495e; /* Dark grey */
        color: #ecf0f1; /* Light text */
        cursor: pointer;
    }

    .generate-btn {
        padding: 15px 25px;
        font-size: 18px;
        background-color: #c0392b; /* Red button */
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 20px;
    }

    .generate-btn:hover {
        background-color: #e74c3c; /* Lighter red on hover */
    }

    .question-container {
        background-color: #34495e; /* Dark grey */
        width: 80%;
        max-width: 700px;
        padding: 25px;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        text-align: center;
        margin-top: 30px; /* Adjusted margin for space between containers */
    }

    .question-container h2 {
        color: #e74c3c; /* Red color for heading */
        margin-bottom: 30px;
    }

    #questionBox {
        background-color: #2c3e50; /* Dark background for question box */
        color: #ecf0f1; /* Light text color */
        border: 1px solid #c0392b;
        border-radius: 5px;
        padding: 15px;
        box-sizing: border-box;
        min-height: 100px;
    }

    footer {
        margin-top: 50px;
        font-size: 14px;
        color: #7f8c8d;
        text-align: center;
        padding: 20px;
    }

    /* Form container styles */
    .form-container {
        display: flex;
        flex-direction: column;
        max-width: 800px;
        width: 100%;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        margin-bottom: 40px; /* Increased margin between containers */
    }

    .form-container label {
        margin-bottom: 10px;
        font-size: 18px;
    }

    .form-container input,
    .form-container textarea,
    .form-container select {
        margin-bottom: 20px; /* Increased margin for spacing */
        padding: 15px;
        border-radius: 5px;
        border: 1px solid #c0392b;
        width: 100%;
        background-color: #34495e;
        color: #ecf0f1;
    }

    .form-container button {
        padding: 15px;
        border-radius: 5px;
        border: none;
        background-color: #e74c3c; /* Red button */
        color: #ecf0f1;
        cursor: pointer;
        font-size: 18px;
    }

    .form-container button:hover {
        background-color: #c0392b; /* Darker red on hover */
    }

    /* Color for 'Select Group and Channel' container */
    .form-container.group-channel-container {
        background-color: #c0392b; /* Dark Red color */
    }

    /* Color for 'Submit Your Answer Here' container */
    .form-container.submit-answer-container {
        background-color: #e74c3c; /* Lighter Red color */
    }

    /* Modal styles */
    .modal {
        display: none;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.4);
    }

    .modal-content {
        background-color: #fefefe;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 50%;
        text-align: center;
    }

    .close-button {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
    }
</style>

<header class="page">
    Free-Response Question Game
    <div class="subtitle">Select a topic to get a question!</div>
</header>

<div class="main">
    <div class="dropdown">
        <select id="topicSelect">
            <option value="">Select a topic</option>
            <option value="History">History</option>
            <option value="Science">Science</option>
            <option value="Technology">Technology</option>
            <option value="Literature">Literature</option>
        </select>
    </div>

    <button class="generate-btn" onclick="generateQuestion()">Generate Question</button>

    <div class="question-container">
        <h2>Your Question</h2>
        <div id="questionBox">Select a topic and click 'Generate Question' to get started.</div>
    </div>
</div>

<!-- Select Group and Channel Section -->
<div class="form-container group-channel-container">
    <h2>Select Group and Channel</h2>
    <form id="selectionForm">
        <label for="group_id">Group:</label>
        <select id="group_id" name="group_id" required>
            <option value="">Select a group</option>
        </select>
        <label for="channel_id">Channel:</label>
        <select id="channel_id" name="channel_id" required>
            <option value="">Select a Channel</option>
        </select>
        <button type="submit">Select</button>
    </form>
</div>

<!-- Submit Your Answer Section -->
<div class="form-container submit-answer-container">
    <h2>Submit Your Answer Here</h2>
    <form id="postForm">
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" required>
        <label for="comment">Comment:</label>
        <textarea id="comment" name="comment" required></textarea>
        <button type="submit">Send Pitch</button>
    </form>
</div>

<footer class="copyright">
    <p>© 2023 Prism. All rights reserved.</p>
</footer>

<script type="module">
        async function sendToGeminiAPI(topic) {
        const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyB9RKnLkNEhSywJ-KprmzB_qiwweL4FHZs";
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: `Create a thought-proving short free response question prompt for this topic: ${topic}` }]
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

    async function generateQuestion() {
        const topicSelect = document.getElementById('topicSelect');
        const questionBox = document.getElementById('questionBox');
        const selectedTopic = topicSelect.value;

        if (!selectedTopic) {
            questionBox.textContent = "Please select a topic first!";
            return;
        }

        questionBox.textContent = "Generating question...";

        const question = await sendToGeminiAPI(selectedTopic);
        questionBox.textContent = question;
    }

    // Expose the function to the global scope
    window.generateQuestion = generateQuestion;
</script>

<script type="module">
    // Import server URI and standard fetch options
    import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

    /**
     * Fetch groups for dropdown selection
     * User picks from dropdown
     */
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

    /**
     * Fetch channels based on selected group
     * User picks from dropdown
     */
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

    /**
      * Handle group selection change
      * Channel Dropdown refresh to match group_id change
      */
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
        if (groupId && channelId) {
            fetchData(channelId);
        } else {
            alert('Please select both group and channel.');
        }
    });

    /**
     * Handle form submission for adding a post
     * Add Form Button: Computer handles form submission with request
     */
    document.getElementById('postForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        // Extract data from form
        const title = document.getElementById('title').value;
        const comment = document.getElementById('comment').value;
        const channelId = document.getElementById('channel_id').value;

        // Create API payload
        const postData = {
            title: title,
            comment: comment,
            channel_id: channelId
        };

        // Trap errors
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
            alert('Post added successfully!');
            document.getElementById('postForm').reset();
            fetchData(channelId);
        } catch (error) {
            // Present alert on error from backend
            console.error('Error adding post:', error);
            alert('Error adding post: ' + error.message);
        }
    });

    /**
     * Fetch posts based on selected channel
     * Handle response: Fetch and display posts
     */
    async function fetchData(channelId) {
        try {
            const response = await fetch(`${pythonURI}/api/posts/filter`, {
                ...fetchOptions,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ channel_id: channelId })
            });
            if (!response.ok) {
                throw new Error('Failed to fetch posts: ' + response.statusText);
            }

            // Parse the JSON data
            const postData = await response.json();

            // Extract posts count
            const postCount = postData.length || 0;

            // Update the HTML elements with the data
            document.getElementById('count').innerHTML = `<h2>Count ${postCount}</h2>`;

            // Get the details div
            const detailsDiv = document.getElementById('details');
            detailsDiv.innerHTML = ''; // Clear previous posts

            // Iterate over the postData and create HTML elements for each item
            postData.forEach(postItem => {
                const postElement = document.createElement('div');
                postElement.className = 'post-item';
                postElement.innerHTML = `
                    <h3>${postItem.title}</h3>
                    <p><strong>Channel:</strong> ${postItem.channel_name}</p>
                    <p><strong>User:</strong> ${postItem.user_name}</p>
                    <p>${postItem.comment}</p>
                `;
                detailsDiv.appendChild(postElement);
            });

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Fetch groups when the page loads
    fetchGroups();
</script>
