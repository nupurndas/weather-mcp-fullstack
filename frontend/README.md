# Weather MCP Fullstack

A modern React + TypeScript frontend for the Weather MCP backend. Displays real-time weather data using React Query, Tailwind CSS, and a deployed MCP-compatible API.

## Backend

The backend is deployed at:

**https://weathermcp-ggmn.onrender.com/weather/{city}**

Example: [https://weathermcp-ggmn.onrender.com/weather/london](https://weathermcp-ggmn.onrender.com/weather/london)

The frontend is now configured to fetch from this production endpoint (London by default).

## Features

- Real-time weather display with detailed metrics (temp, humidity, wind, UV, etc.)
- React Query for caching, loading & error states
- Responsive Tailwind UI with dark mode support
- TypeScript for type safety
- Refresh button with click counter
- Graceful fallback to demo data on errors

## Setup & Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:5173

The app will automatically fetch live weather from the deployed backend.

## Build for Production

```bash
npm run build
```

The built app is in the `dist/` folder and can be deployed to any static host (Netlify, Vercel, GitHub Pages, etc.).

## Project Structure

- `src/App.tsx` - Main app with data fetching logic
- `src/components/WeatherDisplay.tsx` - Reusable weather UI component + types
- `src/index.css` - Tailwind + custom styles
- Uses Vite for fast builds and HMR

## MCP Notes

This frontend pairs with the sibling `weather-mcp` backend following Model Context Protocol specs. The deployed version provides weather tools like `getCurrentWeather`.

Follow React + TypeScript best practices as per `.github/copilot-instructions.md`.

## License

MIT
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
