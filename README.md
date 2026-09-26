# Build a Full-Stack Weather App

This beginner-friendly project shows how a React frontend talks to a Python
backend through a REST API. You will run both applications on your computer,
search for a city, and display live weather data from
[Open-Meteo](https://open-meteo.com/).

No weather API key is required.

## Architecture

This project exposes a shared `WeatherService` through two interfaces:

1. **REST API**
    FastAPI endpoints consumed by the React frontend.
2. **MCP server**
    MCP tools consumed by AI assistants.

Both interfaces delegate weather operations to the same `WeatherService`,
keeping the business logic independent of the transport layer.

## What You Will Learn

- How a frontend sends an HTTP request to a backend
- How FastAPI creates REST endpoints
- How React Query manages loading, error, and data states
- How environment variables configure a Vite application
- How CORS allows two local applications to communicate

## How It Works

```text
Browser (React)
    |
    | GET http://localhost:8000/weather/london
    v
FastAPI backend
    |
    | Requests location and weather data
    v
Open-Meteo APIs
```

The React development server runs at `http://localhost:5173`. The FastAPI
server runs at `http://localhost:8000`.

## Features

- Search current weather by city
- View temperature, humidity, wind, precipitation, pressure, and visibility
- View UV index and sunrise and sunset times
- Refresh weather data without reloading the page
- Explore and test API endpoints through FastAPI documentation

## Technology

- **Frontend:** React, TypeScript, Vite, React Query, Axios, Tailwind CSS
- **Backend:** Python, FastAPI, HTTPX, Uvicorn
- **Data source:** Open-Meteo Geocoding and Forecast APIs

## Prerequisites

Install these tools before starting:

- [Git](https://git-scm.com/downloads)
- [Python 3.11 or later](https://www.python.org/downloads/)
- [Node.js 20 or later](https://nodejs.org/), which includes npm

Check that they are available:

```powershell
git --version
python --version
node --version
npm --version
```

## 1. Get the Project

```powershell
git clone git@github.com:nupurndas/weather-mcp-fullstack.git
Set-Location weather-mcp-fullstack
```

If you already have the project, open a terminal in its root folder instead.

## 2. Start the Backend

Open your first terminal in the project root:

```powershell
Set-Location backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn app:app --reload --port 8000
```

Leave this terminal running. You should see Uvicorn report that it is listening
on `http://127.0.0.1:8000`.

Open these pages to check the backend:

- API status: <http://localhost:8000>
- Interactive API documentation: <http://localhost:8000/docs>
- London weather: <http://localhost:8000/weather/london>

### macOS or Linux Activation

Use this command instead of the PowerShell activation command:

```bash
source .venv/bin/activate
```

## 3. Start the Frontend

Open a second terminal in the project root. Keep the backend terminal running.

```powershell
Set-Location frontend
npm install
npm run dev
```

Open <http://localhost:5173>, enter a city, and select **Search**. The browser
sends a request to your local FastAPI server, which retrieves the weather from
Open-Meteo and returns it to React as JSON.

## 4. Configure the Backend Address

No configuration is required for the standard local setup. The frontend uses
`http://localhost:8000` by default.

To use another backend address, create a local environment file:

```powershell
Set-Location frontend
Copy-Item .env.example .env
```

Then edit `.env`:

```dotenv
VITE_API_BASE_URL=http://localhost:8000
```

Restart `npm run dev` after changing `.env`. Do not commit `.env`; it is ignored
by Git. Commit `.env.example` when the project needs a new shared setting.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Check whether the API is running |
| `GET` | `/weather/{city}` | Get current weather for a city |
| `GET` | `/weather/{city}?include_forecast=true` | Include a short forecast |
| `GET` | `/forecast/{city}?days=3` | Get a multi-day forecast |

Try an endpoint from PowerShell:

```powershell
Invoke-RestMethod "http://localhost:8000/weather/paris"
```

## Project Structure

```text
weather-mcp-fullstack/
|-- backend/
|   |-- app.py                     # FastAPI routes and CORS setup
|   |-- tools/weather_service.py   # Open-Meteo requests and data processing
|   |-- requirements.txt           # Python packages
|   `-- test_weather.py            # Backend unit tests
|-- frontend/
|   |-- .env.example               # Example frontend configuration
|   |-- src/App.tsx                # Search, API request, and page state
|   |-- src/components/
|   |   `-- WeatherDisplay.tsx     # Weather result component
|   `-- package.json               # JavaScript packages and commands
`-- README.md
```

## Run the Checks

Backend tests:

```powershell
Set-Location backend
python -m unittest test_weather.py
```

Frontend lint and build:

```powershell
Set-Location frontend
npm run lint
npm run build
```

## Common Problems

### PowerShell blocks virtual environment activation

Allow scripts only for the current terminal, then activate the environment:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
.\.venv\Scripts\Activate.ps1
```

### The page says it cannot load data

Confirm the backend terminal is still running and open
<http://localhost:8000/weather/london>. If that page does not load, restart the
backend command from the `backend` folder.

### Port 8000 is already in use

Start the backend on another port and give the frontend the same address:

```powershell
python -m uvicorn app:app --reload --port 8001
```

Set `VITE_API_BASE_URL=http://localhost:8001` in `frontend/.env`, then restart
the frontend.

### The browser reports a CORS error

Run the frontend at `http://localhost:5173`. If you choose another frontend
port, add its origin to `allow_origins` in `backend/app.py`.

## Next Steps

Good beginner exercises include adding a temperature unit switch, displaying a
multi-day forecast, replacing the demo fallback with a dedicated error panel,
and writing a component test for the weather display.

## Use the MCP Server

The MCP server uses the standard input/output (`stdio`) transport. An MCP client
starts `backend/server.py` as a child process, discovers its tools, and calls
them as needed. Do not start the server separately when using an MCP client.

### Install the MCP Dependencies

From the project root, create the backend virtual environment and install the
dependencies if you have not already done so:

```powershell
python -m venv backend/.venv
./backend/.venv/Scripts/python.exe -m pip install -r backend/requirements.txt
```

### Test with the Included Client

The included Python client starts the server, calls `get_current_weather`, and
prints the result:

```powershell
./backend/.venv/Scripts/python.exe ./backend/mcp_client.py London
```

### Configure VS Code as an MCP Client

The included `.vscode/mcp.json` configures the server for Windows:

```json
{
    "servers": {
        "weatherMcp": {
            "type": "stdio",
            "command": "${workspaceFolder}/backend/.venv/Scripts/python.exe",
            "args": ["${workspaceFolder}/backend/server.py"],
            "cwd": "${workspaceFolder}/backend"
        }
    }
}
```

On macOS or Linux, change `command` to
`${workspaceFolder}/backend/.venv/bin/python`.

Reload VS Code after saving the configuration. The MCP client launches the
server automatically when a weather tool is used. You can then ask an AI
assistant questions such as:

- `What is the current weather in London?`
- `Give me the weather in Paris for the next two days.`
- `Get detailed weather for Tokyo and include the forecast.`

The server exposes these tools:

| Tool | Purpose |
| --- | --- |
| `get_current_weather` | Get current weather for a city |
| `get_weather_by_date_range` | Get weather between two dates |
| `get_weather_details` | Get detailed JSON data with an optional forecast |

To verify the MCP handshake and tool discovery, run:

```powershell
./backend/.venv/Scripts/python.exe -m unittest backend/test_mcp_stdio.py
```

## Data Attribution

Weather data by [Open-Meteo.com](https://open-meteo.com/).