---
layout: post 
title: Worlds
search_exclude: true
permalink: /prism/home
menu: nav/prism.html
---

<!-- Loading Screen -->
<div id="loading-screen" class="fixed inset-0 bg-gray-200 flex items-center justify-center z-50">
    <div class="text-center">
        <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
        <h2 class="text-4xl font-semibold text-gray-900">Loading...</h2>
    </div>
</div>

<style>
    .loader {
        border-top-color: #ff5733;
        animation: spin 1s infinite linear;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    body {
        font-family: 'Arial', sans-serif;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        background-color: #1a1a1a;
        color: #fff;
    }

    .bg-gradient {
        background: linear-gradient(135deg, #ff5733, #c70039);
    }

    .fade-in {
        opacity: 0;
        transform: translateY(40px);
        transition: opacity 1s ease-out, transform 1s ease-out;
    }

    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .animate-gradient {
        background-size: 200% 200%;
        animation: gradient 10s ease infinite;
    }

    @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    .cta-button {
        background-color: #ff5733;
        color: #fff;
        padding: 15px 30px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.3s;
    }

    .cta-button:hover {
        background-color: #c70039;
        transform: scale(1.1);
    }

    .world-card {
        text-align: center;
        transition: transform 0.3s;
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        margin: 10px;
        color: #333;
    }

    .world-card:hover {
        transform: scale(1.05);
    }

    .testimonials {
        background-color: #333;
        color: #fff;
        padding: 50px 20px;
        text-align: center;
    }

    .testimonial {
        margin-bottom: 20px;
        font-style: italic;
    }

    @keyframes scroll {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(-50%);
        }
    }

    .animate-scroll {
        animation: scroll 45s linear infinite;
    }
</style>

<script>
    document.addEventListener("DOMContentLoaded", function() {
        const loadingScreen = document.getElementById('loading-screen');
        window.addEventListener('load', function() {
            loadingScreen.style.display = 'none';
        });
        window.addEventListener('beforeunload', function() {
            loadingScreen.style.display = 'flex';
        });

        const fadeInElements = document.querySelectorAll('.fade-in');

        const handleScroll = () => {
            fadeInElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
                    el.classList.add('visible');
                } else {
                    el.classList.remove('visible');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('load', handleScroll);
    });
</script>

<!-- Background Animation -->
<div class="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
    <div class="bg-gradient-to-r from-gray-900 via-gray-800 to-black w-full h-full opacity-50 animate-gradient"></div>
</div>

<!-- Welcome Section -->
<section id="welcome" class="h-screen flex items-center justify-center text-center bg-gradient text-white">
    <h1 class="text-8xl font-extrabold fade-in">
        Welcome to <span class="text-rose-600">Prism Universe</span>
    </h1>
</section>

<!-- About Us Section -->
<section id="about" class="h-screen flex flex-col items-center justify-center text-center">
    <h2 class="text-7xl font-extrabold text-rose-600 fade-in mb-6">About Us</h2>
    <p class="text-3xl text-gray-300 max-w-5xl fade-in">
        Prism is your gateway to a world of discovery and connection. Whether you're exploring new interests or sharing your passions, our platform is here to connect you with like-minded individuals.
    </p>
</section>

<!-- Our Mission Section -->
<section id="mission" class="h-screen flex flex-col items-center justify-center text-center bg-gray-200">
    <h3 class="text-6xl font-bold mt-8 text-gray-900 fade-in">Our Mission</h3>
    <p class="text-3xl text-gray-700 mt-4 max-w-5xl fade-in">
        At Prism, we strive to create a community where people can explore, connect, and grow together. Every interest has a story, and we're here to help you share yours.
    </p>
</section>

<!-- Featured Worlds Section -->
<section id="featured-worlds" class="py-20 bg-gray-100">
    <h2 class="text-7xl font-bold text-center text-red-600 mb-10 fade-in">Featured Worlds</h2>
    <div class="flex overflow-x-auto space-x-4 px-4">
        <a href="/prism_frontend/prism/topicchatroom" class="world-card">
            <h3 class="text-3xl font-bold mb-2">Chatroom World</h3>
            <p class="text-xl">Engage in lively discussions and connect with others in real-time.</p>
        </a>
        <a href="/prism_frontend/prism/frqpage" class="world-card">
            <h3 class="text-3xl font-bold mb-2">FRQ World</h3>
            <p class="text-xl">Challenge yourself with daily free response questions and share your insights.</p>
        </a>
        <a href="/prism/anotherworld" class="world-card">
            <h3 class="text-3xl font-bold mb-2">Adventure World</h3>
            <p class="text-xl">Embark on thrilling adventures and explore new horizons.</p>
        </a>
    </div>
</section>

<!-- Testimonials Section -->
<section id="testimonials" class="py-20 bg-gray-900 text-white overflow-hidden">
    <h2 class="text-7xl font-bold text-center mb-10 fade-in">What Our Users Say</h2>
    <div class="relative">
        <div class="flex space-x-8 w-max animate-scroll">
            <div class="bg-gray-800 rounded-lg p-8 shadow-lg min-w-[300px] min-h-[350px] flex flex-col justify-between">
                <p class="text-3xl italic leading-relaxed">
                    "Prism has transformed the way I connect with others. It's a must-try!"
                </p>
                <h3 class="mt-6 font-bold text-xl">- User A</h3>
            </div>
            <div class="bg-gray-800 rounded-lg p-8 shadow-lg min-w-[300px] min-h-[350px] flex flex-col justify-between">
                <p class="text-3xl italic leading-relaxed">
                    "An incredible platform for discovering new interests and communities."
                </p>
                <h3 class="mt-6 font-bold text-xl">- User B</h3>
            </div>
        </div>
    </div>
</section>

<!-- Call-to-Action Section -->
<section id="cta" class="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-red-600 to-rose-600 text-white">
    <h2 class="text-7xl font-bold mb-6 fade-in">Join the Prism Community</h2>
    <p class="text-3xl max-w-4xl text-center mb-8 fade-in">
        Connect with enthusiasts from around the world, share your experiences, and explore amazing content!
    </p>
    <a href="/signup" class="bg-white text-red-600 text-3xl px-8 py-4 rounded-lg shadow-lg font-bold transition-transform transform hover:scale-110 fade-in">
        Get Started Now
    </a>
</section>

<!-- Footer -->
<footer class="bg-gray-800 text-white py-8">
    <div class="container mx-auto text-center">
        <p class="text-lg">&copy; 2024 Prism. All rights reserved.</p>
        <div class="mt-4">
            <a href="#" class="text-gray-400 hover:text-white mx-2">Facebook</a>
            <a href="#" class="text-gray-400 hover:text-white mx-2">Twitter</a>
            <a href="#" class="text-gray-400 hover:text-white mx-2">Instagram</a>
        </div>
    </div>
</footer>








