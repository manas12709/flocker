---
layout: post
title: Profile Settings
permalink: /profile
menu: nav/home.html
search_exclude: true
show_reading_time: false
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
        padding-top: 2rem;
    }

    .page-header {
        text-align: center;
        margin-bottom: 2rem;
        padding: 2rem 0;
        border-bottom: 2px solid #e53e3e;
    }

    .page-header h1 {
        font-size: 2.5rem;
        font-weight: bold;
        color: #e53e3e;
        margin-bottom: 0.5rem;
    }

    .page-header p {
        color: #a0aec0;
        font-size: 1.1rem;
    }

    .profile {
        display: flex;
        align-items: center;
        margin-bottom: 24px;
        background-color: #2d3748;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .profile img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 4px solid #e53e3e;
        margin-right: 2rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .profile div h2 {
        font-size: 2rem;
        font-weight: bold;
        color: #ffffff;
        margin-bottom: 0.5rem;
    }

    .card {
        background-color: #2d3748;
        padding: 1.5rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .card h3 {
        font-size: 1.5rem;
        font-weight: 600;
        color: #e53e3e;
        margin-bottom: 1.5rem;
        border-bottom: 2px solid #e53e3e;
        padding-bottom: 0.5rem;
    }

    form div {
        margin-bottom: 1rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        color: #a0aec0;
    }

    input[type="text"],
    input[type="password"] {
        width: 100%;
        padding: 0.75rem;
        border-radius: 4px;
        border: 1px solid #4a5568;
        background-color: #1a202c;
        color: #ffffff;
        margin-bottom: 1rem;
    }

    input[type="text"]:focus,
    input[type="password"]:focus {
        outline: none;
        border-color: #e53e3e;
        box-shadow: 0 0 0 2px rgba(229, 62, 62, 0.2);
    }

    .file-icon {
        display: inline-block;
        padding: 0.75rem 1.5rem;
        background-color: #e53e3e;
        color: white;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .file-icon:hover {
        background-color: #c53030;
    }

    #profile-message {
        margin-top: 1rem;
        padding: 0.75rem;
        border-radius: 4px;
        font-weight: 500;
    }

    .grid {
        display: grid;
        gap: 16px;
        margin-bottom: 24px;
    }

    .grid-cols-2 {
        grid-template-columns: repeat(2, 1fr);
    }

    .card img {
        width: 100%;
        border-radius: 8px;
        transition: transform 0.3s ease-in-out;
    }

    .card img:hover {
        transform: scale(1.05);
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

    .input-field {
        width: 100%;
        padding: 0.75rem;
        margin-bottom: 1rem;
        border: 2px solid #e53e3e;
        border-radius: 6px;
        background-color: #1a1a1a;
        color: #ffffff;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }

    .input-field:focus {
        outline: none;
        border-color: #fc8181;
        box-shadow: 0 0 0 2px rgba(229, 62, 62, 0.2);
    }

    textarea.input-field {
        resize: vertical;
        min-height: 100px;
    }

    .btn-primary {
        background-color: #e53e3e;
        color: white;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 6px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .btn-primary:hover {
        background-color: #c53030;
    }

    #newPostForm {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    #newPostForm label {
        color: #a0aec0;
        font-size: 1rem;
        margin-bottom: 0.5rem;
        display: block;
    }
</style>

<div class="page-header">
    <h1>Prism</h1>
    <p>Connect with the Future</p>
</div>

<div class="container">
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

    <section class="grid grid-cols-2" id="interestsSection">
    </section>

    <section class="card">
        <h3>Create New Post</h3>
        <form id="newPostForm">
            <div>
                <label for="postTitle">Title</label>
                <input type="text" id="postTitle" name="postTitle" class="input-field" placeholder="Enter post title">
            </div>
            <div>
                <label for="postComment">Comment</label>
                <textarea id="postComment" name="postComment" class="input-field" placeholder="Enter your comment" rows="4"></textarea>
            </div>
            <button type="button" onclick="createPost()" class="btn btn-primary">Create Post</button>
        </form>
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
</div>

<script type="module">
import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

function createInterestCards(interests) {
    const interestsSection = document.getElementById('interestsSection');
    interestsSection.innerHTML = '';
    
    if (!interests || interests.length === 0) {
        const placeholderInterests = ['Gaming', 'Reading', 'Music', 'Art'];
        placeholderInterests.forEach((interest, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h4>${interest}</h4>
                <img src="https://placehold.co/300x200/2d3748/ffffff/png?text=${interest}" alt="${interest}">
            `;
            interestsSection.appendChild(card);
        });
        return;
    }

    interests.forEach(interest => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h4>${interest}</h4>
            <img src="https://placehold.co/300x200/2d3748/ffffff/png?text=${interest}" alt="${interest}">
        `;
        interestsSection.appendChild(card);
    });
}

async function updateUserInfo() {
    try {
        const response = await fetch(pythonURI + "/api/user", fetchOptions);
        const data = await response.json();
        
        document.getElementById('username').textContent = data.name || 'User Name';
        
        if (data.pfp) {
            document.getElementById('profilePicture').src = data.pfp;
        }
        
        const interests = data.interests ? data.interests.split(',').map(i => i.trim()).filter(i => i) : [];
        createInterestCards(interests);
        
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}

document.addEventListener('DOMContentLoaded', updateUserInfo);

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
        if (field === 'interests' && value) {
            const response = await fetch(pythonURI + "/api/user", fetchOptions);
            const userData = await response.json();
            const currentInterests = userData.interests ? userData.interests.split(',').map(i => i.trim()) : [];
            const newInterests = value.split(',').map(i => i.trim());
            const combinedInterests = [...new Set([...currentInterests, ...newInterests])];
            value = combinedInterests.join(', ');  // Add space after comma
        }

        const response = await fetch(pythonURI + "/api/user", {
            ...fetchOptions,
            method: 'PUT',
            body: JSON.stringify({
                [field]: value
            })
        });

        if (!response.ok) {
            throw new Error('Failed to update profile');
        }

        showError('Profile updated successfully', 'green');
        updateUserInfo();
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

async function displayCurrentInterests() {
    try {
        const response = await fetch(pythonURI + "/api/user", fetchOptions);
        const userData = await response.json();
        if (userData.interests) {
            const formattedInterests = userData.interests.split(',').map(i => i.trim()).filter(i => i).join(', ');
            document.getElementById('newInterests').placeholder = `Current interests: ${formattedInterests}`;
        }
    } catch (error) {
        console.error('Error fetching current interests:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProfilePicture();
    displayCurrentInterests();

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

async function createPost() {
    const title = document.getElementById('postTitle').value.trim();
    const comment = document.getElementById('postComment').value.trim();
    
    if (!title || !comment) {
        alert('Please fill in both title and comment fields');
        return;
    }

    const postData = {
        title: title,
        comment: comment,
        channel_id: 7,
    };

    try {
        const response = await fetch(`${pythonURI}/api/post`, {
            ...fetchOptions,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            throw new Error('Failed to create post: ' + response.statusText);
        }

        document.getElementById('newPostForm').reset();
        alert('Post created successfully!');
                
    } catch (error) {
        console.error('Error creating post:', error);
        alert('Failed to create post. Please try again.');
    }
}

window.createPost = createPost;
</script>