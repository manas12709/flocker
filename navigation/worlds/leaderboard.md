---
layout: post
search_exclude: true
show_reading_time: false
permalink: /prism/leaderboard
---

<!-- Link to Custom CSS and Script -->
<link rel="stylesheet" href="{{site.baseurl}}/navigation/worlds/style.css">
<script src="{{site.baseurl}}/navigation/worlds/script.js"></script>

<header class="heading">
    <h1>Leaderboard</h1>
    <p>Reflecting Progress 1 Step at a Time.</p>
</header>

<div class="container">
    <h2>Hover over the rows to see more details.</h2>

    <table class="leaderboard-table">
        <thead>
            <tr>
                <th>Rank</th>
                <th>Category</th>
                <th>Top Performer</th>
                <th>Statistics</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>Top Interests</td>
                <td>Technology</td>
                <td>1,500+ Users Engaged</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Messages Sent</td>
                <td>Anonymous #123</td>
                <td>5,000 Messages Sent</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Time on Site</td>
                <td>Anonymous #456</td>
                <td>Longest Session: 10 Hours</td>
            </tr>
        </tbody>
    </table>
</div>

<footer class="copyright">
    <p>© 2024 Prism. All rights reserved.</p>
</footer>

<!-- Custom CSS for the Leaderboard -->
<style>
    /* General Styles */
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #000000;
        color: #ffffff;
    }

    .heading {
        text-align: center;
        padding: 20px;
        background-color: #ea0000;
        color: white;
        box-shadow: 0 2px 8px rgba(255, 0, 0, 0.7);
    }

    .container {
        width: 80%;
        margin: 20px auto;
        padding: 20px;
        background: #1a1a1a;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(255, 0, 0, 0.5);
    }

    h2 {
        color: #ffcccc;
        text-align: center;
    }

    /* Table Styles */
    .leaderboard-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
        color: #ffffff;
    }

    .leaderboard-table thead th {
        background-color: #ea0000;
        color: #ffffff;
        padding: 15px;
        text-transform: uppercase;
    }

    .leaderboard-table tbody tr {
        border-bottom: 1px solid #555;
        transition: background-color 0.3s, color 0.3s;
    }

    .leaderboard-table tbody tr:hover {
        background-color: #333333;
        color: #ffcccc;
    }

    .leaderboard-table td {
        padding: 12px;
        text-align: center;
    }

    .leaderboard-table td:first-child {
        font-weight: bold;
    }

    footer {
        text-align: center;
        padding: 15px;
        background-color: #ea0000;
        color: white;
        border-radius: 0 0 8px 8px;
        margin-top: 20px;
    }

    footer p {
        margin: 0;
    }
</style>