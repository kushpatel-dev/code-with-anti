export const LEARNING_MODULES = [
  {
    id: "lm1", title: "Python Fundamentals", level: "Beginner", duration: "4 hrs",
    icon: "🐍", color: "#3b82f6",
    lessons: [
      { id: 1, title: "Variables & Data Types",  type: "lesson",  duration: "20 min", content: "Learn how to declare variables and work with strings, integers, floats, and booleans in Python." },
      { id: 2, title: "Control Flow",            type: "lesson",  duration: "25 min", content: "Master if/else statements, for loops, and while loops to control program flow." },
      { id: 3, title: "Functions",               type: "lesson",  duration: "30 min", content: "Define reusable blocks of code with def, parameters, return values, and scope." },
      { id: 4, title: "Quiz: Python Basics",     type: "quiz",    duration: "10 min", content: "Test your understanding of variables, control flow, and functions." },
      { id: 5, title: "Lists & Dictionaries",    type: "lesson",  duration: "30 min", content: "Work with Python's most powerful built-in data structures." },
      { id: 6, title: "File I/O",                type: "lesson",  duration: "20 min", content: "Read and write files using Python's built-in open() function." },
      { id: 7, title: "Final Project",           type: "project", duration: "60 min", content: "Build a command-line contact book using everything you have learned." },
    ],
  },
  {
    id: "lm2", title: "JavaScript Essentials", level: "Beginner", duration: "5 hrs",
    icon: "⚡", color: "#f59e0b",
    lessons: [
      { id: 1, title: "JS in the Browser",    type: "lesson",  duration: "20 min", content: "Understand how JavaScript runs in browsers and interacts with HTML." },
      { id: 2, title: "DOM Manipulation",     type: "lesson",  duration: "35 min", content: "Select, modify, and create HTML elements dynamically with the DOM API." },
      { id: 3, title: "Events & Listeners",   type: "lesson",  duration: "25 min", content: "Respond to user interactions with click, input, and keyboard events." },
      { id: 4, title: "Quiz: JS Basics",      type: "quiz",    duration: "10 min", content: "Test your knowledge of DOM and events." },
      { id: 5, title: "Async & Promises",     type: "lesson",  duration: "40 min", content: "Handle async operations with Promises, async/await, and fetch." },
      { id: 6, title: "ES6+ Features",        type: "lesson",  duration: "30 min", content: "Arrow functions, destructuring, spread, and template literals." },
      { id: 7, title: "Weather App Project",  type: "project", duration: "50 min", content: "Build a weather app using the fetch API and DOM updates." },
    ],
  },
  {
    id: "lm3", title: "React for Beginners", level: "Intermediate", duration: "6 hrs",
    icon: "⚛️", color: "#06b6d4",
    lessons: [
      { id: 1, title: "Components & JSX",       type: "lesson",  duration: "30 min", content: "Build reusable UI components using JSX syntax and React's component model." },
      { id: 2, title: "State & Props",           type: "lesson",  duration: "35 min", content: "Manage data flow with useState hooks and pass data between components with props." },
      { id: 3, title: "useEffect & Lifecycle",   type: "lesson",  duration: "30 min", content: "Handle side effects, API calls, and component lifecycle with useEffect." },
      { id: 4, title: "Quiz: React Core",        type: "quiz",    duration: "15 min", content: "Test your components, state, and hooks knowledge." },
      { id: 5, title: "React Router",            type: "lesson",  duration: "25 min", content: "Navigate between pages without full reloads using React Router DOM." },
      { id: 6, title: "Context API",             type: "lesson",  duration: "30 min", content: "Share state across deeply nested components with React Context." },
      { id: 7, title: "Build a Todo App",        type: "project", duration: "60 min", content: "Apply everything to build a fully working React todo app from scratch." },
    ],
  },
  {
    id: "lm4", title: "SQL & Databases", level: "Intermediate", duration: "4 hrs",
    icon: "🗄️", color: "#8b5cf6",
    lessons: [
      { id: 1, title: "SELECT Queries",         type: "lesson",  duration: "25 min", content: "Query data using SELECT, WHERE, ORDER BY, and LIMIT clauses." },
      { id: 2, title: "JOINs",                  type: "lesson",  duration: "35 min", content: "Combine data from multiple tables using INNER, LEFT, RIGHT, and FULL JOINs." },
      { id: 3, title: "Aggregations",           type: "lesson",  duration: "25 min", content: "Summarize data using GROUP BY, COUNT, SUM, AVG, MIN, and MAX." },
      { id: 4, title: "Quiz: SQL",              type: "quiz",    duration: "10 min", content: "Test your SQL query writing skills." },
      { id: 5, title: "Schema Design",          type: "lesson",  duration: "30 min", content: "Design normalized database schemas with primary and foreign keys." },
      { id: 6, title: "Indexes & Performance",  type: "lesson",  duration: "25 min", content: "Speed up queries with indexes and understand query execution plans." },
      { id: 7, title: "E-Commerce DB Project",  type: "project", duration: "45 min", content: "Design and query a small e-commerce database schema." },
    ],
  },
  {
    id: "lm5", title: "Git & Version Control", level: "Beginner", duration: "3 hrs",
    icon: "🌿", color: "#f97316",
    lessons: [
      { id: 1, title: "What is Git?",          type: "lesson",  duration: "15 min", content: "Understand version control, repositories, and why Git is essential for developers." },
      { id: 2, title: "Commits & Staging",     type: "lesson",  duration: "20 min", content: "Track changes with git add, git commit, and understand the staging area." },
      { id: 3, title: "Branches & Merging",    type: "lesson",  duration: "25 min", content: "Create feature branches, switch between them, and merge changes safely." },
      { id: 4, title: "Quiz: Git Basics",      type: "quiz",    duration: "10 min", content: "Test your knowledge of commits, branches, and merging." },
      { id: 5, title: "Remote & GitHub",       type: "lesson",  duration: "25 min", content: "Push and pull from remote repositories, open pull requests on GitHub." },
      { id: 6, title: "Resolving Conflicts",   type: "lesson",  duration: "20 min", content: "Understand merge conflicts and how to resolve them step by step." },
      { id: 7, title: "Git Flow Project",      type: "project", duration: "30 min", content: "Simulate a real team workflow: branch, commit, PR, and merge a feature." },
    ],
  },
  {
    id: "lm6", title: "CSS & Styling", level: "Beginner", duration: "4 hrs",
    icon: "🎨", color: "#ec4899",
    lessons: [
      { id: 1, title: "Selectors & Specificity",  type: "lesson",  duration: "20 min", content: "Master CSS selectors, cascade rules, and specificity to style elements precisely." },
      { id: 2, title: "Flexbox Layout",           type: "lesson",  duration: "30 min", content: "Build flexible responsive layouts with display: flex and its alignment properties." },
      { id: 3, title: "CSS Grid",                 type: "lesson",  duration: "30 min", content: "Design complex two-dimensional layouts with CSS Grid rows and columns." },
      { id: 4, title: "Quiz: CSS Layout",         type: "quiz",    duration: "10 min", content: "Test flexbox, grid, and selector knowledge." },
      { id: 5, title: "Animations & Transitions", type: "lesson",  duration: "25 min", content: "Bring interfaces to life with CSS transitions and keyframe animations." },
      { id: 6, title: "Responsive Design",        type: "lesson",  duration: "25 min", content: "Use media queries and relative units to build mobile-first responsive pages." },
      { id: 7, title: "Landing Page Project",     type: "project", duration: "50 min", content: "Apply all CSS skills to build and style a polished landing page from scratch." },
    ],
  },
  {
    id: "lm7", title: "TypeScript Basics", level: "Intermediate", duration: "5 hrs",
    icon: "🔷", color: "#0ea5e9",
    lessons: [
      { id: 1, title: "Types & Interfaces",    type: "lesson",  duration: "25 min", content: "Add static typing to JavaScript with primitives, interfaces, and type aliases." },
      { id: 2, title: "Functions & Generics",  type: "lesson",  duration: "30 min", content: "Type function parameters, return values, and create reusable generic types." },
      { id: 3, title: "Classes & OOP",         type: "lesson",  duration: "30 min", content: "Use TypeScript classes, access modifiers, inheritance, and abstract classes." },
      { id: 4, title: "Quiz: TypeScript",      type: "quiz",    duration: "15 min", content: "Test types, generics, and class concepts." },
      { id: 5, title: "Enums & Utility Types", type: "lesson",  duration: "25 min", content: "Use enums, Partial, Required, Pick, Omit, and other built-in utility types." },
      { id: 6, title: "TS with React",         type: "lesson",  duration: "30 min", content: "Properly type React props, state, events, and hooks in TypeScript." },
      { id: 7, title: "Typed API Project",     type: "project", duration: "55 min", content: "Build a fully typed React component that fetches and displays API data." },
    ],
  },
  {
    id: "lm8", title: "Node.js & Express", level: "Intermediate", duration: "5 hrs",
    icon: "🟢", color: "#22c55e",
    lessons: [
      { id: 1, title: "Node.js Basics",       type: "lesson",  duration: "25 min", content: "Understand the Node.js runtime, event loop, and how to run JS on the server." },
      { id: 2, title: "File System & Path",   type: "lesson",  duration: "20 min", content: "Read, write, and manage files using Node's built-in fs and path modules." },
      { id: 3, title: "Express Setup",        type: "lesson",  duration: "25 min", content: "Create your first Express server, define routes, and handle HTTP requests." },
      { id: 4, title: "REST API Design",      type: "lesson",  duration: "30 min", content: "Design and build a RESTful API with GET, POST, PUT, and DELETE endpoints." },
      { id: 5, title: "Quiz: Node & Express", type: "quiz",    duration: "10 min", content: "Test your understanding of Node.js and Express fundamentals." },
      { id: 6, title: "Middleware & Auth",    type: "lesson",  duration: "30 min", content: "Use middleware for logging, validation, and JWT-based authentication." },
      { id: 7, title: "REST API Project",     type: "project", duration: "60 min", content: "Build a complete REST API for a blog with users, posts, and auth." },
    ],
  },
];

export const ICON_OPTIONS = [
  "🐍","⚡","⚛️","🗄️","🌐","🎨","🔷","🦀","☕","🐹",
  "🔥","🚀","💡","🛠️","🎯","📦","🔐","🤖","🧬","🌿",
  "🎮","📱","🖥️","🔌","🧩","🟢","🦊","🐳","🔬","⚙️",
];

export const LEVEL_COLORS = {
  Beginner:     "#22c55e",
  Intermediate: "#f59e0b",
  Advanced:     "#ef4444",
};

export const TYPE_COLORS = {
  lesson:  "#3b82f6",
  quiz:    "#f59e0b",
  project: "#10b981",
};
