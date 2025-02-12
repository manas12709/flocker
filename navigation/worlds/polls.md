---
layout: post
title: Worlds
show_reading_time: false
search_exclude: true
permalink: /prism/polls
---

<style>
    body {
        margin: 0;
        font-family: Arial, sans-serif;
        background-color: black;
        color: white;
    }

    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 30px;
    }

    .poll-header {
        background-color: red;
        text-align: center;
        padding: 20px;
        margin-bottom: 20px;
        border-radius: 15px;
        font-size: 24px;
        font-weight: bold;
    }

    .poll-subtitle {
        font-size: 16px;
        color: #ddd;
        margin-top: -10px;
        text-align: center;
    }

    .poll-question {
        color: red;
        font-size: 24px;
        text-align: center;
        margin-bottom: 20px;
    }

    .poll-options {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 60%;
    }

    .poll-option {
        background-color: #666 !important;
        color: white;
        padding: 15px;
        margin: 10px 0;
        border: none;
        text-align: center;
        width: 100%;
        font-size: 18px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .poll-option:hover {
        background-color: #555 !important;
    }

    .poll-option:active {
        background-color: #333 !important;
    }

    footer {
        margin-top: 20px;
        font-size: 12px;
        color: #aaa;
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
        margin-bottom: 40px;
        /* Increased margin between containers */
    }

    .form-container label {
        margin-bottom: 10px;
        font-size: 18px;
    }

    .form-container input,
    .form-container textarea,
    .form-container select {
        margin-bottom: 20px;
        /* Increased margin for spacing */
        padding: 15px;
        border-radius: 5px;
        border: 1px rgb(95, 95, 95);
        width: 100%;
        background-color: #34495e;
        color: #ecf0f1;
    }

    .form-container button {
        padding: 15px;
        border-radius: 5px;
        border: none;
        background-color: rgb(95, 95, 95);
        color: #ecf0f1;
        cursor: pointer;
        font-size: 18px;
    }

    .form-container button:hover {
        background-color: rgb(95, 95, 95);
    }

    .form-container.group-channel-container {
        background-color: rgb(95, 95, 95);
    }

    .form-container.submit-answer-container {
        background-color: rgb(95, 95, 95);
    }
</style>

<script type="module">
    import { pythonURI, fetchOptions } from "{{site.baseurl}}/assets/js/api/config.js";

    async function checkAuthorization() {
        try {
            const response = await fetch(`${pythonURI}/api/id`, fetchOptions);

            if (response.status === 401) {
                window.location.href = "{{site.baseurl}}/login";
            } else if (response.ok) {
                const contentElements = document.querySelectorAll('.content');
                contentElements.forEach(element => {
                    element.style.display = "block";
                });
            }
        } catch (error) {
            console.error("Authorization check failed:", error);
            window.location.href = "{{site.baseurl}}/login";
        }
    }

    checkAuthorization();
</script>

<header class="poll-header">
    Quick Polls
</header>
<p class="poll-subtitle">Your voice, your community</p>

<center>
    <div class="form-container submit-answer-container">
        <h2 style="text-align: center;">Submit Your Answer Here</h2>
        <form id="pollForm" onsubmit="event.preventDefault(); addPoll();">
            <label for="name">What is your name?</label>
            <input type="text" id="addPollName" name="name" placeholder="Enter your name" required>

            <label for="interests">What are your interests?</label>
            <input type="text" id="addPollInterests" name="interests" placeholder="Enter your interests" required>

            <button type="submit">Submit</button>
        </form>
    </div>
</center>

<script type="module">
    import { pythonURI, fetchOptions } from "{{site.baseurl}}/assets/js/api/config.js";

    window.addPoll = async function addPoll() {
        const name = document.getElementById('addPollName').value;
        const interests = document.getElementById('addPollInterests').value;
        const payload = { name, interests };

        try {
            const response = await fetch(`${pythonURI}/api/poll`, {
                ...fetchOptions,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            console.log('Poll updated:', data);
            location.reload();
        } catch (error) {
            console.error('Error updating poll:', error);
        }
    }
</script>

<center>
    <div class="form-container submit-answer-container">
        <form id="updatePollForm" onsubmit="event.preventDefault(); updatePoll();" style="margin-bottom: 20px;">
            <label style="color: white;">Update Poll</label><br>
            <input type="text" id="updatePollId" placeholder="Poll ID"><br>
            <input type="text" id="updatePollName" placeholder="Name"><br>
            <input type="text" id="updatePollInterests" placeholder="Interests"><br>
            <button type="submit"
                style="background-color: red; color: white; width: 100%; margin-top: 15px; border: none; font-size: 18px; padding: 15px;">
                Update
            </button>
        </form>
    </div>

    <!-- <div class="form-container submit-answer-container">
        <form id="deletePollForm" onsubmit="event.preventDefault(); deletePollForm();" style="margin-bottom: 20px;">
            <label style="color: white;">Delete Poll</label><br>
            <input type="text" id="deletePollId" placeholder="Poll ID"><br>
            <button type="submit"
                style="background-color: red; color: white; width: 100%; margin-top: 15px; border: none; font-size: 18px; padding: 15px;">
                Delete
            </button>
        </form>
    </div> -->
</center>

<script type="module">
    import { pythonURI, fetchOptions } from "{{site.baseurl}}/assets/js/api/config.js";

    // Reuse the same function, but allow passing an ID directly
    // (for the table-based delete button)
    window.deletePollById = async function(id) {
        const payload = { id };
        try {
            const response = await fetch(`${pythonURI}/api/poll`, {
                ...fetchOptions,
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            console.log(data);
            location.reload();
        } catch (error) {
            console.error('Error deleting poll:', error);
        }
    }

    // This function is used by the form where the user enters the poll ID manually
    window.deletePollForm = function() {
        const id = document.getElementById('deletePollId').value;
        window.deletePollById(id);
    }

    window.updatePoll = async function updatePoll() {
        const id = document.getElementById('updatePollId').value;
        const name = document.getElementById('updatePollName').value;
        const interests = document.getElementById('updatePollInterests').value;
        const payload = { id, name, interests };

        try {
            const response = await fetch(`${pythonURI}/api/poll`, {
                ...fetchOptions,
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            console.log('Poll updated:', data);
            location.reload();
        } catch (error) {
            console.error('Error updating poll:', error);
        }
    }

    // Make sure we can load existing poll data
    try {
        const response = await fetch(`${pythonURI}/api/poll`, fetchOptions);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
</script>

<center>
    <h2>Poll Results</h2>
</center>
<br>

<center>
    <!-- We add a third column for 'Actions' (the Delete button) -->
    <table class="submit-answer-container">
        <thead>
            <tr>
                <th>Name</th>
                <th>Result</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody id="poll-data">
            <!-- Data will be dynamically inserted here -->
        </tbody>
    </table>
</center>

<div id="dataOutput"></div>

<script type="module">
    import { pythonURI, fetchOptions } from "{{site.baseurl}}/assets/js/api/config.js";

    // Fetch poll data and populate the table
    try {
        var response = await fetch(`${pythonURI}/api/poll`, fetchOptions);
        var data = await response.json();

        const pollData = document.getElementById('poll-data');
        pollData.innerHTML = '';

        data.forEach(item => {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = item.name;

            const interestsCell = document.createElement('td');
            interestsCell.textContent = item.interests;

            // Create the Delete button in its own cell
            const deleteCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.style.backgroundColor = 'red';
            deleteButton.style.color = 'white';
            deleteButton.style.border = 'none';
            deleteButton.style.padding = '8px 12px';
            deleteButton.style.cursor = 'pointer';
            deleteButton.onclick = function() {
                // Call our delete function with the poll's ID
                window.deletePollById(item.id);
            };
            deleteCell.appendChild(deleteButton);

            row.appendChild(nameCell);
            row.appendChild(interestsCell);
            row.appendChild(deleteCell);
            pollData.appendChild(row);
        });
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
</script>