# Weather MCP Fullstack

A full-stack weather application with a React and TypeScript frontend and a
FastAPI backend. Search for a city to view current conditions including
temperature, humidity, wind, precipitation, pressure, visibility, UV index,
and sunrise and sunset times.

Weather and geocoding data come from [Open-Meteo](https://open-meteo.com/), so
no API key is required.

## Live API

The backend is hosted at:

<https://weathermcp-ggmn.onrender.com>

Try the current weather endpoint:

<https://weathermcp-ggmn.onrender.com/weather/london>

The service uses Render's free plan, so the first request may take a short time
while the instance starts.

## Features

- Search current weather by city
- Detailed weather, wind, precipitation, and atmospheric measurements
- Multi-day forecast REST endpoint
- Responsive React interface with loading, error, and refresh states
- React Query caching and Axios requests
- FastAPI-generated interactive API documentation
- No external API credentials required

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, React Query, Axios, Tailwind CSS
- **Backend:** Python, FastAPI, HTTPX, Uvicorn
- **Data:** Open-Meteo Geocoding and Forecast APIs
- **Hosting:** Render

## Project Structure

```text
weather-mcp-fullstack/
|-- backend/
|   |-- app.py                 # FastAPI application used for deployment
|   |-- tools/weather_service.py
|   |-- requirements.txt
|   `-- test_weather.py
`-- frontend/
    |-- src/App.tsx
    |-- src/components/WeatherDisplay.tsx
    `-- package.json
```

## Prerequisites

- Python 3.11 or later
- Node.js 20 or later
- npm

## Run Locally

### Backend

From the repository root:

```powershell
Set-Location backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn app:app --reload --port 8000
```

The API is available at <http://localhost:8000>. Interactive API documentation
is available at <http://localhost:8000/docs>.

### Frontend

Open another terminal from the repository root:

```powershell
Set-Location frontend
npm install
npm run dev
```

Open <http://localhost:5173>. The frontend currently requests weather data from
the hosted Render API configured in `frontend/src/App.tsx`.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | API status and endpoint summary |
| `GET` | `/weather/{city}` | Current weather for a city |
| `GET` | `/weather/{city}?include_forecast=true` | Current weather plus a short forecast |
| `GET` | `/forecast/{city}?days=3` | Forecast for the requested number of days |

Example:

```powershell
Invoke-RestMethod "http://localhost:8000/weather/london"
```

## Checks

Run the backend tests:

```powershell
Set-Location backend
python -m unittest test_weather.py
```

Check and build the frontend:

```powershell
Set-Location frontend
npm run lint
npm run build
```

## MCP Status

The repository includes an MCP server prototype in `backend/server.py`. The
FastAPI application in `backend/app.py` is the supported backend for the web
interface and the deployed service. MCP dependencies and client configuration
are not yet included in the standard setup.

## Data Attribution

Weather data by [Open-Meteo.com](https://open-meteo.com/).