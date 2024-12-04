---
layout: post 
search_exclude: true
show_reading_time: false
permalink: /prism/dailyquestion
---

<!-- Link to Custom CSS and Script -->
<link rel="stylesheet" href="{{site.baseurl}}/navigation/worlds/style.css">
<script src="{{site.baseurl}}/navigation/worlds/script.js"></script>

<header class="heading">
    <h1>Daily Question</h1>
    <p>Engage with today's topic!</p>
</header>

<div class="container">
    <h2 id="dynamic-question">What are your thoughts on the impact of technology in education?</h2>

    <div>
        <textarea placeholder="Share your thoughts..."></textarea>
        <div style="display: flex; justify-content: space-between;">
            <button class="send">Send</button>
            <button class="quiz-now">Quiz Now</button>
        </div>
    </div>

    <div class="dropdown">
        <button>Pick a Topic</button>
        <div class="dropdown-content">
            <a href="#" class="topic-link">Technology</a>
            <a href="#" class="topic-link">Health</a>
            <a href="#" class="topic-link">Environment</a>
            <a href="#" class="topic-link">Education</a>
        </div>
    </div>
</div>

<footer class="copyright">
    <p>© 2023 Prism. All rights reserved.</p>
</footer>
