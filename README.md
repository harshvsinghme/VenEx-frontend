# VenEx-Frontend

VenEx-Frontend is a React-based frontend project that works in conjunction with the VenEx-Backend. It uses TypeScript for type safety, Tailwind CSS for styling, and Ant Design for UI components.

## Features

- **React** with functional components and hooks.
- **React Router v7** for seamless navigation.
- **TypeScript** for robust and scalable development.
- **Ant Design (AntD)** for a rich set of UI components.
- **Tailwind CSS** for flexible and fast styling.
- **Axios** for API integration.
- Toast notifications with **React-Toastify**.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or above recommended)
- A running instance of [VenEx-Backend](https://github.com/harshvsinghme/VenEx-backend)

---

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/harshvsinghme/VenEx-frontend.git
   cd VenEx-frontend
   ```

2. **Install dependencies**:

   ```bash
   npm i -g pnpm
   pnpm install
   ```
---

### Running the Application

- **In local development mode**:

  ```bash
  pnpm run local
  ```

  On Windows:

  ```bash
  pnpm run local:win
  ```

- **In production mode**:

  ```bash
  pnpm run build
  ```

---

### Project Structure

```
VenEx-frontend/
├── build/               # Production build output
├── node_modules/        # Node.js dependencies
├── public/              # Public assets (e.g., index.html, favicon)
├── src/                 # Source code
│   ├── api/             # API integration functions
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page-level components
│   ├── styles/          # Global CSS and Tailwind configurations
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions and helpers
│   ├── App.tsx          # Main App component
│   ├── index.css        # Global CSS imports
│   ├── index.tsx        # Entry point for React
├── package.json         # Node.js project configuration
├── pnpm-lock.yaml       # Lockfile for dependency management
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
├── README.md            # Project documentation
```

---

### Scripts

Here are some useful scripts from `package.json`:

- **Run in local development mode**:

  ```bash
  pnpm run local
  ```

  or for Windows:

  ```bash
  pnpm run local:win
  ```

- **Build the project**:

  ```bash
  pnpm run build
  ```

---

### Technologies Used

- **React**  
- **React Router v7**  
- **TypeScript**  
- **Ant Design (AntD)**  
- **Tailwind CSS**  
- **Axios**  
- **React-Toastify**

---

### Author

Developed and maintained by **Harsh**.