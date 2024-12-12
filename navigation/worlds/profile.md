---
layout: post 
search_exclude: true
show_reading_time: false
permalink: /prism/profile
---

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        font-family: 'Roboto', sans-serif;
        background-color: #1a1a1a;
        color: #ffffff;
    }

    .container {
        width: 90%;
        max-width: 1200px;
        margin: 0 auto;
    }

    header {
        background-color: #e53e3e;
        padding: 0px;
        text-align: center;
    }

    header h1 {
        font-size: 2rem;
        font-weight: bold;
    }

    header p {
        margin-top: 0px;
    }

    .profile {
        display: flex;
        align-items: center;
        margin-bottom: 24px;
    }

    .profile img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 4px solid #e53e3e;
        margin-right: 16px;
    }

    .profile div h2 {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .profile div p {
        color: #a0aec0;
    }

    .grid {
        display: grid;
        gap: 16px;
        margin-bottom: 24px;
    }

    .grid-cols-2 {
        grid-template-columns: repeat(2, 1fr);
    }

    .card {
        background-color: #2d3748;
        padding: 16px;
        border-radius: 8px;
    }

    .card h3, .card h4 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 8px;
    }

    .card img {
        width: 100%;
        border-radius: 8px;
        transition: transform 0.3s ease-in-out; /* Smooth animation */
    }

    .card img:hover {
        transform: scale(1.05); /* Slightly increase size on hover */
    }


    .card p {
        margin-top: 8px;
    }

    ul {
        list-style: none;
    }

    ul li {
        margin: 8px 0;
    }

    footer {
        background-color: #e53e3e;
        padding: 16px;
        text-align: center;
    }

    footer p {
        font-size: 0.875rem;
    }
</style>

<header>
    <h1>Prism</h1>
    <p>Connect with the Future</p>
</header>

<main class="container">
    <section class="profile">
        <img src="https://placehold.co/150x150" alt="Profile Picture">
        <div>
            <h2>User Name</h2>
            <h2 id="username">User Name</h2>
        </div>
    </section>

    <section class="grid grid-cols-2">
        <div class="card">
            <h3>User Stats</h3>
            <p>Followers: 120</p>
            <p>Following: 75</p>
            <p>Posts: 34</p>
        </div>
        <div class="card">
            <h3>Bio/About Me</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec felis vel metus.</p>
        </div>
    </section>

    <section class="grid grid-cols-2">
        <div class="card">
            <h4>Interest 1</h4>
            <img src="https://placehold.co/100x100" alt="Interest 1 Visual">
        </div>
        <div class="card">
            <h4>Interest 2</h4>
            <img src="https://placehold.co/100x100" alt="Interest 2 Visual">
        </div>
        <div class="card">
            <h4>Interest 3</h4>
            <img src="https://placehold.co/100x100" alt="Interest 3 Visual">
        </div>
        <div class="card">
            <h4>Interest 4</h4>
            <img src="https://placehold.co/100x100" alt="Interest 4 Visual">
        </div>
    </section>

    <section class="card">
        <h3>Latest Post</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec felis vel metus.</p>
    </section>
    <br>
    <section class="card">
        <h3>Activity Feed</h3>
        <ul>
            <li>User1 liked your post</li>
            <li>User2 commented on your photo</li>
            <li>User3 started following you</li>
        </ul>
    </section>
    <br>
</main>

<script type="module">
    import { pythonURI, fetchOptions } from '../assets/js/api/config.js';

    document.addEventListener('DOMContentLoaded', async function() {
        try {
            const response = await fetch(`${pythonURI}/api/user`, fetchOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const username = data.name;
            document.getElementById('username').textContent = username;
        } catch (error) {
            console.error('Error fetching username:', error);
        }
    });
</script>