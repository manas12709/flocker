---
layout: post
title: User Login
permalink: /userlog
search_exclude: true
show_reading_time: false
---

<div class="cutscene-container">
    <h1>Welcome to Prism!</h1>
    <p>Loading your personalized dashboard...</p>
    <div class="cutscene">
        <!-- Prism animation -->
        <div class="prism-animation">
            <div class="light-beam"></div>
            <div class="prism"></div>
            <div class="rainbow"></div>
        </div>
    </div>
</div>

<script>
    // Redirect to index.md after the cutscene plays
    setTimeout(() => {
        window.location.href = "{{site.baseurl}}/index";
    }, 2000); // Adjust the timeout duration to match the length of your cutscene
</script>

<style>
    .cutscene-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: #000;
        color: #fff;
        text-align: center;
    }

    .cutscene-container h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .cutscene-container p {
        font-size: 1.5rem;
        margin-bottom: 2rem;
    }

    .cutscene {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .prism-animation {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .light-beam {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 10px;
        background: linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
        animation: lightBeam 2s linear;
    }

    .prism {
        position: absolute;
        top: 45%;
        left: 50%;
        width: 100px;
        height: 100px;
        background: linear-gradient(45deg, #ff0000, #00ff00, #0000ff);
        clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
        animation: prismRotate 2s linear;
    }

    .rainbow {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 10px;
        background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
        animation: rainbowExpand 2s linear;
    }

    @keyframes lightBeam {
        0% {
            left: -100%;
        }
        100% {
            left: 50%;
        }
    }

    @keyframes prismRotate {
        0% {
            transform: translate(-50%, -50%) rotate(0deg);
        }
        100% {
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }

    @keyframes rainbowExpand {
        0% {
            width: 0;
        }
        100% {
            width: 100%;
        }
    }
</style>