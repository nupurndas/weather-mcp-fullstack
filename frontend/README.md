# Weather App Frontend

This folder contains the React and TypeScript interface for the weather
project. Follow the complete beginner tutorial in the [root README](../README.md).

The frontend expects the FastAPI backend at `http://localhost:8000` by default.
Start the backend before starting the frontend.

## Start the Frontend

```powershell
npm install
npm run dev
```

Open <http://localhost:5173>.

## Change the Backend URL

Copy `.env.example` to `.env`, then edit `VITE_API_BASE_URL`:

```powershell
Copy-Item .env.example .env
```

Restart the Vite development server after changing an environment variable.

## Available Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build the application |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |
