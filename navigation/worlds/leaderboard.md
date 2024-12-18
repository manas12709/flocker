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

<script type="module">
    import { pythonURI, fetchOptions } from "{{site.baseurl}}/assets/js/api/config.js";

    async function fetchLeaderboard() {
        try {
            const response = await fetch(`${pythonURI}/api/users`, fetchOptions);
            if (!response.ok) throw new Error("Failed to fetch all users");

            const allUsers = await response.json();
            const interestCounts = {};

            allUsers.forEach(user => {
                user.interests.split(", ").forEach(interest => {
                    interestCounts[interest] = (interestCounts[interest] || 0) + 1;
                });
            });

            const sortedInterests = Object.entries(interestCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3);

            const leaderboardContainer = document.getElementById("leaderboard-interests");
            leaderboardContainer.innerHTML = "";

            sortedInterests.forEach(([interest, count], index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${interest}</td>
                    <td>${count}</td>
                `;
                leaderboardContainer.appendChild(row);
            });
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        fetchLeaderboard();
    });
</script>