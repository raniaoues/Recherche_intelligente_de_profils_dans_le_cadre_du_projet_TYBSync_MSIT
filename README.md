# **MSIT Conseil Search Bar**


MSIT Conseil Search Bar is an interactive web application for searching and visualizing professional profiles within an immersive 3D interface. It combines modern technologies to deliver a unique and engaging user experience.

Main Features
3D Interactive Visualization

Profiles represented as chess pawns on a 3D board

Smooth animations and intuitive camera controls (rotation, zoom, pan)

Advanced Search

Real-time search functionality

Filtering profiles by skills, names, or descriptions

Visual highlighting of matching profiles

User Interface

Modern design with glassmorphism effects

Relevance scoring system for search results

Skill badges display

Direct links to LinkedIn and personal portfolios

Tech Stack
Frontend

React 18 + TypeScript

Vite for bundling and development

Tailwind CSS for styling

Three.js / React Three Fiber for 3D rendering

Shadcn/ui for UI components

Project Structure
bash
Copier
Modifier
src/
├── components/
│   ├── ChessScene.tsx        # Main 3D scene
│   ├── ProfileCard.tsx       # Profile detail cards
│   ├── SearchBar.tsx         # Search bar component
│   └── ProfileList.tsx       # Profile list component
├── types/
│   └── employee.ts           # TypeScript types
├── utils/
│   └── similarityUtils.ts    # Search logic
└── data/
    └── employees.ts          # Profiles data
Getting Started
Prerequisites
Node.js (version 18 or higher)

npm or bun

Installation
bash
Copier
Modifier
# Clone the repository
git clone <REPO_URL>

# Navigate to the project directory
cd msit-conseil-search-bar

# Install dependencies
npm install

# Start the development server
npm run dev
Access
Open your browser and visit http://localhost:8080.

How to Use
Search Profiles

Use the search bar to filter profiles in real-time.

Matching profiles are visually highlighted in the 3D scene.

Interact with the 3D Scene

Click and drag to rotate the chessboard.

Use the mouse wheel to zoom in and out.

Hover over a pawn to see the profile name.

View Profile Details

Click on a pawn to open a detailed profile card.

Access LinkedIn and portfolio links directly from the card.

Customization
You can customize the application by:

Editing colors and themes via Tailwind CSS

Adding new profiles in employees.ts

Modifying 3D animations

Extending search capabilities with additional filters

AI Search Engine Concept
The system features an intelligent search engine for profile matching, including:

Real-time keyword-based filtering (name, skills, bio)

Semantic ("fuzzy") search with vectorization techniques

Note: Planned gamified features (such as chess pawn movement and puzzle unlocking) were not fully implemented due to hackathon time constraints.

# **MSIT Conseil Search Bar**

## 🎥 Demo

![Demo]("C:\Users\ouesl\Search_Bar\demo-MSIT-SearchBar.mp4")
