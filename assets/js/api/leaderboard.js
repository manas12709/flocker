import { pythonURI, fetchOptions } from "./config.js";

async function fetchLeaderboardData() {
    try {
        // Fetch Top Posts
        const postsResponse = await fetch(`${pythonURI}/api/leaderboard/top_posts`, fetchOptions);
        const { top_posts } = await postsResponse.json();
        const postsContainer = document.getElementById("leaderboard-posts");
        postsContainer.innerHTML = top_posts.map((post, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${post.post_title}</td>
                <td>${post.username}</td>
                <td>${post.net_vote_count}</td>
            </tr>
        `).join("");

        // Fetch Top Interests
        const interestsResponse = await fetch(`${pythonURI}/api/leaderboard/top_interests`, fetchOptions);
        const { top_interests } = await interestsResponse.json();
        const interestsContainer = document.getElementById("leaderboard-interests");
        interestsContainer.innerHTML = top_interests.map((interest, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${interest.interest}</td>
                <td>${interest.count}</td>
            </tr>
        `).join("");

        // Fetch Top Users
        const usersResponse = await fetch(`${pythonURI}/api/leaderboard/top_users`, fetchOptions);
        const { top_users } = await usersResponse.json();
        const usersContainer = document.getElementById("leaderboard-users");
        usersContainer.innerHTML = top_users.map((user, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${user.username}</td>
                <td>${user.total_time_spent} seconds</td>
            </tr>
        `).join("");
    } catch (error) {
        console.error("Error fetching leaderboard data:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchLeaderboardData);
