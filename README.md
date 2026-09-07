# Kanban Board

A task management board built with React 19 and Vite.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)

> **Work in progress** — core board and card creation are functional; inline editing (save/cancel), drag-and-drop reordering, and card deletion are still to come.

## Features

- **Three-column board** — To Do, In Progress, and Done
- **Add cards** with title, description, start date, and due date
- **Inline editing** — click the pencil icon to open the edit form (save/cancel not yet wired)
- **Sorted by position** — cards maintain a stable order within each column
- **JSON Server backend** — lightweight REST API for persistent data

## Roadmap

- [ ] Save and cancel buttons for inline editing
- [ ] Drag-and-drop between columns
- [ ] Delete cards

## Tech Stack

| Layer | Library |
|-------|---------|
| UI | React 19, Tailwind CSS 4 |
| Build | Vite 8 |
| Server state | TanStack Query 5 |
| Client state | Zustand 5 |
| Icons | Lucide React |
| Mock API | JSON Server |
| Linting | Oxlint |

## Getting Started

```bash
# Install dependencies
npm install

# Start the JSON Server (port 3001)
npm run server

# Start the dev server (port 5173)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the board.

## Project Structure

```
src/
├── App.jsx            # Root component
├── Kanban.jsx         # Board with columns and cards
├── AddCard.jsx        # Add/edit card form
├── store/
│   ├── useCards.js        # Fetch all cards (TanStack Query)
│   ├── useCardById.js     # Fetch single card by ID
│   └── useAddCards.js     # Add card mutation
└── data/
    └── db.json        # JSON Server database
```
