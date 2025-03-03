---
layout: post 
search_exclude: true
show_reading_time: false
permalink: /yashfeatureblog
title: Yash's Project Feature Blog
categories: [Yash Final Retrospective]
---

# Flask Social Network Application - Portfolio Blog

## Introduction

Welcome to my portfolio blog! In this post, I'll be exploring the key components of my social network application built with Flask. This application allows users to manage their profiles, interests, followers, and posts. Let's dive into how the code fulfills the requirements of a comprehensive programming project.

## User Input Management

My program accepts user input through various form fields in the profile interface. Users can update their personal information, interests, and followers directly through the UI.

```html
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
    <div>
        <label for="newFollowers">Enter New Followers:</label>
        <input type="text" id="newFollowers" placeholder="New Followers (e.g., toby, bobby)">
    </div>
</form>
```

User actions trigger events through JavaScript event listeners that capture changes in the input fields and invoke API calls:

```javascript
const inputs = ['newUid', 'newName', 'newPassword', 'newInterests', 'newFollowers'];
inputs.forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener('change', (e) => {
        if (e.target.value) {
            updateProfile(id.replace('new', '').toLowerCase(), e.target.value);
            e.target.value = '';
        }
    });
});
```

## Collection Implementation

### Storing Data in Collections

I've implemented collections in multiple ways throughout the application. A key example is how user interests are stored and manipulated as lists. In the `interests.py` file, interests are stored as comma-separated values and managed as lists when needed for operations:

```python
@token_required()
def put(self):
    """
    Update and add to the interests of the authenticated user.
    """
    current_user = g.current_user
    user = User.query.filter_by(_uid=current_user.uid).first()
    if not user:
        return {'message': 'User not found'}, 404

    body = request.get_json()
    new_interests = body.get('interests')
    if not new_interests:
        return {'message': 'No new interests provided'}, 400

    formatted_new_interests = re.sub(r'\s*,\s*', ', ', new_interests.strip())
    current_interests = user.interests.split(', ') if user.interests else []
    combined_interests = list(set(current_interests + formatted_new_interests.split(', ')))
    user.interests = ', '.join(combined_interests)
    user.update({'interests': user.interests})
    return jsonify(user.interests)
```

### Using Collection Data

On the frontend, I use the collection of interests to create interactive cards for each interest, demonstrating how the collection is used to fulfill the program's purpose:

```javascript
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
                <img src="https://placehold.co/300x200/d34e3f/a3adbf/png?text=${interest}" alt="${interest}">
                <button onclick="deleteInterest('${interest}')">Delete</button>
                <button onclick="editInterest('${interest}')">Edit</button>
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
            <img src="https://placehold.co/300x200/d34e3f/a3adbf/png?text=${interest}" alt="${interest}">
            <button onclick="deleteInterest('${interest}')">Delete</button>
            <button onclick="editInterest('${interest}')">Edit</button>
        `;
        interestsSection.appendChild(card);
    });
}
```

## Procedures with Algorithms

### Procedure Implementation

A key procedure in my application is the `createInterestCards` function, which builds a UI display of user interests:

```javascript
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
                <img src="https://placehold.co/300x200/d34e3f/a3adbf/png?text=${interest}" alt="${interest}">
                <button onclick="deleteInterest('${interest}')">Delete</button>
                <button onclick="editInterest('${interest}')">Edit</button>
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
            <img src="https://placehold.co/300x200/d34e3f/a3adbf/png?text=${interest}" alt="${interest}">
            <button onclick="deleteInterest('${interest}')">Delete</button>
            <button onclick="editInterest('${interest}')">Edit</button>
        `;
        interestsSection.appendChild(card);
    });
}
```

This procedure implements an algorithm that:
- **Sequencing**: Gets the DOM container, clears existing content, and creates new elements
- **Selection**: Uses conditional logic to check if interests exist and provide placeholders if needed
- **Iteration**: Explicitly uses `.forEach()` loops to iterate through either the placeholders or actual interest data, creating UI elements for each interest

### Procedure Call

The procedure is called during the user information update process:

```javascript
async function updateUserInfo() {
    try {
        // ... other code ...
        
        const interestsResponse = await fetch(pythonURI + "/api/interests", {
            ...fetchOptions,
            method: 'GET'
        });
        const interestsData = await interestsResponse.json();
        const interests = interestsData ? interestsData.split(',').map(i => i.trim()).filter(i => i) : [];
        createInterestCards(interests);
        
        // ... more code ...
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}
```

## Program Output

The application provides visual output based on user input and program functionality. When a user submits a new post, the interface updates to display the changes:

```javascript
async function fetchPosts() {
    const channelData = {
        channel_id: 7 
    };

    try {
        const response = await fetch(`${pythonURI}/api/posts/filter`, {
            ...fetchOptions,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(channelData)
        });

        if (!response.ok) {
            throw new Error('Failed to get posts: ' + response.statusText);
        }

        const posts = await response.json();
        const postsContainer = document.getElementById('recentPosts');
        postsContainer.innerHTML = '';

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('message-bubble');
            
            const titleElement = document.createElement('div');
            titleElement.classList.add('post-title');
            titleElement.textContent = post.title;
            
            const commentElement = document.createElement('div');
            commentElement.classList.add('post-comment');
            commentElement.textContent = post.comment;
            
            postElement.appendChild(titleElement);
            postElement.appendChild(commentElement);
            postsContainer.appendChild(postElement);
        });

    } catch (error) {
        console.error('Error fetching posts:', error);
        const postsContainer = document.getElementById('recentPosts');
        postsContainer.innerHTML = '<p style="color: #e53e3e;">Error loading posts. Please try again later.</p>';
    }
}
```

The application also provides text feedback to the user when editing their profile:

```javascript
function showError(message, color = 'red') {
    const messageElement = document.getElementById('profile-message');
    messageElement.style.color = color;
    messageElement.textContent = message;
    setTimeout(() => {
        messageElement.textContent = '';
    }, 3000);
}
```

## Conclusion

1. **User Input**: Through form fields and event listeners
2. **Collections**: Using lists to manage interests and followers
3. **Procedures with Algorithms**: Implementing post creation functionality
4. **Program Output**: Visual updates and text feedback