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
    <h2 style="color: white;">Submit Your Answer Here</h2>
    <form id="postForm">
        <label for="title" style="color: white;">Title:</label>
        <input type="text" id="title" name="title" value="What is your favorite genre of music?" readonly>

        <label for="comment" style="color: white;">Choose Your Answer:</label>
        <div class="poll-options" style="width: 100%;">
            <label class="poll-option" style="background-color: rgb(80, 80, 80); color: white; width: 100%; display: block; padding: 15px; text-align: center; cursor: pointer;">
                <input type="radio" name="comment" value="Jazz" required style="display: none;"> Jazz
            </label>
            <label class="poll-option" style="background-color: rgb(80, 80, 80); color: white; width: 100%; display: block; padding: 15px; text-align: center; cursor: pointer;">
                <input type="radio" name="comment" value="R&B" style="display: none;"> R&amp;B
            </label>
            <label class="poll-option" style="background-color: rgb(80, 80, 80); color: white; width: 100%; display: block; padding: 15px; text-align: center; cursor: pointer;">
                <input type="radio" name="comment" value="Classical" style="display: none;"> Classical
            </label>
            <label class="poll-option" style="background-color: rgb(80, 80, 80); color: white; width: 100%; display: block; padding: 15px; text-align: center; cursor: pointer;">
                <input type="radio" name="comment" value="Rap" style="display: none;"> Rap
            </label>
        </div>
        <button type="submit" style="background-color: red; color: white; width: 100%; margin-top: 15px; border: none; font-size: 18px; padding: 15px;">
            Submit Poll
        </button>
    </form>
</div>
</center>

<br>
<center><a href="/prism_frontend/prism/pollresults">See Poll Results</a></center>
