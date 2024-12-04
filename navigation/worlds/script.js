// Function to dynamically update the question based on the selected topic
document.addEventListener("DOMContentLoaded", () => {
    const topics = {
        Technology: "What are your thoughts on the impact of technology in education?",
        Health: "How can we improve access to mental health services?",
        Environment: "What steps should individuals take to combat climate change?",
        Education: "What changes are needed to improve education systems globally?",
    };

    const topicLinks = document.querySelectorAll(".topic-link");
    const questionHeader = document.querySelector("#dynamic-question");

    topicLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const topic = link.textContent;
            questionHeader.textContent = topics[topic] || "Choose a topic to see the question.";
        });
    });
});
