---
layout: post 
search_exclude: true
show_reading_time: false
permalink: /prism/feed
---

<style>
    body {
        background-color: #1a1a1a;
        color: #ffffff;
        font-family: 'Arial', sans-serif;
        margin: 0;
        padding: 0;
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

    main {
        padding: 20px;
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

    ul {
        list-style: none;
        padding: 0;
    }

    ul li {
        background-color: #b30000;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
        color: #ffffff;
        font-weight: bold;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    ul li:hover {
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

    .poll {
        background-color: #292929;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
        color: #ffcccc;
    }

    .poll input[type="radio"] {
        margin-right: 10px;
        accent-color: #ff4d4d;
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


<body>
    <header class="heading">
        <h1>Interest Mapping</h1>
        <p>Connect with others who share your passions!</p>
    </header>

    <main>
        <section>
            <h2>Suggestions for You</h2>
            <ul>
                <li>User 1 - Biking Enthusiast</li>
                <li>User 2 - Cooking Aficionado</li>
                <li>User 3 - Hiking Lover</li>
            </ul>
        </section>

        <section>
            <h2>Today's Daily Quiz</h2>
            <button>Take the Quiz</button>
        </section>

        <section>
            <h2>Daily Poll</h2>
            <div class="poll">
                <p>What is your favorite outdoor activity?</p>
                <input type="radio" id="biking" name="poll" value="Biking">
                <label for="biking">Biking</label><br>
                <input type="radio" id="cooking" name="poll" value="Cooking">
                <label for="cooking">Cooking</label><br>
                <input type="radio" id="hiking" name="poll" value="Hiking">
                <label for="hiking">Hiking</label><br>
                <button class="green-button">Vote</button>
            </div>
        </section>

        <section>
            <h2>Leaderboard of Top Interests</h2>
            <ul>
                <li>1. Biking - 150 Votes</li>
                <li>2. Cooking - 120 Votes</li>
                <li>3. Hiking - 100 Votes</li>
            </ul>
        </section>

        <section>
            <button class="purple-button">Access Your Profile</button>
        </section>
    </main>

    <footer class="copyright">
        <p>&copy; 2024 Prism. All rights reserved.</p>
    </footer>
</body>
