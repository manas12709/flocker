---
title: CodePalette
show_reading_time: false
search_exclude: true
permalink: /prism/language
---
<style>
    body {
        margin: 0;
        font-family: Arial, sans-serif;
        background-color: black;
        color: white;
    }

    header.page {
        background-color: red;
        padding: 20px;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        border-radius: 15px;
    }

    .subtitle {
        margin-top: -10px;
        font-size: 16px;
        color: #ddd;
    }

    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 30px;
    }

    .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color:rgb(0, 0, 0);
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }

    .container h2 {
        font-size: 24px;
        margin-bottom: 20px;
        text-align: center;
    }

    .container label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    .container input {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #555;
        border-radius: 5px;
        background-color:rgb(0, 0, 0);
        color: white;
    }

    .container button {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .container button:hover {
        background-color: #45a049;
    }

    .table-container {
        max-width: 800px;
        margin: 20px auto;
        padding: 20px;
        background-color:rgb(0, 0, 0);
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(156, 21, 21, 0.2);
    }

    .table-container h2 {
        font-size: 24px;
        margin-bottom: 20px;
        text-align: center;
    }

    .table-container table {
        width: 100%;
        border-collapse: collapse;
    }

    .table-container th, .table-container td {
        padding: 10px;
        border: 1px solid #555;
        text-align: left;
    }

    .table-container th {
        background-color: #444;
    }

    .table-container tbody tr:nth-child(even) {
        background-color:rgb(111, 14, 14);
    }
</style>
<header class="page">
    <div class="subtitle">Manage Programming Languages</div>
</header>

<div class="container">
    <h2>Code Submission</h2>
    <form id="language-form">
        <label for="language-id">Language ID:</label>
        <input type="number" id="language-id" placeholder="Enter language ID" required />

        <label for="language-name">Language Name:</label>
        <input type="text" id="language-name" placeholder="Enter language name" required />

        <label for="language-creator">Creator Name:</label>
        <input type="text" id="language-creator" placeholder="Enter creator name" required />

        <label for="language-popularity">Popularity (1-100):</label>
        <input type="number" id="language-popularity" placeholder="Enter popularity" min="1" max="100" required />

        <button type="button" onclick="submitLanguage()">Submit</button>
        <button type="button" onclick="updateLanguage()">Update</button>
        <button type="button" onclick="deleteLanguage()">Delete</button>
    </form>
</div>

<div class="table-container">
    <h2>Code Table</h2>
    <table id="languages-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Creator</th>
                <th>Popularity</th>
            </tr>
        </thead>
        <tbody>
            <!-- Table rows will be populated here -->
        </tbody>
    </table>
</div>

<script>
    async function submitLanguage() {
        const id = document.getElementById('language-id').value;
        const name = document.getElementById('language-name').value;
        const creator = document.getElementById('language-creator').value;
        const popularity = document.getElementById('language-popularity').value;

        if (!id || !name || !creator || !popularity) {
            alert('Please fill out all fields');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8887/api/language', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, name, creator, popularity }),
            });

            if (response.ok) {
                alert('Language submitted successfully');
                fetchLanguages();
            } else {
                alert('Error submitting language');
            }
        } catch (error) {
            alert('Error submitting language');
        }
    }

    async function updateLanguage() {
        const id = document.getElementById('language-id').value;
        const name = document.getElementById('language-name').value;
        const creator = document.getElementById('language-creator').value;
        const popularity = document.getElementById('language-popularity').value;

        if (!id || !name || !creator || !popularity) {
            alert('Please fill out all fields');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8887/api/language', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, name, creator, popularity }),
                credentials: 'include',
            });

            if (response.ok) {
                alert('Language updated successfully');
                fetchLanguages();
            } else {
                alert('Error updating language');
            }
        } catch (error) {
            alert('Error updating language');
        }
    }

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
                credentials: 'include',
            });

            if (response.ok) {
                alert('Language deleted successfully');
                fetchLanguages();
            } else {
                const errorData = await response.json();
                alert('Error deleting language: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error deleting language:', error);
            alert('Error deleting language: ' + error.message);
        }
    }

    async function fetchLanguages() {
        try {
            const response = await fetch('http://127.0.0.1:8887/api/language', {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                const tableBody = document.getElementById('languages-table').getElementsByTagName('tbody')[0];
                tableBody.innerHTML = '';

                data.forEach(language => {
                    const row = tableBody.insertRow();
                    row.insertCell(0).innerText = language.id;
                    row.insertCell(1).innerText = language.name;
                    row.insertCell(2).innerText = language.creator;
                    row.insertCell(3).innerText = language.popularity;
                });
            } else {
                alert('Error fetching languages');
            }
        } catch (error) {
            alert('Error fetching languages');
        }
    }

    // Initialize the page
    window.onload = fetchLanguages;
</script>