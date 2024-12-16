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

<!-- Popup HTML -->
<div class="popup" id="popup">
    <div class="popup-content">
        <h2>Sign In Required</h2>
        <p>Please sign in to view the leaderboard.</p>
        <button onclick="closePopup()">Close</button>
    </div>
</div>

<!-- Popup CSS -->
<style>
    .popup {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    .popup-content {
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        text-align: center;
        width: 300px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .popup-content button {
        margin-top: 10px;
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .popup-content button:hover {
        background-color: #0056b3;
    }
</style>

<!-- Popup JavaScript -->
<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Function to check if the user is signed in
        function isUserSignedIn() {
            // Replace this with your actual sign-in check logic
            return false; // Example: return true if the user is signed in
        }

        // Show the popup if the user is not signed in
        if (!isUserSignedIn()) {
            const popup = document.getElementById('popup');
            popup.style.display = 'flex'; // Make the popup visible
        }

        // Function to close the popup
        window.closePopup = function() {
            const popup = document.getElementById('popup');
            popup.style.display = 'none'; // Hide the popup
        };

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