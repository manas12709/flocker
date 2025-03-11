---
layout: post 
search_exclude: true
show_reading_time: false
permalink: /anvayfeatureblog
title: Anvay's Project Feature Blog
categories: [Anvay Final Retrospective]
---

# **Purpose of My Program**

Prism is an innovative social media platform where users create customizable "Worlds" to represent their identities, collaborate with others, and connect through shared experiences. My individual contribution focused on implementing a dynamic voting system that enhances user engagement by allowing upvotes and downvotes on content. This system ensures that users have control over the type of content they see in their feed, refining the platform’s recommendation algorithm.

---

## **Handling Input and Output**

### **Input Mechanism: User Voting**

User input is handled through API requests that capture voting actions. The following JavaScript function sends an HTTP request when a user upvotes or downvotes a post:

```javascript
async function submitVote(postId, voteType) {
    try {
        const response = await fetch(`${pythonURI}/api/vote`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ post_id: postId, vote_type: voteType })
        });
        
        if (!response.ok) throw new Error('Vote submission failed');
        
        const result = await response.json();
        console.log('Vote recorded:', result);
    } catch (error) {
        console.error('Error submitting vote:', error);
    }
}
```

- The function constructs a POST request, sending the `post_id` and `vote_type` as JSON data.
- Error handling ensures failed requests do not disrupt user experience.

### **Output Mechanism: Displaying Vote Counts**

- Votes are retrieved from the backend and displayed dynamically on the frontend. If the user downvotes, the item is not shown on the feed, and vice versa. 

---

## **Managing Complexity with Lists and Collections**

Lists play a crucial role in efficiently handling vote data. Below, the backend retrieves and organizes votes using Python lists:

```python
class _POST_VOTES(Resource):
    def get(self):
        post_id = request.args.get('post_id')
        if not post_id:
            return {'message': 'Post ID required'}, 400
        
        votes = Vote.query.filter_by(_post_id=post_id).all()
        upvotes = [vote.read() for vote in votes if vote._vote_type == 'upvote']
        downvotes = [vote.read() for vote in votes if vote._vote_type == 'downvote']
        
        return jsonify({
            "post_id": post_id,
            "upvote_count": len(upvotes),
            "downvote_count": len(downvotes),
            "total_votes": len(votes),
            "upvotes": upvotes,
            "downvotes": downvotes
        })
```

- The `upvotes` and `downvotes` lists filter vote objects efficiently.
- The response aggregates total votes while preserving individual user data for analytics.

---

## **Student-Developed Procedure**

A core procedure in the backend processes user votes while ensuring data integrity:

```python
    @staticmethod
    def restore(data):
        restored_classes = {}

        for vote_data in data:
            existing_vote = Vote.query.filter_by(
                _user_id=vote_data['user_id'], _post_id=vote_data['post_id']
            ).first()

            if existing_vote:
                # If vote exists, update it if needed (optional)
                if existing_vote._vote_type != vote_data['vote_type']:
                    existing_vote.update(vote_data['vote_type'])
                restored_classes[vote_data['id']] = existing_vote
            else:
                # If vote doesn't exist, create a new one
                vote = Vote(vote_data['vote_type'], vote_data['user_id'], vote_data['post_id'])
                vote.create()
                restored_classes[vote_data['id']] = vote

        return restored_classes
```

### **Procedure Breakdown**
- **Selection:** If a vote already exists, it updates the record instead of creating duplicates.
- **Iteration:** The function iterates over database queries to maintain vote consistency.

This approach ensures that each user has a single vote per post, preventing spamming and manipulation.

---

## **Algorithmic Implementation**

The following API route integrates sequencing, selection, and iteration to handle vote updates:

```python
    class _POST_VOTES(Resource):
            # Get all votes for the post
            votes = Vote.query.filter_by(_post_id=post_id).all()
            upvotes = [vote.read() for vote in votes if vote._vote_type == 'upvote']
            downvotes = [vote.read() for vote in votes if vote._vote_type == 'downvote']

            result = {
                "post_id": post_id,
                "upvote_count": len(upvotes),
                "downvote_count": len(downvotes),
                "total_votes": len(votes),
                "upvotes": upvotes,
                "downvotes": downvotes
            }
            return jsonify(result)
```

