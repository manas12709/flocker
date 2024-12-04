---
layout: post 
title: Worlds
show_reading_time: false
search_exclude: true
permalink: /prism/polls
---

<title>Quick Polls</title>
<style>
    body {
        margin: 0;
        font-family: Arial, sans-serif;
        background-color: #000;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        flex-direction: column;
    }
    .header {
        width: 100%;
        background-color: #ff0000;
        text-align: center;
        padding: 20px;
    }
    .header h1 {
        margin: 0;
        font-size: 2em;
    }
    .header p {
        margin: 0;
        font-size: 1em;
    }
    .poll-container {
        background-color: #111;
        padding: 40px;
        border-radius: 10px;
        width: 400px;
        box-shadow: 0 0 20px rgba(255, 0, 0, 0.2);
    }
    .poll-container h2 {
        text-align: center;
        color: #ff0000;
    }
    .option {
        background-color: #222;
        color: #ff0000;
        padding: 15px;
        margin: 10px 0;
        border: none;
        text-align: left;
        width: 100%;
        font-size: 1em;
        border-radius: 5px;
        cursor: pointer;
    }
    .option:hover {
        background-color: #333;
    }
    .footer {
        margin-top: 30px;
        color: #666;
        font-size: 0.9em;
    }
</style>
<body>
    <div class="header">
        <h1>Quick Polls</h1>
        <p>Your voice, your community</p>
    </div>
    <div class="poll-container">
        <h2>What is your favorite genre of music?</h2>
        <button class="option">Jazz</button>
        <button class="option">R&amp;B</button>
        <button class="option">Classical</button>
        <button class="option">Rap</button>
    </div>
    <div class="footer">
        &copy; 2024 Prism. All rights reserved.
    </div>
</body>