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
                <th>Post Title</th>
                <th>Username</th>
                <th>Net Votes</th>
            </tr>
        </thead>
        <tbody id="leaderboard-body">
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
                const tbody = document.getElementById('leaderboard-body');
                data.forEach((item, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${item.post_title}</td>
                        <td>${item.username}</td>
                        <td>${item.net_vote_count}</td>
                    `;
                    tbody.appendChild(row);
                });
            });
    });
</script>