**Explanation:**
- The function sequences calls to fetch data, process it, and update the DOM.
- It uses conditional logic (`if`) to determine visibility for each section.
- Iteration ensures all sections are processed efficiently.
- Output type is shown in JSON

---

## **Testing and Debugging Methods**

### **Testing with Postman**
During development, Postman was used to verify API responses:

#### **Test Request:**
```json
{
    "post_id": 5,
    "vote_type": "upvote"
}
```

#### **Expected Response:**
```json
{
    "id": 12,
    "vote_type": "upvote",
    "user_id": 1,
    "post_id": 5
}
```

### **Common Errors and Fixes**

| **Error** | **Cause** | **Solution** |
|-----------|----------|-------------|
| `400 Bad Request` | Missing `post_id` or `vote_type` | Ensure both fields are sent in JSON request. |
| `500 Internal Server Error` | Database connection issue | Verify DB connection and retry. |
| `403 Forbidden` | Unauthorized user action | Implement authentication checks. |

---

## N@TM Feeback Incorporation

I recieved some verbal feeback during N@TM of some features that I could implement and UI improvements, which I incorporated. 

A few include:
- Clicking on the leaderboard to view names of each interest.
- Making upvote/downvote buttons look more appealing and visible. 
- Reset feed button (incorported that with the delete function from CRUD).

---

# PPR Code Snippets

A PPR is created to assist in responding to the written response prompts on exam day. The goal of the PPR is to submit required portions of your code by capturing and pasting program code segments you developed during the administration of this task.


PPR Submission Requirements:
- Your code segments should not include any comments. 
- Screen captures should not be blurry.
- Text should be at least 10-point font size.

--

PPR Snippet Requirements:
- Two Procedure "Program Codes"
  - The first program code segment must be a student-developed procedure that:
    - Defines the procedure’s name and return type (if necessary)
    - Contains and uses one or more parameters that have an effect on the functionality of the procedure
    - Implements an algorithm that includes sequencing, selection, and iteration
  - The second program code segment must show where your student-developed procedure is being called in your program.
- Two List "Program Codes"
 - The first program code segment must show how data have been stored in the list.
 - The second program code segment must show the data in the same list being used.


## Prodecure Program Code 1

![alt text]({{site.baseurl}}/images/pics/image.png)

Explaination:
- **Procedure:** Called "restore"
- **Return type:** List - List of restored Vote objects.
- **Parameter:** Data (list) - List of dictionaries containing vote data.
- **Sequencing:** First defines an empty dictionary for restored classes. Then, iterates through votes to determine if it is already existing. Then, if it already exists, it will fix inconsistences. Otherwise, it will add the vote. 
- **Selection:** If a vote already exists, it updates the record instead of creating duplicates. SELECTS only erased votes using a `for` loop.
- **Iteration:** The function iterates over database queries to maintain vote consistency. ITERATES using an `if` statement.

## Procedure Program Code 2

![alt text]({{site.baseurl}}/images/pics/image1.png)

Explaination: 
- This procedure is called when the user wants to restore data. It will accept the vote data as an argument and procede. 

## List Program Code 1

![alt text]({{site.baseurl}}/images/pics/image2.png)

Explaination: 
- The `upvotes` and `downvotes` lists are populated by filtering all votes based on their type.
- Each vote's data is added to the corresponding list using list comprehension.

## List Program Code 2

![alt text]({{site.baseurl}}/images/pics/image3.png)

Explaination:
- Upvotes List: Iterates over each vote in `data.upvotes` and pushes the post_id (converted to an integer) into the `voteData.upvotes` list.
- Downvotes List: Iterates over each vote in `data.downvotes` and pushes the post_id (converted to an integer) into the `voteData.downvotes` list.

-- 

I have included all of this information on the CPT guide that I created for my team before the final check: https://illuminati1618.github.io/prism_frontend/cptguide