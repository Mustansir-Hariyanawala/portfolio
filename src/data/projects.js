export const projects = [
  {
    id: "fraudulent-checkout",

    title: "Fraudulent Checkout Analysis Dashboard",

    shortDescription:
      "A responsive weather app that shows real-time conditions and a 5-day forecast for any city, with clean data visualization and no clutter.",

    description:
      "This project started as a way to practice working with a public REST API in React. It fetches live weather data from the OpenWeather API based on a city search, and displays current conditions alongside a 5-day forecast broken down by time of day. The main challenge was handling the API's inconsistent response shapes for different endpoints (current weather vs. forecast) and normalizing them into a single shape the UI could render predictably. I also added debounced search-as-you-type, loading skeletons instead of a blank screen during fetches, and graceful error states for invalid city names or network failures — the kind of details that are easy to skip in a tutorial project but matter in anything meant to feel finished.",

    thumbnail:
      "/images/projects/Fraudulent-Analysis-Dashboard/screenshot-1.png",

    technologies: [
      "React",
      "JavaScript",
      "CSS",
      "OpenWeather API",
    ],

    github:
      "https://github.com/Mustansir-Hariyanawala/FraudAnalysisDashboard",

    liveDemo:
      "https://fraudulent-checkout-frontend.vercel.app/",

    screenshots: [
      "/images/projects/Fraudulent-Analysis-Dashboard/screenshot-1.png",
      "/images/projects/Fraudulent-Analysis-Dashboard/screenshot-1.jpeg",
    ],

    features: [
      "Search weather by city name with debounced, as-you-type suggestions",
      "Current conditions: temperature, humidity, wind speed, and 'feels like'",
      "5-day forecast broken down into 3-hour intervals",
      "Automatic unit conversion between Celsius and Fahrenheit",
      "Loading skeletons and error states instead of a blank or broken screen",
      "Fully responsive layout, from mobile through desktop",
    ],
  },

  {
    id: "task-manager",

    title: "Task Manager",

    shortDescription:
      "A drag-and-drop task board for organizing work into To Do, In Progress, and Done columns, with tasks persisted locally between sessions.",

    description:
      "A Trello-style task board built to practice complex state management and drag-and-drop interactions without reaching for a heavy library. Tasks can be created, edited, deleted, and dragged between three columns — To Do, In Progress, and Done — with the board state persisted to localStorage so your tasks are still there when you come back. The trickiest part was getting drag-and-drop to feel natural: tracking which column and index a task is being dragged over, reordering the array in state without visual jank, and making sure keyboard users aren't locked out of reordering tasks entirely. Each task also supports a priority tag and an optional due date, both of which affect a small visual indicator on the card so the board stays scannable even as it fills up.",

    thumbnail:
      "/images/projects/task-manager/thumbnail.png",

    technologies: [
      "React",
      "Tailwind CSS",
      "localStorage",
    ],

    github:
      "https://github.com/yourusername/task-manager",

    liveDemo:
      "https://your-task-manager.com",

    screenshots: [
      "/images/projects/task-manager/screenshot-1.png",
      "/images/projects/task-manager/screenshot-2.png",
    ],

    features: [
      "Drag-and-drop tasks between To Do, In Progress, and Done columns",
      "Create, edit, and delete tasks inline without a page reload",
      "Priority tags (Low / Medium / High) with color-coded indicators",
      "Optional due dates, with overdue tasks visually flagged",
      "Board state persisted in localStorage — refresh-proof without a backend",
      "Keyboard-accessible reordering as a fallback to drag-and-drop",
    ],
  },
];