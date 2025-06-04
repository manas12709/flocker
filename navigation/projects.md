---
layout: post
title: Projects
search_exclude: true
permalink: /projects/
---

<div class="projects-container">
  <h1 class="projects-title">Welcome to Your Projects</h1>
  <p class="projects-intro">We've carefully curated a selection of projects for you to work on. These projects are divided into two categories to help you understand the scope and requirements better.</p>

  <div class="projects-grid">
    <div class="project-category">
      <h2>🚀 Integrated with Backend</h2>
      <p class="category-description">These projects come with a fully functional backend integration. They serve as excellent examples of complete, production-ready applications.</p>
      
      <div class="project-list">
        <div class="project-card">
          <h3>Elevator Pitch</h3>
          <p>Description of the first integrated project...</p>
          <a href="/flocker/elevatorpitch/" class="project-link">View Project →</a>
        </div>
        <!-- Add more project cards as needed -->
      </div>
    </div>

    <div class="project-category">
      <h2>🎯 Not Integrated with Backend</h2>
      <p class="category-description">These projects present an exciting challenge! Your task is to analyze the integrated projects above and implement the backend connectivity for these applications.</p>
      
      <div class="project-list">
        <div class="project-card">
          <h3>Riddle Page</h3>
          <p>Description of the first non-integrated project...</p>
          <a href="/flocker/riddle/" class="project-link">View Project →</a>
        </div>
        <!-- Add more project cards as needed -->
      </div>
    </div>
  </div>
</div>

<style>
.projects-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.projects-title {
  text-align: center;
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.projects-intro {
  text-align: center;
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 3rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.project-category {
  background:rgb(0, 0, 0);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.project-category h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.8rem;
}

.category-description {
  color: #666;
  margin-bottom: 2rem;
}

.project-list {
  display: grid;
  gap: 1.5rem;
}

.project-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.project-card:hover {
  transform: translateY(-5px);
}

.project-card h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.project-link {
  display: inline-block;
  margin-top: 1rem;
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
}

.project-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>

