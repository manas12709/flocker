# Flocker: Real-Time Student Collaboration Platform

Flocker is a redesigned version of the Nighthawk Pages GitHub repository, created to give Del Norte High School Computer Science students an immersive experience with full-stack development, team collaboration, and modern software tools.

This repo extends the original Nighthawk Pages project with new functionality like **WebSockets**, enabling real-time communication between users, and a curated collection of student work that demonstrates real-world backend and frontend integration.

---

## 🎓 Educational Purpose

This repository serves two main roles:

1. **Starter Template** – A foundation for student projects using JavaScript, Python/Flask, and HTML/CSS.
2. **Learning Lab** – A structured workspace to practice:

   * GitHub collaboration and version control
   * Real-time app development with WebSockets
   * Frontend/backend integration

Students use this project to build blogs, complete lesson hacks, create games, and develop full-stack apps.

---

## 🆕 New Features (2025 Edition)

| Feature                     | Description                                               |
| --------------------------- | --------------------------------------------------------- |
| **WebSockets**              | Enables real-time chat between students                   |
| **2024 Project Archive**    | We curated a collection of standout 2024 student projects |
| **Two Learning Categories** |                                                           |
| • Integrated Projects       | Full-stack apps connected to backend services             |
| • Non-integrated Projects   | Frontend-focused apps—students can try integrating these  |

---

## 🧑‍🏫 How Students Should Use This Repo

* Clone this repo to start your own custom project
* Explore **integrated projects** for best practices in backend/frontend connection
* Learn by extending **non-integrated projects**—try adding database access, backend logic, or WebSocket support
* Use built-in WebSocket features to collaborate with teammates or ask for help in real time
* Follow version control best practices and document your work using GitHub Pages and markdown

---

## 🏗️ Technologies & Tools

| Stack          | Purpose                        |
| -------------- | ------------------------------ |
| Jekyll         | Static site generation         |
| Tailwind CSS   | Styling and layout             |
| Flask          | Python backend                 |
| WebSockets     | Real-time communication        |
| GitHub Pages   | Deployment & version control   |
| GitHub Actions | Continuous Integration (CI/CD) |
| VS Code        | Preferred IDE                  |
| Makefile       | Local development scripts      |

---

## 🧭 Setup Instructions

### 🔧 Initial Setup

```bash
git clone https://github.com/your-org/flocker_frontend.git
cd flocker_frontend/scripts
```

Run the appropriate setup script for your OS:

```bash
# Ubuntu
./activate_ubuntu.sh

# macOS
./activate_macos.sh

# Kasm/Cloud
./activate.sh
```

### 🧪 Build and Preview

```bash
bundle install   # one-time Ruby setup
make             # start local server
```

Access your site at:

```bash
http://0.0.0.0:4887/flocker_frontend/
```

---

## 🧾 Project Directory

```
flocker/
├── _posts/               # Blog posts in Markdown
├── _notebooks/           # Jupyter notebook blogs
├── static/               # JS, CSS, assets
├── templates/            # HTML templates
├── backend/              # Flask APIs
├── websockets/           # Socket.IO real-time server
├── projects/
│   ├── integrated/       # 2024 projects with backend
│   └── non-integrated/   # 2024 projects needing backend
├── _config.yml           # Jekyll configuration
└── Makefile              # Dev workflow automation
```

---

## 📘 Legacy Context: Nighthawk Pages Foundation

This repo builds on the educational framework from [Nighthawk Pages](https://github.com/nighthawkcoders/portfolio_2025), which includes:

* Student blogs in Markdown and Jupyter
* Frontend integration with Python and Java backends
* Hosting through GitHub Pages with Jekyll
* Developer tools: GitHub Actions, Makefiles, themes, tagging, search, and metadata

Refer to the [Nighthawk Pages README](https://github.com/nighthawkcoders/portfolio_2025) for full documentation on blogging structure, `_config.yml`, themes, layouts, and contribution methods.

---

## 🧑‍🏫 Contributors

* Manas
* Arhaan
* Ahmad

---

## 📜 License

Apache 2.0 License, carried forward from the Fastpages and Nighthawk Pages roots.

---
