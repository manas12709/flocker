---
layout: post
search_exclude: true
show_reading_time: false
permalink: /prism/leaderboard
title: Prism Leaderboard
---

<style>
    .heading {
        background-color: #b30000;
        padding: 40px 20px;
        text-align: center;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }

    .heading h1 {
        font-size: 2.5rem;
        font-weight: bold;
        margin: 0;
        color: #ffffff;
        text-transform: uppercase;
        letter-spacing: 2px;
    }

    .heading p {
        font-size: 1.2rem;
        margin: 10px 0 0;
        color: #ffcccc;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        background-color: #2e2e2e;
        margin: 20px 0;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    th, td {
        padding: 15px;
        text-align: left;
        color: #ffffff;
        border-bottom: 1px solid #444;
    }

    th {
        background-color: #b30000;
        text-transform: uppercase;
    }

    tr:nth-child(even) {
        background-color: #3e3e3e;
    }

    tr:hover {
        background-color: #b30000;
        color: #ffffff;
        cursor: pointer;
    }

    section {
        padding: 20px;
    }

    footer {
        background-color: #b30000;
        text-align: center;
        padding: 20px;
        color: #ffcccc;
    }

    button {
        background-color: #ff4d4d;
        color: #ffffff;
        border: none;
        padding: 12px 25px;
        border-radius: 25px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #e60000;
    }
</style>

<header class="heading">
    <h1>Leaderboard</h1>
    <p>Reflecting Progress 1 Step at a Time.</p>
</header>

<section>
    <h2>Top Posts</h2>
    <table>
        <thead>
            <tr>
                <th>Rank</th>
                <th>Post Title</th>
                <th>Username</th>
                <th>Votes</th>
            </tr>
        </thead>
        <tbody id="top-posts">
            <!-- Dynamically loaded -->
        </tbody>
    </table>

    <h2>Top Interests</h2>
    <table>
        <thead>
            <tr>
                <th>Rank</th>
                <th>Interest</th>
                <th>Count</th>
            </tr>
        </thead>
        <tbody id="top-interests">
            <!-- Dynamically loaded -->
        </tbody>
    </table>

    <h2>Top Users</h2>
    <table>
        <thead>
            <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Engagement</th>
            </tr>
        </thead>
        <tbody id="top-users">
            <!-- Dynamically loaded -->
        </tbody>
    </table>
</section>

<footer>
    <p>&copy; 2024 Prism. All rights reserved.</p>
</footer>

<script type="module">
    import { pythonURI, fetchOptions } from "{{site.baseurl}}/assets/js/api/config.js";

    async function fetchLeaderboardData() {
        try {
            const response = await fetch(`${pythonURI}/api/leaderboard`, fetchOptions);
            if (response.status === 401) {
                window.location.href = "{{site.baseurl}}/login";
                return;
            }

            if (!response.ok) throw new Error("Failed to fetch leaderboard data");

            const data = await response.json();

            populateTable("top-posts", data.posts, ["post_title", "username", "net_vote_count"]);
            populateTable("top-interests", data.top_interests, ["interest", "count"]);
            populateTable("top-users", data.user_engagement, ["username", "engagement"]);

        } catch (error) {
            console.error("Error fetching leaderboard data:", error);
        }
    }

    function populateTable(elementId, data, keys) {
        const tableBody = document.getElementById(elementId);
        tableBody.innerHTML = "";
        data.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item[keys[0]]}</td>
                <td>${item[keys[1]]}</td>
                ${keys[2] ? `<td>${item[keys[2]]}</td>` : ""}
            `;
            tableBody.appendChild(row);
        });
    }

    document.addEventListener("DOMContentLoaded", fetchLeaderboardData);
</script>
