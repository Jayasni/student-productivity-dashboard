# Student Productivity Dashboard

A responsive Student Productivity Dashboard built using React, Vite, React Router, Context API, and Tailwind CSS. This project helps students manage assignments, track study goals, and explore learning resources in one place.

## Features

- Student dashboard with productivity overview
- Login page and protected routes
- Assignment management
- Study goals tracking
- Learning resources fetched from an API
- Global state management using Context API
- Persistent assignments and goals using localStorage
- Responsive user interface
- Reusable React components
- Client-side routing using React Router DOM

## Tech Stack

- React
- Vite
- JavaScript
- React Router DOM
- Context API
- Tailwind CSS v4
- JSONPlaceholder API
- localStorage
- Git and GitHub CLI

## Prerequisites

Install the following before starting:

- Node.js
- npm
- Git
- GitHub CLI (`gh`)
- Visual Studio Code (recommended)

Check installations:

```bash
node --version
npm --version
git --version
gh --version
```

## Project Setup From Scratch

### 1. Create the React + Vite project

```bash
npm create vite@latest student-productivity-dashboard -- --template react
```

### 2. Navigate to the project

```bash
cd student-productivity-dashboard
```

### 3. Install dependencies

```bash
npm install
```

### 4. Install React Router

```bash
npm install react-router-dom
```

### 5. Install Tailwind CSS v4

```bash
npm install tailwindcss @tailwindcss/vite
```

### 6. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually `http://localhost:5173/`.

## Folder Structure

```text
student-productivity-dashboard/
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Layout.jsx
│   │   ├── Sidebar.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── context/
│   │   └── AppContext.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Courses.jsx
│   │   ├── Assignments.jsx
│   │   └── StudyGoals.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

*Note: This is the expected structure for this project. Update it if your actual files or folders differ.*

## Application Architecture

- **App.jsx:** Defines application routes.
- **main.jsx:** Renders the React application with BrowserRouter and AppProvider.
- **AppContext.jsx:** Shares application state and handles localStorage persistence.
- **Layout.jsx:** Provides the common application layout.
- **Sidebar.jsx:** Navigation between dashboard pages.
- **ProtectedRoute.jsx:** Restricts access to selected routes based on demo login state.
- **Login.jsx:** Provides the demo login interface.
- **Dashboard.jsx:** Displays productivity information.
- **Courses.jsx:** Fetches learning resources from JSONPlaceholder.
- **Assignments.jsx:** Manages assignments.
- **StudyGoals.jsx:** Manages study goals.

## Tailwind CSS Configuration

### vite.config.js

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### src/index.css

```css
@import "tailwindcss";
```

## Git and GitHub CLI Setup

### 1. Verify GitHub CLI login

```bash
gh auth status
```

If you are not logged in:

```bash
gh auth login
```

Follow the prompts to authenticate with GitHub.

### 2. Initialize Git

Run these commands from the project root:

```bash
git init
git branch -M main
```

### 3. Stage project files

```bash
git add .
```

### 4. Create the first commit

```bash
git commit -m "Initial commit: Student Productivity Dashboard"
```

### 5. Create a GitHub repository and push

For a public repository:

```bash
gh repo create student-productivity-dashboard --public --source=. --remote=origin --push
```

For a private repository:

```bash
gh repo create student-productivity-dashboard --private --source=. --remote=origin --push
```

Run only one of these commands. If your GitHub repository already exists, use its existing remote instead of creating it again.

### 6. Verify the repository

```bash
git remote -v
git status
gh repo view --web
```

## Daily Git Workflow

After making changes to your project:

```bash
git add .
git commit -m "Describe your changes"
git push
```

## Data Storage

Assignments and study goals are stored in browser localStorage for demonstration purposes. Learning resources are fetched from JSONPlaceholder.

## Authentication Disclaimer

Authentication is implemented for learning and demonstration only. A production application should use secure server-side authentication and authorization.

## Future Enhancements

- Backend API and database integration
- Secure authentication
- Assignment deadlines and reminders
- Study progress charts
- Course search and filtering
- Improved accessibility and responsive design

## Author

Developed as a React learning project.

