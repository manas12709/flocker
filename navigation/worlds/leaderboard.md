---
layout: post
search_exclude: true
show_reading_time: false
permalink: /prism/leaderboard
---

<link rel="stylesheet" href="{{site.baseurl}}/navigation/worlds/style.css">
<script src="{{site.baseurl}}/assets/js/api/leaderboard.js"></script>

<header class="heading">
    <h1>Leaderboard</h1>
    <p>Reflecting Progress 1 Step at a Time.</p>
</header>

<div class="container">
    <h3>Top Posts</h3>
    <table class="leaderboard-table">
        <thead>
            <tr>
                <th>Rank</th>
                <th>Post Title</th>
                <th>Username</th>
                <th>Net Votes</th>
            </tr>
        </thead>
        <tbody id="leaderboard-posts"></tbody>
    </table>

    <h3>Top Interests</h3>
    <table class="leaderboard-table">
        <thead>
            <tr>
                <th>Rank</th>
                <th>Interest</th>
                <th>Count</th>
            </tr>
        </thead>
        <tbody id="leaderboard-interests"></tbody>
    </table>

    <h3>Top Users</h3>
    <table class="leaderboard-table">
        <thead>
            <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Time Spent</th>
            </tr>
        </thead>
        <tbody id="leaderboard-users"></tbody>
    </table>
</div>
