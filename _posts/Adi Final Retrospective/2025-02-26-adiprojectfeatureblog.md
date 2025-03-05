---
layout: post 
search_exclude: true
show_reading_time: false
permalink: /adifeatureblog
title: Adi's Project Feature Blog
categories: [Adi Final Retrospective]
---

# The Prism Polls Feature

### What is the point of prism polls?
Prism polls allow users to engage with their community and learn about other people in their network and how they responded to certain polls.

## Frontend:
![frontpic](https://github.com/user-attachments/assets/76953752-57e7-4335-80fd-f40894848e3b)

This dedicated page for the polls feature has functionality to perform all for crud operations **only on the user you're logged in as** (for example, if you are logged in as hop you can't edit toby's posts). As you submit your poll questions, the prompt will automatically shift thru each of the questions (ex. what is your fav book? or what is your fav movie genre?). When you submit a response to the poll, it will automatically save the question as well as the response. And finally, you can edit and delete posts you have made and what you had written persists.
# CPT Requirements and code snippets:

| **Feature**         | A list or database | A procedure | A call to the procedure | Selection | Iteration |
|-------------------------|--------|-------------|-------------------------|-----------|-----------|
| Quick Polls             |   X     |  X           |                   X      | X          |    X       |

## Code snippets showcasing these requirements:

```python
class PollAPI:
    class _Read(Resource): # R = Read
        """
        GET request handler: Read all polls.
        """
        @token_required()
        def get(self):
            try:
                # Retrieve all poll records
                polls = Poll.query.all()
                poll_list = []
                for poll in polls:
                    poll_list.append(poll.read())
                return jsonify(poll_list)
            except Exception as e:
                print(f"Poll Read Error: {e}")
                return {'message': f'Error retrieving poll data: {str(e)}'}, 500

api.add_resource(PollAPI._Read, '/poll')
```
<br>
```python
def post(self):
    try:
        data = request.get_json()
        if not data:
            return {'message': 'No input data provided'}, 400

        name = data.get('name')
        interests = data.get('interests')

        # Basic validation
        if not name or interests is None:
            return {'message': 'name and interests fields are required.'}, 422

        # Create and save the new Poll
        new_poll = Poll(name, interests)
        new_poll.create()

        return {'message': 'Poll data inserted successfully'}, 201

    except KeyError as e:
        return {'message': f'Missing field: {str(e)}'}, 400
    except Exception as e:
        print(f"Poll Create Error: {e}")
        return {'message': f'Error inserting poll data: {str(e)}'}, 500
```

<br>

```html
<button class="popup-button" onclick="showPopup()">Show Poll Instructions</button>
<div id="popup" class="popup">
    <div class="popup-content">
<!-- Popup content goes here -->
    </div>
</div>
<script>
function showPopup() {
    const popup = document.getElementById('popup');
    const closeBtn = popup.querySelector('.close');
    popup.style.display = 'block';

    closeBtn.onclick = function() {
        popup.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    };
}
</script>
```

## Frontend to Backend:
Fetch poll data and group by name:

```javacript
try {
    const response = await fetch(`${pythonURI}/api/poll`, fetchOptions);
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    console.log('Fetched polls:', data);

    // Group polls by author name
    const groupedPolls = {};
    data.forEach(item => {
        if (!groupedPolls[item.name]) {
            groupedPolls[item.name] = [];
        }
        groupedPolls[item.name].push(item);
    });
```

Edit Poll Response:

```javascript
try {
    const response = await fetch(`${pythonURI}/api/poll`, {
        ...fetchOptions,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    console.log('Poll updated:', data);
    location.reload();
```

The backend contains APIs and it uses a Flask as a web framework. It secures requests using a JWT token and a session token, and it supports each of the CRUD operations.

## Using postman to show raw API request and RESTful response

Create:
<img src="https://adik1025.github.io/adi_student/images/add.png">
Read:
<img src="https://adik1025.github.io/adi_student/images/read.png">
Update:
<img src="https://adik1025.github.io/adi_student/images/update.png">
Delete:
<img src="https://adik1025.github.io/adi_student/images/delete.png">