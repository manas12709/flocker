---
layout: post 
search_exclude: true
show_reading_time: false
permalink: /prism/mcqpage
---

<!-- Link to Custom CSS -->
<link rel="stylesheet" href="{{site.baseurl}}/navigation/worlds/style.css">

<header class="heading">
    <h1>Daily Question</h1>
    <p>MCQ Challenge</p>
</header>

<div class="container">
    <!-- Dynamic Question Header -->
    <h2 id="dynamic-question">Choose a topic to begin.</h2>

    <!-- Dropdown Menu for Topics -->
    <div class="dropdown">
        <button class="dropdown-button">Pick a Topic</button>
        <div class="dropdown-content">
            <a href="#" class="topic-link">Technology</a>
            <a href="#" class="topic-link">Health</a>
            <a href="#" class="topic-link">Environment</a>
            <a href="#" class="topic-link">Education</a>
            <a href="#" class="topic-link">History</a>
            <a href="#" class="topic-link">Science</a>
            <a href="#" class="topic-link">Literature</a>
        </div>
    </div>

    <!-- Quiz Container -->
    <div id="quiz-container"></div>
</div>

<footer class="copyright">
    <p>© 2023 Prism. All rights reserved.</p>
</footer>

<script>
document.addEventListener("DOMContentLoaded", () => {
    const quizContainer = document.getElementById("quiz-container");
    const questionHeader = document.getElementById("dynamic-question");
    const topicLinks = document.querySelectorAll(".topic-link");
    let score = 0;
    let timer;

    const topics = {
        Technology: [
            { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlink Text Management Language"], correctAnswer: 0 },
            { question: "What is the function of RAM in a computer?", options: ["Permanent storage", "Temporary storage", "Data transfer"], correctAnswer: 1 },
            { question: "Which programming language is used for Android development?", options: ["Swift", "Java", "Python"], correctAnswer: 1 },
            // Add more questions here
        ],
        Health: [
            { question: "What is the recommended amount of daily water intake?", options: ["1 liter", "2-3 liters", "4 liters"], correctAnswer: 1 },
            { question: "Which vitamin is essential for bone health?", options: ["Vitamin C", "Vitamin D", "Vitamin B12"], correctAnswer: 1 },
            { question: "Which is the most common blood type?", options: ["A", "B", "O"], correctAnswer: 2 },
            // Add more questions here
        ],
        Environment: [
            { question: "What gas do plants produce during photosynthesis?", options: ["Carbon dioxide", "Oxygen", "Nitrogen"], correctAnswer: 1 },
            { question: "Which renewable energy source is derived from the sun?", options: ["Solar energy", "Wind energy", "Hydro energy"], correctAnswer: 0 },
            { question: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Pacific"], correctAnswer: 2 },
            // Add more questions here
        ],
        Education: [
            { question: "What is the largest organ in the human body?", options: ["Brain", "Heart", "Skin"], correctAnswer: 2 },
            { question: "Which branch of mathematics deals with shapes?", options: ["Algebra", "Geometry", "Calculus"], correctAnswer: 1 },
            { question: "Who is the father of modern physics?", options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei"], correctAnswer: 1 },
            // Add more questions here
        ],
        History: [
            { question: "Who was the first President of the United States?", options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson"], correctAnswer: 1 },
            { question: "In which year did World War II end?", options: ["1945", "1939", "1950"], correctAnswer: 0 },
            { question: "Who discovered America?", options: ["Christopher Columbus", "Vasco da Gama", "Marco Polo"], correctAnswer: 0 },
        ],
        Science: [
            { question: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2"], correctAnswer: 0 },
            { question: "What is the speed of light?", options: ["3 × 10^8 m/s", "2.998 × 10^8 m/s", "3 × 10^6 m/s"], correctAnswer: 1 },
            { question: "What planet is known as the Red Planet?", options: ["Mars", "Venus", "Jupiter"], correctAnswer: 0 },
        ],
        Literature: [
            { question: "Who wrote '1984'?", options: ["George Orwell", "H.G. Wells", "Aldous Huxley"], correctAnswer: 0 },
            { question: "Which book starts with the line, 'Call me Ishmael'?", options: ["Moby Dick", "The Great Gatsby", "To Kill a Mockingbird"], correctAnswer: 0 },
            { question: "Who wrote 'Pride and Prejudice'?", options: ["Jane Austen", "Charles Dickens", "Emily Brontë"], correctAnswer: 0 },
        ]
    };

    function startTimer(duration, callback) {
        let timeRemaining = duration;
        const timerDisplay = document.createElement("div");
        timerDisplay.id = "timer";
        timerDisplay.textContent = `Time left: ${timeRemaining}s`;
        quizContainer.appendChild(timerDisplay);

        timer = setInterval(() => {
            timeRemaining--;
            timerDisplay.textContent = `Time left: ${timeRemaining}s`;
            if (timeRemaining <= 0) {
                clearInterval(timer);
                callback();
            }
        }, 1000);
    }

    function createQuiz(questions) {
        quizContainer.innerHTML = '';
        quizContainer.style.display = "block";
        const selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
        score = 0;

        selectedQuestions.forEach((q, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.className = "question";

            questionDiv.innerHTML = `
                <div class="question-box">
                    <p>${index + 1}. ${q.question}</p>
                    ${q.options
                        .map((option, i) => `<label><input type="radio" name="question-${index}" value="${i}" /> ${option}</label>`)
                        .join("<br>")}
                </div>
            `;
            quizContainer.appendChild(questionDiv);
        });

        const submitButton = document.createElement("button");
        submitButton.textContent = "Submit Quiz";
        submitButton.classList.add("submit-button");
        submitButton.addEventListener("click", () => {
            selectedQuestions.forEach((q, index) => {
                const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
                if (selectedOption && parseInt(selectedOption.value) === q.correctAnswer) {
                    score++;
                }
            });
            alert(`Quiz Complete! Your score: ${score}/${selectedQuestions.length}`);
            resetContainers();
        });
        quizContainer.appendChild(submitButton);

        startTimer(60, () => resetContainers()); // 60 seconds timer for each quiz
    }

    function resetContainers() {
        quizContainer.innerHTML = '';
        quizContainer.style.display = "none";
        clearInterval(timer);
    }

    topicLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const topicName = event.target.textContent.trim();
            if (topics[topicName]) {
                questionHeader.textContent = `Quiz on: ${topicName}`;
                createQuiz(topics[topicName]);
            }
        });
    });
});
</script>

<style>
    body {
        margin: 0;
        font-family: 'Arial', sans-serif;
        background-color: #1a1a1a;
        color: #f4f4f4;
    }

    header.heading {
        background-color: #e74c3c;
        text-align: center;
        padding: 40px 0;
    }

    header h1 {
        font-size: 40px;
        margin-bottom: 10px;
    }

    header p {
        font-size: 24px;
    }

    .container {
        padding: 20px;
        max-width: 800px;
        margin: auto;
    }

    .dropdown {
        position: relative;
        display: inline-block;
        margin-bottom: 30px;
    }

    .dropdown-button {
        background-color: #e74c3c;
        color: white;
        padding: 15px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 18px;
        width: 100%;
        text-align: center;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #34495e;
        min-width: 160px;
        z-index: 1;
        border-radius: 5px;
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }

    .dropdown-content a {
        color: #f4f4f4;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }

    .dropdown-content a:hover {
        background-color: #e74c3c;
    }

    #quiz-container {
        display: none;
    }

    .question-box {
        background-color: #2c3e50;
        padding: 20px;
        border-radius: 10px;
        margin-bottom: 20px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }

    .submit-button {
        background-color: #e74c3c;
        color: white;
        padding: 15px 25px;
        font-size: 18px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        display: block;
        margin: auto;
    }

    .submit-button:hover {
        background-color: #c0392b;
    }

    footer {
        background-color: #34495e;
        text-align: center;
        padding: 20px;
        font-size: 14px;
        color: #f4f4f4;
    }
</style>
