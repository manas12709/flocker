---
layout: post
search_exclude: true
show_reading_time: false
permalink: /prism/leaderboard
---

<script type="module">
    import { pythonURI, fetchOptions } from "{{site.baseurl}}/assets/js/api/config.js";

    async function checkAuthorization() {
        try {
            const response = await fetch(`${pythonURI}/api/id`, fetchOptions);

            if (response.status === 401) {
                // Redirect immediately to login if unauthorized
                window.location.href = "{{site.baseurl}}/login";
            } else if (response.ok) {
                // If authorized, allow body to render
                const contentElements = document.querySelectorAll('.content');
                contentElements.forEach(element => {
                    element.style.display = "block";
                });
            }
        } catch (error) {
            console.error("Authorization check failed:", error);
            // Redirect to login as a fallback
            window.location.href = "{{site.baseurl}}/login";
        }
    }

    // Run the check before rendering anything
    checkAuthorization();
</script>

<style>
    .content {
        display: none;
    }

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

    section {
        margin-bottom: 40px;
        padding: 20px;
        background-color: #2e2e2e;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    section h2 {
        font-size: 1.8rem;
        margin-bottom: 20px;
        color: #ff6666;
        border-bottom: 2px solid #b30000;
        padding-bottom: 5px;
        display: inline-block;
    }

    .profile-card {
        background-color: #b30000;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
        color: #ffffff;
        font-weight: bold;
        margin-bottom: 10px;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .profile-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
    }

    button {
        background-color: #ff4d4d;
        color: #ffffff;
        border: none;
        padding: 12px 25px;
        border-radius: 25px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease, box-shadow 0.3s ease;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    button:hover {
        background-color: #e60000;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    }

    .green-button {
        background-color: #28a745;
    }

    .green-button:hover {
        background-color: #218838;
    }

    .purple-button {
        background-color: #ff3333;
        color: #ffffff;
    }

    .purple-button:hover {
        background-color: #b30000;
    }

    .copyright {
        background-color: #b30000;
        text-align: center;
        padding: 20px;
        font-size: 0.9rem;
        color: #ffcccc;
    }

    .copyright p {
        margin: 0;
    }
</style>

<div class="content">
    <header class="heading">
        <h1>Leaderboard</h1>
        <p>Reflecting Progress 1 Step at a Time</p>
    </header>

    <br>

    <section>
        <h2>Leaderboard of Top Interests</h2>
        <p>Discover the most popular interests across the community based on collective engagement and participation.</p>
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
    </section>

    <section>
        <h2>Affinity Leaderboard</h2>
        <p>See which users share the most interests with others, fostering meaningful connections and collaboration.</p>
        <table class="leaderboard-table">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Username</th>
                    <th>Shared Interests</th>
                </tr>
            </thead>
            <tbody id="leaderboard-users">
                <!-- Data will be populated here by JavaScript -->
            </tbody>
        </table>
    </section>
</div>

<script type="module">
    import { pythonURI, fetchOptions } from "{{site.baseurl}}/assets/js/api/config.js";

    async function fetchTopUsers() {
        try {
            const response = await fetch(`${pythonURI}/api/leaderboard/top_users?user_id=1`, fetchOptions); // Replace 1 with the actual user ID
            if (!response.ok) throw new Error("Failed to fetch top users");

            const topUsers = await response.json();

            // Populate Top Users
            const usersBody = document.getElementById("leaderboard-users");
            usersBody.innerHTML = "";
            topUsers.top_users.forEach((user, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${user.username}</td>
                    <td>${user.shared_interests.join(", ")}</td>
                `;
                usersBody.appendChild(row);
            });
        } catch (error) {
            console.error("Error fetching top users:", error);
        }
    }

    async function fetchTopInterests() {
        try {
            const response = await fetch(`${pythonURI}/api/leaderboard/top_interests`, fetchOptions);
            if (!response.ok) throw new Error("Failed to fetch top interests");

            const topInterests = await response.json();

            const interestsBody = document.getElementById("leaderboard-interests");
            interestsBody.innerHTML = "";
            topInterests.top_interests.forEach((interest, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${interest.interest}</td>
                    <td>${interest.count}</td>
                `;
                interestsBody.appendChild(row);
            });
        } catch (error) {
            console.error("Error fetching top interests:", error);
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        fetchTopUsers();
        fetchTopInterests();
    });
</script>