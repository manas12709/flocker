---
layout: post 
search_exclude: true
show_reading_time: false
permalink: /prism/ourteam
---

## Our Team

<div id="team-table"></div>

<script>
async function fetchTeamInfo() {
    try {
        const response = await fetch('http://127.0.0.1:8887/api/members');
        const data = await response.json();
        const teamData = data.students;
        displayTeamInfo(teamData);
    } catch (error) {
        console.error('Error fetching team info:', error);
    }
}

function displayTeamInfo(teamData) {
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    
    // Define the headers
    const headers = ['FirstName', 'LastName', 'DOB', 'Email', 'Residence', 'Owns_Cars'];
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    teamData.forEach(member => {
        const row = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            if (Array.isArray(member[header])) {
                td.textContent = member[header].join(', ');
            } else {
                td.textContent = member[header];
            }
            row.appendChild(td);
        });
        table.appendChild(row);
    });

    document.getElementById('team-table').appendChild(table);
}

fetchTeamInfo();
</script>

<style>
#team-table table {
    font-family: Arial, sans-serif;
    font-size: 14px;
    margin-top: 20px;
}

#team-table th {
    font-weight: bold;
    color: #333;
}

#team-table tr:nth-child(even) {
    background-color: #f9f9f9;
}

#team-table tr:hover {
    background-color: #f1f1f1;
}
</style>
