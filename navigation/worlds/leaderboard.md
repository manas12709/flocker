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
        <tbody id="leaderboard-posts">
            <!-- Data will be populated here by JavaScript -->
        </tbody>
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
        <tbody id="leaderboard-interests">
            <!-- Data will be populated here by JavaScript -->
        </tbody>
    </table>

    <h3>Top Users</h3>
    <table class="leaderboard-table">
        <thead>
            <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Engagement</th>
            </tr>
        </thead>
        <tbody id="leaderboard-users">
            <!-- Data will be populated here by JavaScript -->
        </tbody>
    </table>
</div>

<footer class="copyright">
    <p>© 2024 Prism. All rights reserved.</p>
</footer>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        fetch('/api/leaderboard')
            .then(response => response.json())
            .then(data => {
                const postsBody = document.getElementById('leaderboard-posts');
                const interestsBody = document.getElementById('leaderboard-interests');
                const usersBody = document.getElementById('leaderboard-users');

                data.posts.forEach((item, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${item.post_title}</td>
                        <td>${item.username}</td>
                        <td>${item.net_vote_count}</td>
                    `;
                    postsBody.appendChild(row);
                });

                data.top_interests.forEach((item, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${item[0]}</td>
                        <td>${item[1]}</td>
                    `;
                    interestsBody.appendChild(row);
                });

                data.user_engagement.forEach((item, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${item[0]}</td>
                        <td>${item[1]}</td>
                    `;
                    usersBody.appendChild(row);
                });
            });
    });
</script>