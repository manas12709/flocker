---
title: Language CRUD
show_reading_time: false
search_exclude: true
permalink: /prism/language
---

<div class="language-container">
    <h2>Language Tracker</h2>
    <div class="language-form">
        <input type="number" id="language-id" placeholder="Enter language ID" />
        <input type="text" id="language-name" placeholder="Enter language name" />
        <input type="text" id="language-creator" placeholder="Enter creator name" />
        <button onclick="submitLanguage()">Submit Language</button>
        <button onclick="updateLanguage()">Update</button>
        <button onclick="deleteLanguage()">Delete</button>
    </div>
    <div id="last-recorded-language" class="qotd-container">
        <h3>Last Recorded Language:</h3>
        <p id="language-display">No language recorded</p>
        <p id="motivation-message"></p>
    </div>
</div>

<style>
    /* General Layout */
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #1e1e2f;
        color: #fff;
    }

    .language-container {
        max-width: 600px;
        margin: 50px auto;
        padding: 20px;
        background-color:rgb(18, 4, 4);
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        text-align: center;
    }

    h2 {
        font-size: 24px;
        margin-bottom: 20px;
    }

    h3 {
        font-size: 20px;
        margin-top: 30px;
    }

    /* Form Styling */
    .language-form {
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .language-form input {
        padding: 10px;
        font-size: 16px;
        width: 100%;
        border: 1px solid #555;
        border-radius: 5px;
        background-color:rgb(163, 12, 12);
        color: white;
    }

    .language-form input::placeholder {
        color: #aaa;
    }

    button {
        padding: 10px 20px;
        font-size: 16px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #45a049;
    }

    /* Display Section */
    #last-recorded-language {
        margin-top: 20px;
        padding: 15px;
        background-color:rgb(160, 14, 19);
        border-radius: 5px;
    }

    p {
        font-size: 16px;
        margin: 5px 0;
    }
</style>

<script>
    // Function to fetch the last recorded language
    async function fetchLastLanguage() {
        try {
            const response = await fetch('http://127.0.0.1:8887/api/language', {
                method: 'GET',
                credentials: 'include', // Ensure JWT cookie is sent with the request
            });

            if (response.ok) {
                const data = await response.json();
                const language = data[0]; // Accessing the first language in the array
                document.getElementById('language-display').innerText = language.name;
                displayMotivationMessage(language.name);
            } else {
                document.getElementById('language-display').innerText = 'No language recorded';
            }
        } catch (error) {
            document.getElementById('language-display').innerText = 'No language recorded';
        }
    }

    // Function to display motivational message
    function displayMotivationMessage(language) {
        const messageElement = document.getElementById('motivation-message');
        if (language) {
            messageElement.innerText = 'Keep learning new languages!';
        } else {
            messageElement.innerText = 'Start learning a new language today!';
        }
    }

    // Function to submit the language
    async function submitLanguage() {
        const id = document.getElementById('language-id').value;
        const name = document.getElementById('language-name').value;
        const creator = document.getElementById('language-creator').value;

        if (!id || !name || !creator) {
            alert('Please fill out all fields');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8887/api/language', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, name, creator }),
                credentials: 'include',  // Ensure JWT cookie is sent with the request
            });

            if (response.ok) {
                await fetchLastLanguage();  // Fetch and display the updated language after submission
            } else {
                alert('Error submitting language');
            }
        } catch (error) {
            alert('Error submitting language');
        }
    }

    // Function to update the language
    async function updateLanguage() {
        const id = document.getElementById('language-id').value;
        const name = document.getElementById('language-name').value;
        const creator = document.getElementById('language-creator').value;

        if (!id || !name || !creator) {
            alert('Please fill out all fields');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8887/api/language', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, name, creator }),
                credentials: 'include', // Ensure JWT cookie is sent with the request
            });

            if (response.ok) {
                await fetchLastLanguage(); // Refresh language display
            } else {
                alert('Error updating language');
            }
        } catch (error) {
            alert('Error updating language');
        }
    }

    // Function to delete the language
    async function deleteLanguage() {
        const id = document.getElementById('language-id').value;

        if (!id) {
            alert('Please enter the language ID to delete');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8887/api/language', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id }),
                credentials: 'include', // Ensure JWT cookie is sent with the request
            });

            if (response.ok) {
                document.getElementById('language-display').innerText = 'No language recorded';
            } else {
                const errorData = await response.json();
                alert('Error deleting language: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error deleting language:', error);
            alert('Error deleting language: ' + error.message);
        }
    }

    // Fetch the last recorded language on page load
    window.onload = fetchLastLanguage;
</script>