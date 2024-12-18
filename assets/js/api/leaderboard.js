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
        const postsResponse = await fetch(`${pythonURI}/api/leaderboard/top_posts`);
        if (!postsResponse.ok) {
            throw new Error(`HTTP error! Status: ${postsResponse.status}`);
        }
        const postsData = await postsResponse.json();
        const { top_posts } = postsData;
        const postsContainer = document.getElementById("leaderboard-posts");
        postsContainer.innerHTML = top_posts.map((post, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${post.post_title}</td>
                <td>${post.username}</td>
                <td>${post.net_vote_count}</td>
            </tr>
        `).join("");

        // Fetch other leaderboard data (similar checks)
    } catch (error) {
        console.error("Error fetching leaderboard data:", error.message);
    }
}

document.addEventListener("DOMContentLoaded", fetchLeaderboardData);

