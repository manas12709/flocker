---
layout: post 
search_exclude: true
show_reading_time: false
permalink: /profile
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
        <img src="https://placehold.co/150x150" alt="Profile Picture" id="profilePicture">
        <div>
            <h2 id="username">User Name</h2>
        </div>
    </section>

    <section class="card">
        <h3>Profile Settings</h3>
        <form>
            <div>
                <label for="newUid">Enter New UID:</label>
                <input type="text" id="newUid" placeholder="New UID">
            </div>
            <div>
                <label for="newName">Enter New Name:</label>
                <input type="text" id="newName" placeholder="New Name">
            </div>
            <div>
                <label for="newPassword">Enter New Password:</label>
                <input type="password" id="newPassword" placeholder="New Password">
            </div>
            <div>
                <label for="newInterests">Enter New Interests:</label>
                <input type="text" id="newInterests" placeholder="New Interests (e.g., Soccer, Reading)">
            </div>
            <br>
            <label for="profilePictureUpload" class="file-icon">
                Upload Profile Picture <i class="fas fa-upload"></i>
            </label>
            <input type="file" id="profilePictureUpload" accept="image/*" style="display: none;">
            <p id="profile-message" style="color: red;"></p>
        </form>
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
import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

async function fetchUsername() {
    try {
        const response = await fetch(pythonURI + "/api/user", fetchOptions);
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        if (data && data.name) {
            document.getElementById('username').textContent = data.name;
            setPlaceholders(data);
        }
    } catch (error) {
        console.error('Error fetching username:', error);
        showError('Error fetching user data');
    }
}

async function fetchProfilePicture() {
    try {
        const response = await fetch(pythonURI + "/api/id/pfp", fetchOptions);
        if (!response.ok) {
            throw new Error('Failed to fetch profile picture');
        }
        const data = await response.json();
        if (data && data.pfp) {
            document.getElementById('profilePicture').src = `data:image/jpeg;base64,${data.pfp}`;
        }
    } catch (error) {
        console.error('Error fetching profile picture:', error);
        showError('Error fetching profile picture');
    }
}

function setPlaceholders(userData) {
    const uidInput = document.getElementById('newUid');
    const nameInput = document.getElementById('newName');
    const interestsInput = document.getElementById('newInterests');

    if (userData.uid) uidInput.placeholder = userData.uid;
    if (userData.name) nameInput.placeholder = userData.name;
    if (userData.interests) interestsInput.placeholder = userData.interests;
}

async function updateProfile(field, value) {
    try {
        const response = await fetch(pythonURI + "/api/user", {
            ...fetchOptions,
            method: 'PUT',
            body: JSON.stringify({ [field]: value })
        });

        if (!response.ok) {
            throw new Error('Failed to update profile');
        }

        showError('Profile updated successfully', 'green');
        fetchUsername();
    } catch (error) {
        console.error('Error updating profile:', error);
        showError('Error updating profile');
    }
}

async function uploadProfilePicture(file) {
    try {
        const base64String = await convertToBase64(file);
        const response = await fetch(pythonURI + "/api/id/pfp", {
            ...fetchOptions,
            method: 'PUT',
            body: JSON.stringify({ pfp: base64String })
        });

        if (!response.ok) {
            throw new Error('Failed to upload profile picture');
        }

        showError('Profile picture updated successfully', 'green');
        fetchProfilePicture();
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        showError('Error uploading profile picture');
    }
}

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

function showError(message, color = 'red') {
    const messageElement = document.getElementById('profile-message');
    messageElement.style.color = color;
    messageElement.textContent = message;
    setTimeout(() => {
        messageElement.textContent = '';
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchUsername();
    fetchProfilePicture();

    const profilePictureInput = document.getElementById('profilePictureUpload');
    profilePictureInput.addEventListener('change', (e) => {
        if (e.target.files[0]) {
            uploadProfilePicture(e.target.files[0]);
        }
    });

    const inputs = ['newUid', 'newName', 'newPassword', 'newInterests'];
    inputs.forEach(id => {
        const input = document.getElementById(id);
        input.addEventListener('change', (e) => {
            if (e.target.value) {
                updateProfile(id.replace('new', '').toLowerCase(), e.target.value);
                e.target.value = '';
            }
        });
    });
});
</script>