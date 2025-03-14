---
layout: post 
search_exclude: true
show_reading_time: false
permalink: /pranavfeatureblog
title: Pranav's Project Feature Blog
categories: [Pranav Final Retrospective]
---

# **Code Palette: Key Features & Implementation**

## **1. Full-Stack Implementation**

![Code Palette Architecture](https://github.com/user-attachments/assets/8651ea1e-9677-4009-afc5-244a61643384)

The **Code Palette** project is a full-stack web application that integrates the following technologies:

- **Backend:** Flask (Python) for API handling.
- **Frontend:** JavaScript for UI interaction.
- **Database:** SQLite3 with SQLAlchemy for structured data storage.

This project enables users to store, update, and manage a database of programming languages in an interactive manner.

---

## **2. Backend API (Flask)**

The backend provides a **REST API** using Flask-RESTful and secures requests using **JWT authentication**. It supports **CRUD (Create, Read, Update, Delete)** operations on code palette entries.

### **Endpoints Overview:**

| Method | Endpoint          | Description                       |
|--------|------------------|-----------------------------------|
| POST   | `/api/language`  | Create a new code palette entry  |
| GET    | `/api/language`  | Retrieve all code palettes       |
| PUT    | `/api/language`  | Update an existing entry         |
| DELETE | `/api/language`  | Remove an entry from the database |

### **API Implementation Highlights:**

```python
# Selection algorithm in API for input validation
@token_required()
def post(self):
    body = request.get_json()
    name = body.get('name')
    creator = body.get('creator')
    popularity = body.get('popularity', 0)

    # Selection for required fields
    if not name or not creator:
        return {'message': 'Name and creator are required'}, 400

    try:
        new_language = Language(name=name, creator=creator, popularity=popularity)
        new_language.create()
        return jsonify({'message': 'Language added successfully', 'language': new_language.read()})
    except Exception as e:
        return {'message': 'Failed to create language', 'error': str(e)}, 500
```

```python
# List processing with iteration in API GET method
@token_required()
def get(self):
    try:
        languages = Language.query.all()
        # List comprehension - demonstration of iteration
        return jsonify([language.read() for language in languages])
    except Exception as e:
        return {'message': 'Failed to retrieve languages', 'error': str(e)}, 500
```

---

## **3. Database Management (SQLAlchemy)**

The application uses **SQLAlchemy** to define and manage the relational database. Each code palette entry consists of:

- `id`: Unique identifier (Primary Key).
- `name`: Name of the programming language.
- `creator`: Creator of the programming language.
- `popularity`: Popularity score (integer).

### **Model Definition Highlights:**

```python
# Basic model structure for Language object
class Language(db.Model):
    __tablename__ = 'languages'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    creator = db.Column(db.String(255), nullable=False)
    popularity = db.Column(db.Integer, default=0)

    def __init__(self, name, creator, popularity=0):
        self.name = name
        self.creator = creator
        self.popularity = popularity
```

### **Database Initialization Procedure:**

```python
# Student-developed procedure with a list, selection, and iteration
def initLanguages():
    with app.app_context():
        db.create_all()
        
        # List storing multiple language objects
        tester_data = [
            Language(name='Python', creator='Guido van Rossum', popularity=500),
            Language(name='JavaScript', creator='Brendan Eich', popularity=400),
            Language(name='Java', creator='James Gosling', popularity=300),
            Language(name='C++', creator='Bjarne Stroustrup', popularity=350),
            Language(name='Ruby', creator='Yukihiro Matsumoto', popularity=200)
        ]
        
        # Iteration algorithm processing each item in the list
        for data in tester_data:
            try:
                # Selection algorithm with try/except for error handling
                db.session.add(data)
                db.session.commit()
                print(f"Record created: {repr(data)}")
            except Exception as e:
                db.session.rollback()
                print(f"Error creating record for language {data.name}: {e}")
```

### **Restore Method with Parameter:**

```python
# Procedure with parameter demonstrating selection and iteration
@staticmethod
def restore(data):
    with app.app_context():
        db.session.query(Language).delete()
        db.session.commit()

        restored_classes = {}
        
        # Iteration through the parameter data list
        for language_data in data:
            language = Language(
                name=language_data['name'],
                creator=language_data['creator'],
                popularity=language_data.get('popularity', 0)
            )
            language.create()
            restored_classes[language_data['id']] = language
        
        return restored_classes
```

---

## **4. Frontend (JavaScript & HTML)**

The frontend provides a **user-friendly interface** that enables users to interact with the database. It includes:

- **Form Fields:** Inputs for programming language details.
- **Buttons:** Create, Update, Delete, Fetch operations.
- **Dynamic UI Updates:** JavaScript updates the page without reloading.

### **Frontend JavaScript Example:**

```javascript
// Procedure for fetching languages with selection and iteration
async function fetchLanguages() {
    try {
        const response = await fetch('/api/language', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
        
        // Selection to handle response status
        if (!response.ok) {
            throw new Error('Failed to fetch languages');
        }
        
        const data = await response.json();
        const displayElement = document.getElementById('language-display');
        
        // Selection to check if any languages were returned
        if (data.length === 0) {
            displayElement.innerHTML = '<p>No languages found.</p>';
            return;
        }
        
        let tableHTML = '<table class="language-table"><tr><th>Name</th><th>Creator</th><th>Popularity</th><th>Actions</th></tr>';
        
        // Iteration through list of languages
        for (const language of data) {
            tableHTML += `
                <tr>
                    <td>${language.name}</td>
                    <td>${language.creator}</td>
                    <td>${language.popularity}</td>
                    <td>
                        <button onclick="editLanguage(${language.id})">Edit</button>
                        <button onclick="deleteLanguage(${language.id})">Delete</button>
                        <button onclick="upvoteLanguage(${language.id})">Upvote</button>
                    </td>
                </tr>
            `;
        }
        
        tableHTML += '</table>';
        displayElement.innerHTML = tableHTML;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('language-display').innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
}
```

---

## **5. CPT Requirements & Key Concepts**

This project aligns with **College Board's Create Performance Task (CPT) requirements** by demonstrating:

### **CPT Requirements Table**

| CPT Requirement         | Feature Embodying the Requirement | How this feature fulfills the requirement |
|-------------------------|-----------------------------------|------------------------------------------|
| A list                 | `tester_data` array of Language objects | Stores multiple language entries in structured format |
| A procedure with parameter(s) | `restore(data)` method | Takes data parameter to restore languages from backup |
| A procedure with algorithm | `initLanguages()` function    | Contains sequencing, selection, and iteration |
| A call to the procedure | Application startup code      | `initLanguages()` called during initialization |
| Selection algorithm | API input validation | `if not name or not creator: return {'message': 'Name and creator are required'}, 400` |
| Iteration algorithm | Database processing loop | `for data in tester_data: db.session.add(data)` |

---

## **6. Personalized Project Reference (PPR)**

This section contains code segments from my Code Palette project that demonstrate required programming concepts for the AP CSP exam.

### **Procedure Implementation & Call**

#### **Procedure Implementation:**
The following code segment shows my student-developed procedure:

```python
def initLanguages():
    with app.app_context():
        db.create_all()
        tester_data = [
            Language(name='Python', creator='Guido van Rossum', popularity=500),
            Language(name='JavaScript', creator='Brendan Eich', popularity=400),
            Language(name='Java', creator='James Gosling', popularity=300)
        ]
        
        for data in tester_data:
            try:
                db.session.add(data)
                db.session.commit()
                print(f"Record created: {repr(data)}")
            except Exception as e:
                db.session.rollback()
                print(f"Error creating record for language {data.name}: {e}")
```

This procedure:
- Has a defined name `initLanguages()`
- Uses parameters implicitly (the global `app` context)
- Implements algorithmic components:
  - **Sequencing**: Operations performed in order
  - **Selection**: `try/except` block checks for errors
  - **Iteration**: `for data in tester_data` loop processes each entry

#### **Procedure Call:**
The procedure is called during application startup:

```python
if __name__ == "__main__":
    initLanguages()  # Initialize the database with test data
    app.run(debug=True, host="0.0.0.0", port="8086")
```

### **List Usage for Managing Complexity**

#### **List Data Storage:**
The following code segment demonstrates list data storage:

```python
tester_data = [
    Language(name='Python', creator='Guido van Rossum', popularity=500),
    Language(name='JavaScript', creator='Brendan Eich', popularity=400),
    Language(name='Java', creator='James Gosling', popularity=300)
]
```

This list manages complexity by organizing multiple Language objects in a structured collection.

#### **List Data Processing:**
The API demonstrates list processing with a list comprehension:

```python
@token_required()
def get(self):
    try:
        languages = Language.query.all()
        return jsonify([language.read() for language in languages])
    except Exception as e:
        return {'message': 'Failed to retrieve languages', 'error': str(e)}, 500
```

This code:
- Retrieves all language entries from the database
- Uses a list comprehension to process each item
- Creates a JSON response from the data
- Manages complexity by organizing multiple objects into a structured response

---

## **Conclusion**

The **Code Palette** project demonstrates full-stack development principles with a focus on **database management, RESTful APIs, and frontend integration**. It adheres to **College Board CPT guidelines** by implementing:

1. **Lists** for data organization and management
2. **Procedures** with proper implementation of algorithms
3. **Selection** for data validation and error handling
4. **Iteration** for processing multiple data entries

This project goes beyond the code presented here, including additional features such as:

- **JWT Authentication** for secure API access
- **User Interface Components** for interactive data manipulation
- **Error Handling** throughout the application stack
- **Data Persistence** with proper database interactions
- **Custom Endpoints** for specialized operations like popularity tracking
- **Responsive Design** for cross-device compatibility
- **Database Backup and Restore** capabilities

The combination of backend and frontend components creates a complete application that demonstrates comprehensive programming concepts required for the AP Computer Science Principles exam while providing practical functionality for managing programming language information.

| Category                          | Points | Description                                                                                                                                                       | Self Grade |
| --------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| **Full Stack Project Demo**       | 2      | Demonstrate the project, highlight CPT requirements, and incorporate N@tM feedback. | 1.95          |
| **Project Feature Blog Write-up** | 1      | Use CPT/FRQ language to write a structured blog post on project features.                                                                                        | 0.95       |