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
</style>

<header class="poll-header">
    Quick Polls
</header>
<p class="poll-subtitle">Your voice, your community</p>

<div class="main">
    <p class="poll-question">What is your favorite genre of music?</p>
    <div class="poll-options">
        <button class="poll-option" onclick="handlePollSelection('Jazz')">Jazz</button>
        <button class="poll-option" onclick="handlePollSelection('R&B')">R&amp;B</button>
        <button class="poll-option" onclick="handlePollSelection('Classical')">Classical</button>
        <button class="poll-option" onclick="handlePollSelection('Rap')">Rap</button>
    </div>
</div>

<script>
    function handlePollSelection(option) {
        alert('You selected: ' + option);
        fetch('/api/polls', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ choice: option })
        }).then(response => {
            if (response.ok) {
                console.log('Poll response recorded successfully.');
            } else {
                console.error('Failed to record poll response.');
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    }
</script>
