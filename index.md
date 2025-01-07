---
layout: post
search_exclude: true
hide: true
show_reading_time: false 
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
        <h1>Prism</h1>
        <p>An AI powered social media platform around fun and creativity</p>
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

<script type="module">
    import { pythonURI, fetchOptions } from "{{site.baseurl}}/assets/js/api/config.js";

    async function handleVote(sectionId, voteType) {
        const section = document.getElementById(sectionId);
        const voteButton = section.querySelector('.vote-button');

        try {
            const response = await fetch(`${pythonURI}/api/vote`, {
                ...fetchOptions,
                method: 'POST',
                headers: {
                    ...fetchOptions.headers,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    post_id: sectionId,
                    vote_type: voteType,
                }),
            });

            if (!response.ok) throw new Error('Vote submission failed');

            if (voteType === 'upvote') {
                voteButton.textContent = 'Remove Section';
                voteButton.onclick = () => toggleSection(sectionId, false);
            } else {
                toggleSection(sectionId, false);
            }
        } catch (error) {
            console.error('Error voting:', error);
        }
    }

    function toggleSection(sectionId, show) {
        const section = document.getElementById(sectionId);
        const placeholder = document.getElementById(`${sectionId}-placeholder`);

        if (show) {
            section.style.display = 'block';
            placeholder.style.display = 'none';
        } else {
            section.style.display = 'none';
            if (!placeholder) {
                const newPlaceholder = document.createElement('div');
                newPlaceholder.id = `${sectionId}-placeholder`;
                newPlaceholder.innerHTML = `<button class="green-button" onclick="toggleSection('${sectionId}', true)">Show Section</button>`;
                section.insertAdjacentElement('afterend', newPlaceholder);
            } else {
                placeholder.style.display = 'block';
            }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('section').forEach((section, index) => {
            const sectionId = `section-${index + 1}`; // Assigning section IDs starting at 1
            section.id = sectionId;

            const voteButton = document.createElement('button');
            voteButton.className = 'vote-button purple-button';
            voteButton.textContent = 'Do you enjoy this feature on your feed?';

            const upvoteButton = document.createElement('button');
            upvoteButton.className = 'vote-button purple-button';
            upvoteButton.textContent = 'Upvote';
            upvoteButton.style.marginRight = '10px';
            upvoteButton.onclick = () => handleVote(sectionId, 'upvote');

            const downvoteButton = document.createElement('button');
            downvoteButton.className = 'vote-button purple-button';
            downvoteButton.textContent = 'Downvote';
            downvoteButton.onclick = () => handleVote(sectionId, 'downvote');

            const buttonContainer = document.createElement('div');
            buttonContainer.style.textAlign = 'right';
            buttonContainer.appendChild(upvoteButton);
            buttonContainer.appendChild(downvoteButton);

            section.appendChild(buttonContainer);
        });
    });
</script>

