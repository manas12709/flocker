---
layout: post
title: Prism
search_exclude: true
description: Connect with others who share your passions!
hide: true
menu: nav/home.html
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
                });;
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
        <h1>Interest Mapping</h1>
        <p>Connect with others who share your passions!</p>
    </header>

    <br>

    <section>
        <h2>Suggestions for You</h2>
        <div id="suggestions"></div>
    </section>

    <section>
        <h2>Leaderboard of Top Interests</h2>
        <ul id="leaderboard"></ul>
    </section>

    <section>
        <button class="purple-button" onclick="window.location.href='{{ site.baseurl }}/profile'">Access Your Profile</button>
    </section>

    <footer class="copyright">
        <p>&copy; 2024 Prism. All rights reserved.</p>
    </footer>
</div>

<script type="module">

    import { pythonURI, fetchOptions } from "{{site.baseurl}}/assets/js/api/config.js";

    async function fetchSuggestions() {
        try {
            const response = await fetch(`${pythonURI}/api/id`, fetchOptions);
            if (!response.ok) throw new Error("Failed to fetch user data");

            const currentUser = await response.json();
            const interests = currentUser.interests.split(", ");

            const allUsersResponse = await fetch(`${pythonURI}/api/users`, fetchOptions);
            if (!allUsersResponse.ok) throw new Error("Failed to fetch all users");

            const allUsers = await allUsersResponse.json();

            const matchedUsers = allUsers.filter(user => {
                const userInterests = user.interests.split(", ");
                return userInterests.some(interest => interests.includes(interest)) && user.uid !== currentUser.uid;
            });

            const suggestionsContainer = document.getElementById("suggestions");
            suggestionsContainer.innerHTML = "";

            matchedUsers.forEach(user => {
                const card = document.createElement("div");
                card.className = "profile-card";
                card.textContent = `${user.name} - Interests: ${user.interests}`;
                suggestionsContainer.appendChild(card);
            });
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    }

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

            const leaderboardContainer = document.getElementById("leaderboard");
            leaderboardContainer.innerHTML = "";

            sortedInterests.forEach(([interest, count]) => {
                const listItem = document.createElement("li");
                listItem.textContent = `${interest} - ${count} Votes`;
                leaderboardContainer.appendChild(listItem);
            });
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        fetchSuggestions();
        fetchLeaderboard();
    });
</script>
