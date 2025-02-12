---
layout: post
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
        margin-bottom: 30px;
    }

    .subtitle {
        margin-top: -10px;
        font-size: 16px;
        color: #ddd;
    }

    .main {
        display: flex;
        justify-content: space-between;
        margin: 20px auto;
        padding: 20px;
        max-width: 1200px;
        gap: 30px;
    }

    .left-column {
        width: 48%;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .right-column {
        width: 48%;
        display: flex;
        flex-direction: column;
    }

    .container {
        background-color: rgb(0, 0, 0);
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        padding: 20px;
        color: white;
    }

    .container h2 {
        font-size: 20px;
        margin-bottom: 15px;
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
        margin-bottom: 15px;
        border: 1px solid #555;
        border-radius: 5px;
        background-color: rgb(0, 0, 0);
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
        background-color: rgb(0, 0, 0);
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(156, 21, 21, 0.2);
        padding: 20px;
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
        background-color: rgb(111, 14, 14);
    }

    .form-actions {
        display: flex;
        gap: 20px;
    }

    .form-actions button {
        width: 100%;
    }
</style>

<script type="module">
    import { pythonURI, fetchOptions } from "{{site.baseurl}}/assets/js/api/config.js";

    async function checkAuthorization() {
        try {
            const response = await fetch(`${pythonURI}/api/id`, fetchOptions);

            if (response.status === 401) {
                window.location.href = "{{site.baseurl}}/login";
            } else if (response.ok) {
                const contentElements = document.querySelectorAll('.content');
                contentElements.forEach(element => {
                    element.style.display = "block";
                });
            }
        } catch (error) {
            console.error("Authorization check failed:", error);
            window.location.href = "{{site.baseurl}}/login";
        }
    }

    checkAuthorization();
</script>

<header class="page">
    <div class="subtitle">Manage Programming Languages</div>
</header>

<!-- Main content area with two columns -->
<div class="main">

    <!-- Left Column: CRUD Functions (Vertical) -->
    <div class="left-column">

        <!-- Submit, Update, and Delete forms inside one table -->
        <div class="container">
            <h2>Submit, Update, and Delete a Language</h2>
            <form id="crud-form">
                <label for="language-id">Language ID</label>
                <input type="number" id="language-id" placeholder="Enter ID" required />

                <label for="language-name">Language Name</label>
                <input type="text" id="language-name" placeholder="Enter name" required />

                <label for="language-creator">Creator Name</label>
                <input type="text" id="language-creator" placeholder="Enter creator" required />

                <label for="language-popularity">Popularity (1-100)</label>
                <input type="number" id="language-popularity" placeholder="Enter popularity" min="1" max="100" required />

                <div class="form-actions">
                    <button type="button" onclick="submitLanguage()">Submit</button>
                    <button type="button" onclick="updateLanguage()">Update</button>
                    <button type="button" onclick="deleteLanguage()">Delete</button>
                </div>
            </form>
        </div>

    </div>

    <!-- Right Column: CodePalette Table -->
    <div class="right-column">
        <div class="table-container">
            <h2>Language List</h2>
            <table id="languages-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Creator</th>
                        <th>Popularity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Table rows will be populated dynamically -->
                </tbody>
            </table>
        </div>
    </div>

</div>

<script type="module">
    import { pythonURI, fetchOptions } from "{{site.baseurl}}/assets/js/api/config.js";

    // Function to submit new language
    window.submitLanguage = async function submitLanguage() {
        const id = document.getElementById('language-id').value;
        const name = document.getElementById('language-name').value;
        const creator = document.getElementById('language-creator').value;
        const popularity = document.getElementById('language-popularity').value;

        if (!id || !name || !creator || !popularity) {
            alert('Please fill out all fields');
            return;
        }

        try {
            const response = await fetch(`${pythonURI}/api/language`, {
                ...fetchOptions,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, name, creator, popularity })
            });

            if (response.ok) {
                alert('Language submitted successfully');
                fetchLanguages();
            } else {
                alert('Error submitting language');
            }
        } catch (error) {
            console.error('Error submitting language:', error);
            alert('Error submitting language');
        }
    };

    // Function to update a language
    window.updateLanguage = async function updateLanguage() {
        const id = document.getElementById('language-id').value;
        const name = document.getElementById('language-name').value;
        const creator = document.getElementById('language-creator').value;
        const popularity = document.getElementById('language-popularity').value;

        const payload = { id, name, creator, popularity };

        try {
            const response = await fetch(`${pythonURI}/api/language`, {
                ...fetchOptions,
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert('Language updated successfully');
                fetchLanguages();
            } else {
                alert('Error updating language');
            }
        } catch (error) {
            console.error('Error updating language:', error);
            alert('Error updating language');
        }
    };

    // Function to delete a language
    window.deleteLanguage = async function deleteLanguage() {
        const id = document.getElementById('language-id').value;

        try {
            const response = await fetch(`${pythonURI}/api/language`, {
                ...fetchOptions,
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });

            if (response.ok) {
                alert('Language deleted successfully');
                fetchLanguages();
            } else {
                alert('Error deleting language');
            }
        } catch (error) {
            console.error('Error deleting language:', error);
            alert('Error deleting language');
        }
    };

    // Function to fetch and display the list of languages
    async function fetchLanguages() {
        try {
            const response = await fetch(`${pythonURI}/api/language`, fetchOptions);

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

                    const actionsCell = row.insertCell(4);
                    const selectButton = document.createElement('button');
                    selectButton.innerText = 'Select';
                    selectButton.onclick = () => {
                        document.getElementById('language-id').value = language.id;
                        document.getElementById('language-name').value = language.name;
                        document.getElementById('language-creator').value = language.creator;
                        document.getElementById('language-popularity').value = language.popularity;
                    };
                    actionsCell.appendChild(selectButton);
                });
            } else {
                alert('Error fetching languages');
            }
        } catch (error) {
            alert('Error fetching languages');
        }
    }

    window.onload = fetchLanguages;
</script>