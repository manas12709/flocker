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

---

## Create Performance Task (CPT) Requirements and Personalized Project Reference (PPR)
<br>
[PDF of Requirements](https://apcentral.collegeboard.org/media/pdf/ap-csp-student-task-directions.pdf)

---

This dedicated page for the polls feature has functionality to perform all four CRUD operations **only on the user you're logged in as** (for example, if you are logged in as hop you can't edit toby's posts). As you submit your poll questions, the prompt will automatically shift through each of the questions (ex. what is your favorite book? or what is your favorite movie genre?). When you submit a response to the poll, it will automatically save the question as well as the response. And finally, you can edit and delete posts you have made, and what you had written persists.

# CPT Requirements and code snippets:

|      A list or database | A procedure | A call to the procedure | Selection | Iteration | Sequencing | Input from User |
|--------------------|------------|-------------------------|-----------|-----------|------------|-----------------|
|     ✓     |   ✓                |  ✓         |  ✓                      |  ✓        |    ✓      |     ✓      |      ✓          |

## 1. Database

Prism Polls stores its data (poll questions and responses) in a database. Using SQLAlchemy or a similar ORM, each Poll record includes:

- An `id` field (primary key).
- A `name` field (the user or poll name).
- An `interests` or `question` field (the actual poll question/response).

```python
class Poll(db.Model):
    __tablename__ = 'polls'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    interests = db.Column(db.String(255), nullable=False)

    def __init__(self, name, interests):
        self.name = name
        self.interests = interests

    def create(self):
        db.session.add(self)
        db.session.commit()
```

### 2. A Procedure

A procedure encapsulates a series of steps to complete a task. In Prism Polls, the POST endpoint of our API is a procedure that handles poll creation by validating input and saving a new poll record. Here’s an example from the `_Create` resource:

```python
class _Create(Resource):  # C = Create
    """
    POST request handler: Create a new poll.
    """
    @token_required()
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
This procedure is responsible for processing the input, validating it, and then committing the new poll record to the database.

### 3. A Call to the Procedure
A call to a procedure triggers its execution. In our frontend JavaScript, when a user submits a poll via a form, the following snippet makes a POST request to call the poll creation procedure:
```javascript
const payload = { name: username, interests: finalInterests };

const response = await fetch(`${pythonURI}/api/poll`, {
    ...fetchOptions,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
});

if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
}
const data = await response.json();
console.log('Poll created:', data);
```
This call connects the user’s action on the frontend with the backend procedure that handles poll creation.

### 4. Selection
Selection is implemented through conditional statements that allow the program to decide between different execution paths. The poll creation procedure includes selection logic to ensure valid input before processing:

```python
if not name or interests is None:
    return {'message': 'name and interests fields are required.'}, 422
```
Similarly, in the update procedure, the code selectively updates fields if new data is provided:

```python
if name:
    poll.name = name
if interests is not None:
    poll.interests = interests
```
These conditional checks ensure that only valid and intended changes are applied to the poll data.

### 5. Iteration

Iteration is used to process multiple data items. When reading all polls, the API iterates over the poll records to compile a list for the response:

```python
polls = Poll.query.all()
poll_list = []
for poll in polls:
    poll_list.append(poll.read())
return jsonify(poll_list)
```
On the frontend, iteration is employed to group polls by author:

const groupedPolls = {};
data.forEach(item => {
    if (!groupedPolls[item.name]) {
        groupedPolls[item.name] = [];
    }
    groupedPolls[item.name].push(item);
});
These examples show how iteration enables efficient processing and grouping of poll data.

### 6. Sequencing
Sequencing is the logical ordering of operations. In our API’s update procedure, a clear sequence is followed to update a poll record:

```python
def process_poll_update(data):
    # 1. Validate input
    if 'id' not in data:
         return {'message': 'Poll ID required'}, 400
    # 2. Retrieve the poll record
    poll = Poll.query.get(data['id'])
    if not poll:
         return {'message': 'Poll not found'}, 404
    # 3. Update poll details if provided
    if 'name' in data:
         poll.name = data['name']
    else:
         poll.name = poll.name

    if 'interests' in data:
         poll.interests = data['interests']
    else:
         poll.interests = poll.interests

    # 4. Commit the changes
    poll.update({"name": poll.name, "interests": poll.interests})
    return {'message': 'Poll updated successfully'}, 200
```
This snippet shows how steps are executed in a defined order to ensure data integrity during updates.

### 7. Input from User
Capturing input from the user is crucial for personalization. The Prism Polls feature collects user responses via interactive HTML forms. For example:

```html
Capturing input from the user is crucial for personalization. The Prism Polls feature collects user responses via interactive HTML forms. For example:
```
This form captures user input, which is then processed and sent to the backend for poll creation. The use of input fields ensures that users can directly interact with the application, satisfying the input from user requirement.

By integrating these CPT components with clear, focused code snippets, Prism Polls not only meets AP CSP requirements but also demonstrates a practical, user-centric approach to web application development. This design, inspired by established practices in full-stack projects like the Step Tracker, provides a robust framework for interactive and secure community engagement.