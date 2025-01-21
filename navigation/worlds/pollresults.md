---
layout: post 
title: Worlds
show_reading_time: false
search_exclude: true
permalink: /prism/pollresults
---

<style>
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

    .inttable {
        
    }
</style>

<header class="poll-header">
    Poll Results
</header>
<p class="poll-subtitle">Your voice, your community</p>

<center>
<table class="inttable">
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
    const apiEndpoint = 'http://localhost:8887/api/poll_read';

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

