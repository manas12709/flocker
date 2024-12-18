var pythonURI;
if (location.hostname === "localhost") {
    pythonURI = "http://localhost:8887";
} else if (location.hostname === "127.0.0.1") {
    pythonURI = "http://127.0.0.1:8887";
} else {
    pythonURI = "https://flocker.nighthawkcodingsociety.com";
}

var javaURI;
if (location.hostname === "localhost") {
    javaURI = "http://localhost:8885";
} else if (location.hostname === "127.0.0.1") {
    javaURI = "http://127.0.0.1:8885";
} else {
    javaURI = "https://flocker-j.nighthawkcodingsociety.com";
}

// Removed export as it's not necessary here

async function fetchLeaderboardData() {
    try {
        // Fetch Top Posts
        const postsResponse = await fetch(${pythonURI}/api/leaderboard/top_posts);
        const { top_posts } = await postsResponse.json();
        const postsContainer = document.getElementById("leaderboard-posts");
        postsContainer.innerHTML = top_posts.map((post, index) => 
            <tr>
                <td>${index + 1}</td>
                <td>${post.post_title}</td>
                <td>${post.username}</td>
                <td>${post.net_vote_count}</td>
            </tr>
        ).join("");

        // Fetch Top Interests
        const interestsResponse = await fetch(${pythonURI}/api/leaderboard/top_interests);
        const { top_interests } = await interestsResponse.json();
        const interestsContainer = document.getElementById("leaderboard-interests");
        interestsContainer.innerHTML = top_interests.map((interest, index) => 
            <tr>
                <td>${index + 1}</td>
                <td>${interest.interest}</td>
                <td>${interest.count}</td>
            </tr>
        ).join("");

        // Fetch Top Users
        const usersResponse = await fetch(${pythonURI}/api/leaderboard/top_users);
        const { top_users } = await usersResponse.json();
        const usersContainer = document.getElementById("leaderboard-users");
        usersContainer.innerHTML = top_users.map((user, index) => 
            <tr>
                <td>${index + 1}</td>
                <td>${user.username}</td>
                <td>${user.total_time_spent} seconds</td>
            </tr>
        ).join("");
    } catch (error) {
        console.error("Error fetching leaderboard data:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchLeaderboardData);