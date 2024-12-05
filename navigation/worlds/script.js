document.addEventListener("DOMContentLoaded", () => {
    const topics = {
        Technology: [
            { question: "What is the purpose of blockchain technology?", options: ["Data storage", "Decentralization", "Social networking", "Programming"], correctAnswer: 1 },
            { question: "Which programming language is primarily used for AI?", options: ["C++", "Python", "HTML", "Ruby"], correctAnswer: 1 },
            { question: "Who is considered the father of computer science?", options: ["Alan Turing", "Bill Gates", "Tim Berners-Lee", "Ada Lovelace"], correctAnswer: 0 },
            { question: "What does 'IoT' stand for?", options: ["Internet of Technology", "Internet of Things", "Integration of Technology", "Internal Operations Tool"], correctAnswer: 1 },
            { question: "What is Moore's Law?", options: ["A programming principle", "A hardware scalability law", "A design paradigm", "An AI theorem"], correctAnswer: 1 },
            // More questions for the Technology pool...
        ],
        Environment: [
            { question: "What is the primary cause of ocean acidification?", options: ["Carbon emissions", "Overfishing", "Oil spills", "Deforestation"], correctAnswer: 0 },
            { question: "Which renewable energy source is the most efficient?", options: ["Wind", "Solar", "Hydro", "Geothermal"], correctAnswer: 2 },
            { question: "What is the largest contributor to global warming?", options: ["Livestock", "Fossil fuels", "Nuclear power", "Plastic waste"], correctAnswer: 1 },
            // More questions for the Environment pool...
        ],

        Health: [
            { question: "Which vitamin is primarily responsible for maintaining healthy skin?", options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E"], correctAnswer: 1, explanation: "Vitamin C is crucial for collagen production, which keeps skin healthy." },
            { question: "What is the recommended amount of sleep for teenagers?", options: ["4-5 hours", "6-7 hours", "8-10 hours", "12+ hours"], correctAnswer: 2, explanation: "Teens need 8-10 hours of sleep for optimal health and growth." },
            { question: "Which of the following is a common symptom of dehydration?", options: ["Headache", "Frequent urination", "Skin rash", "Cough"], correctAnswer: 0, explanation: "Headache is a common symptom of dehydration, caused by insufficient fluid intake." },
            { question: "Which nutrient is vital for bone health?", options: ["Calcium", "Iron", "Vitamin A", "Magnesium"], correctAnswer: 0, explanation: "Calcium is essential for building and maintaining strong bones." },
            { question: "What is the main source of energy for the human body?", options: ["Carbohydrates", "Proteins", "Fats", "Vitamins"], correctAnswer: 0, explanation: "Carbohydrates provide the body with the primary source of energy." },
            { question: "What is the ideal number of steps a person should take each day?", options: ["5,000", "10,000", "20,000", "50,000"], correctAnswer: 1, explanation: "Taking 10,000 steps daily is recommended for general health and fitness." },
            { question: "Which of the following is a consequence of a poor diet?", options: ["Increased energy levels", "Improved immune function", "Chronic diseases", "Enhanced brain function"], correctAnswer: 2, explanation: "Poor diet can lead to chronic diseases such as heart disease and diabetes." },
            { question: "What is the most common mental health disorder?", options: ["Depression", "Bipolar disorder", "Anxiety disorder", "Schizophrenia"], correctAnswer: 2, explanation: "Anxiety disorders are the most common mental health disorders." },
            { question: "Which activity is most effective for cardiovascular health?", options: ["Weightlifting", "Swimming", "Yoga", "Running"], correctAnswer: 1, explanation: "Swimming is an excellent cardiovascular workout that improves heart health." },
            { question: "What is the recommended daily intake of water for adults?", options: ["1 liter", "2 liters", "3 liters", "5 liters"], correctAnswer: 1, explanation: "Adults should aim for about 2 liters of water daily for proper hydration." },
        ],
        Education: [
            { question: "Which learning model is student-centered?", options: ["Lecture-based", "Flipped classroom", "Textbook-based", "Socratic method"], correctAnswer: 1 },
            { question: "What technology is shaping online education?", options: ["Blockchain", "Virtual reality", "AI", "All of the above"], correctAnswer: 3 },
            { question: "What is the main goal of STEM education?", options: ["Problem-solving skills", "Programming only", "Reading literacy", "Art appreciation"], correctAnswer: 0 },
            // More questions for the Education pool...
        ]
    };

    const questionHeader = document.querySelector("#dynamic-question");
    const quizContainer = document.querySelector("#quiz-container");
    const freeResponseContainer = document.querySelector("#free-response-container");
    const topicLinks = document.querySelectorAll(".topic-link");
    let timer;

    // Function to shuffle questions and select 10 randomly
    function selectRandomQuestions(topicQuestions) {
        const shuffled = [...topicQuestions].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 10); // Select 10 questions
    }

    // Start Quiz Timer
    function startTimer(duration, onComplete) {
        let timeRemaining = duration;
        const timerElement = document.createElement("div");
        timerElement.id = "timer";
        timerElement.style.marginTop = "10px";
        timerElement.textContent = `Time remaining: ${timeRemaining}s`;
        quizContainer.prepend(timerElement);

        timer = setInterval(() => {
            timeRemaining--;
            timerElement.textContent = `Time remaining: ${timeRemaining}s`;

            if (timeRemaining <= 0) {
                clearInterval(timer);
                alert("Time's up! Submitting your quiz automatically.");
                onComplete();
            }
        }, 1000);
    }

    // Function to create Quiz
    function createQuiz(topicQuestions) {
        resetContainers();
        quizContainer.style.display = "block";

        const selectedQuestions = selectRandomQuestions(topicQuestions);
        let score = 0;
        const answers = [];

        selectedQuestions.forEach((q, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.classList.add("question");
            questionDiv.innerHTML = `
                <h4>${index + 1}. ${q.question}</h4>
                ${q.options
                    .map((option, i) => `<label><input type="radio" name="question-${index}" value="${i}">${option}</label><br>`)
                    .join("")}
            `;
            quizContainer.appendChild(questionDiv);
        });

        // Submit Button
        const submitButton = document.createElement("button");
        submitButton.textContent = "Submit Quiz";
        submitButton.classList.add("submit-quiz");
        quizContainer.appendChild(submitButton);

        startTimer(60, () => submitButton.click()); // 60-second timer

        submitButton.addEventListener("click", () => {
            clearInterval(timer); // Stop timer
            const userAnswers = Array.from(document.querySelectorAll(".question")).map((questionDiv, index) => {
                const selectedOption = questionDiv.querySelector(`input[name="question-${index}"]:checked`);
                return selectedOption ? parseInt(selectedOption.value) : -1; // -1 if no answer selected
            });

            // Evaluate Quiz
            userAnswers.forEach((answer, index) => {
                answers.push({ question: selectedQuestions[index], userAnswer: answer });
                if (answer === selectedQuestions[index].correctAnswer) score++;
            });

            // Display Results
            quizContainer.innerHTML = `
                <h3>Your Score: ${score} / ${selectedQuestions.length}</h3>
                ${answers
                    .map(({ question, userAnswer }, i) => {
                        const correctOption = question.options[question.correctAnswer];
                        const userOption = userAnswer === -1 ? "No Answer" : question.options[userAnswer];
                        return `
                            <div>
                                <h4>${i + 1}. ${question.question}</h4>
                                <p>Your Answer: <b style="color: ${userAnswer === question.correctAnswer ? "green" : "red"}">${userOption}</b></p>
                                <p>Correct Answer: <b>${correctOption}</b></p>
                            </div>
                        `;
                    })
                    .join("")}
            `;

            // Add to Leaderboard
            const leaderboardEntry = document.createElement("div");
            leaderboardEntry.textContent = `Score: ${score}, Date: ${new Date().toLocaleString()}`;
            document.querySelector("#leaderboard").appendChild(leaderboardEntry);
        });
    }

 // Function to create Free Response
 function createFreeResponse(topic) {
    resetContainers();
    freeResponseContainer.style.display = "block";

    // Provide a unique free response prompt based on the selected topic
    let freeResponseQuestion;
    switch(topic) {
        case "Technology":
            freeResponseQuestion = "What do you think is the next big advancement in technology?";
            break;
        case "Environment":
            freeResponseQuestion = "How do you think we can address climate change in our daily lives?";
            break;
        case "Health":
            freeResponseQuestion = "What health habits do you think are most important for teenagers to adopt?";
            break;
        case "Education":
            freeResponseQuestion = "How can online learning be improved for better student engagement?";
            break;
        default:
            freeResponseQuestion = "Please provide your thoughts on the selected topic.";
    }

    freeResponseContainer.innerHTML = `
        <h3>${freeResponseQuestion}</h3>
        <textarea placeholder="Type your response here..."></textarea>
        <button id="submit-response">Submit</button>
    `;

    const submitButton = document.querySelector("#submit-response");
    submitButton.addEventListener("click", () => {
        const response = freeResponseContainer.querySelector("textarea").value;
        freeResponseContainer.innerHTML = `<h3>Thank you for your response!</h3><p>${response}</p>`;
    });
}

    // Reset Containers
    function resetContainers() {
        quizContainer.innerHTML = "";
        freeResponseContainer.innerHTML = "";
        quizContainer.style.display = "none";
        freeResponseContainer.style.display = "none";
    }

    // Handle Topic Selection
    topicLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const topic = link.textContent;
            const selectedQuestions = topics[topic];

            questionHeader.textContent = `You selected: ${topic}`;
            resetContainers();

            // Prompt User to Choose Mode
            questionHeader.innerHTML += `
                <div>
                    <button id="mc-button">Multiple Choice Quiz</button>
                    <button id="free-response-button">Free Response</button>
                </div>
            `;

            document.querySelector("#mc-button").addEventListener("click", () => createQuiz(selectedQuestions));
            document.querySelector("#free-response-button").addEventListener("click", createFreeResponse);
        });
    });
});
