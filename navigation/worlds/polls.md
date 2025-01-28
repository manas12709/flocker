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
        border: 1px rgb(95, 95, 95);
        width: 100%;
        background-color: #34495e;
        color: #ecf0f1;
    }

    .form-container button {
        padding: 15px;
        border-radius: 5px;
        border: none;
        background-color:rgb(95, 95, 95); /* Red button */
        color: #ecf0f1;
        cursor: pointer;
        font-size: 18px;
    }

    .form-container button:hover {
        background-color:rgb(95, 95, 95); /* Darker red on hover */
    }

    /* Color for 'Select Group and Channel' container */
    .form-container.group-channel-container {
        background-color:rgb(95, 95, 95); /* Dark Red color */
    }

    /* Color for 'Submit Your Answer Here' container */
    .form-container.submit-answer-container {
        background-color: rgb(95, 95, 95); /* Lighter Red color */
    }
</style>

<header class="poll-header">
    Quick Polls
</header>
<p class="poll-subtitle">Your voice, your community</p>
<center>
<div class="form-container submit-answer-container">
    <h2 style="text-align: center;">Submit Your Answer Here</h2>
    <form id="pollForm">
        <label for="name">What is your name?</label>
        <input type="text" id="name" name="name" placeholder="Enter your name" required>

        <label for="interests">What are your interests?</label>
        <input type="text" id="interests" name="interests" placeholder="Enter your interests" required>

        <button type="submit">Submit</button>
    </form>
</div>
</center>

<script>
    document.getElementById('pollForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const interests = document.getElementById('interests').value;

        const payload = {
            name: name,
            interests: interests
        };

        fetch('http://localhost:8887/api/poll', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // alert('Your poll response has been submitted!');
            document.getElementById('pollForm').reset();
            location.reload();
        })
        .catch(error => console.error('Error:', error));
    });
</script>

<center>
<div class="form-container submit-answer-container">
    <form id="updatePollForm" onsubmit="event.preventDefault(); updatePoll();" style="margin-bottom: 20px;">
        <label style="color: white;">Update Poll</label><br>
        <input type="text" id="updatePollId" placeholder="Poll ID"><br>
        <input type="text" id="updatePollName" placeholder="Name"><br>
        <input type="text" id="updatePollInterests" placeholder="Interests"><br>
        <button type="submit" style="background-color: red; color: white; width: 100%; margin-top: 15px; border: none; font-size: 18px; padding: 15px;">Update</button>
    </form>
</div>

<div class="form-container submit-answer-container">
    <form id="deletePollForm" onsubmit="event.preventDefault(); deletePoll();" style="margin-bottom: 20px;">
        <label style="color: white;">Delete Poll</label><br>
        <input type="text" id="deletePollId" placeholder="Poll ID"><br>
        <button type="submit" style="background-color: red; color: white; width: 100%; margin-top: 15px; border: none; font-size: 18px; padding: 15px;">Delete</button>
    </form>
</div>
</center>

<script>
function updatePoll() {
  const id = document.getElementById('updatePollId').value;
  const name = document.getElementById('updatePollName').value;
  const interests = document.getElementById('updatePollInterests').value;
  fetch('http://localhost:8887/api/poll', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name, interests })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    location.reload();
  });
}

function deletePoll() {
  const id = document.getElementById('deletePollId').value;
  fetch('http://localhost:8887/api/poll', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    location.reload();
  });
}
</script>

<center><h2>Poll Results</h2></center>
<br>

<center>
<table class="submit-answer-container">
    <thead>
        <tr>
            <th>Name</th>
            <th>Result</th>
        </tr>
    </thead>
    <tbody id="poll-data">
        <!-- Data will be dynamically inserted here -->
    </tbody>
</table>
</center>

<div id="dataOutput"></div>

<script>
    // Define the API endpoint
    const apiEndpoint = 'http://localhost:8887/api/poll';

// Send GET request
fetch(apiEndpoint)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    // Get the tbody element
    const pollData = document.getElementById('poll-data');
    
    // Clear any existing content in the tbody
    pollData.innerHTML = '';

    // Iterate through the data and create rows for each item
    data.forEach(item => {
      const row = document.createElement('tr');

      const nameCell = document.createElement('td');
      nameCell.textContent = item.name;

      const interestsCell = document.createElement('td');
      interestsCell.textContent = item.interests;

      row.appendChild(nameCell);
      row.appendChild(interestsCell);

      pollData.appendChild(row);
    });
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
</script>