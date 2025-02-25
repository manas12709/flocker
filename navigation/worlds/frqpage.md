---
layout: post 
search_exclude: true
show_reading_time: false
permalink: /prism/frqpage
---

<header class="heading">
    <h1>Daily Free Response Question</h1>
    <p>Enjoy writing your answer! We have plenty of topics to choose from!</p>
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

<div id="postIdDisplay" style="display: none; margin-top: 20px; background-color: #2c3e50; color: #ecf0f1; padding: 15px; border-radius: 5px; border: 1px solid #c0392b;"></div>

<script type="module">
        async function sendToGeminiAPI(topic) {
        const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDys2Y58wdsK-P1hr3ayHoAjt7MjTrBtkw";
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

            // Dynamically display the Post ID on the page
            const postIdDisplay = document.getElementById('postIdDisplay');
            postIdDisplay.innerHTML = `
            <p>Your post was successfully created! Thank you for playing our game on Prism!</p>
            <p><strong>Here is your Post ID if you would like to change/edit/delete your answer - Post ID:</strong> ${result.id}</p>
        `;
postIdDisplay.style.display = 'block'; // Ensure it's visible

// Reset the form after submission
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

<div class="form-container crud-container">
    <h2>Manage Posts</h2>

    <!-- Post Cards Section with Edit & Delete Buttons -->
    <div class="crud-section post-list-container">
        <h3>All Posts</h3>
        <div id="postList" class="post-card-container">
            <!-- Posts will be dynamically populated here -->
        </div>
    </div>
</div>

<script type="module">
    import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

    // Fetch and Display All Posts Automatically
    async function fetchPosts() {
        const postList = document.getElementById('postList');
        postList.innerHTML = '';

        try {
            const response = await fetch(`${pythonURI}/api/posts`, fetchOptions);
            if (!response.ok) throw new Error('Failed to fetch posts');

            const posts = await response.json();
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post-card';
                postElement.innerHTML = `
                    <div class="post-content">
                        <h4>${post.title}</h4>
                        <p>${post.comment}</p>
                        <p><strong>Channel:</strong> ${post.channel_name || 'Unknown'}</p>
                        <p><strong>User:</strong> ${post.user_name || 'Unknown'}</p>
                    </div>
                    <div class="post-actions">
                        <button class="edit-button" data-id="${post.id}" data-comment="${post.comment}">Edit</button>
                        <button class="delete-button" data-id="${post.id}">Delete</button>
                    </div>
                `;
                postList.appendChild(postElement);
            });

            // Attach event listeners to Edit and Delete buttons
            attachEditDeleteListeners();
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    // Attach event listeners to dynamically added Edit and Delete buttons
    function attachEditDeleteListeners() {
        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', function () {
                const postId = this.dataset.id;
                const comment = this.dataset.comment;
                const newComment = prompt('Edit your comment:', comment);
                if (newComment !== null) {
                    updatePost(postId, newComment);
                }
            });
        });

        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', function () {
                const postId = this.dataset.id;
                if (confirm('Are you sure you want to delete this post?')) {
                    deletePost(postId);
                }
            });
        });
    }

    // Update Post Function
    async function updatePost(postId, comment) {
        try {
            const response = await fetch(`${pythonURI}/api/post`, {
                ...fetchOptions,
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: postId, comment })
            });
            if (!response.ok) throw new Error('Failed to update post');
            alert('Post updated successfully!');
            fetchPosts(); // Refresh posts list
        } catch (error) {
            console.error('Error updating post:', error);
        }
    }

    // Delete Post Function
    async function deletePost(postId) {
        try {
            const response = await fetch(`${pythonURI}/api/post`, {
                ...fetchOptions,
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: postId })
            });
            if (!response.ok) throw new Error('Failed to delete post');
            alert('Post deleted successfully!');
            fetchPosts(); // Refresh posts list
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    }

    // Fetch posts when the page loads
    document.addEventListener('DOMContentLoaded', fetchPosts);
</script>


