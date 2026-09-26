import { useState } from "react";
import type { SubmitEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import WeatherDisplay from "./components/WeatherDisplay";
import type { WeatherData } from "./components/WeatherDisplay";
import "./App.css";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

function App() {
  const [count, setCount] = useState(0);
  const [city, setCity] = useState("london");
  const [inputValue, setInputValue] = useState("london");
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateCity = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed) return "City name cannot be empty";
    if (trimmed.length > 15) return "City name must be 15 characters or fewer";
    if (!/^[a-zA-Z\s]+$/.test(trimmed))
      return "City name must contain only letters and spaces";
    return null;
  };

  const handleCitySubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const error = validateCity(inputValue);
    setValidationError(error);
    if (error) return;
    const newCity = inputValue.trim().toLowerCase();
    setCity(newCity);
  };

  const {
    data: weather,
    isLoading,
    error: queryError,
    refetch,
  } = useQuery<WeatherData>({
    queryKey: ["weather", city],
    queryFn: async () => {
      const response = await axios.get<WeatherData>(
        `${API_BASE_URL}/weather/${encodeURIComponent(city)}`,
      );
      return response.data;
    },
    retry: 1,
    enabled: !!city,
  });

  const handleRefresh = () => {
    setCount((c) => c + 1);
    refetch();
  };

  const displayWeather = weather || {
    city: city.charAt(0).toUpperCase() + city.slice(1),
    latitude: 51.51,
    longitude: -0.13,
    time: "2026-09-26T12:00",
    temperature_c: 15.2,
    relative_humidity_percent: 78,
    dew_point_c: 11.5,
    weather_code: 3,
    weather_description: "Overcast",
    wind_speed_kmh: 12.4,
    wind_direction_degrees: 240,
    wind_gusts_kmh: 18.2,
    precipitation_mm: 0.0,
    rain_mm: 0.0,
    snowfall_cm: 0.0,
    precipitation_probability_percent: 10,
    pressure_hpa: 1018.0,
    cloud_cover_percent: 95,
    uv_index: 1.8,
    apparent_temperature_c: 14.1,
    visibility_m: 12000.0,
    sunrise: "2026-09-26T06:45",
    sunset: "2026-09-26T19:10",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 p-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff20_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
          <div className="mx-auto w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-4 shadow-inner relative z-10">
            <span className="text-5xl drop-shadow-md">☀️</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter relative z-10">
            Weather MCP
          </h1>
          <p className="mt-2 opacity-90 text-sm relative z-10">
            Real-time weather from your local backend
          </p>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* City Input */}
          <form onSubmit={handleCitySubmit} className="mb-6">
            <label
              htmlFor="city-input"
              className="block text-sm font-medium text-gray-700 mb-3"
            >
              Enter city name (max 15 characters, letters & spaces only)
            </label>
            <div className="rounded-3xl border border-gray-200 bg-white shadow-sm focus-within:shadow-md focus-within:border-indigo-300 transition-all">
              <input
                id="city-input"
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  if (validationError) setValidationError(null);
                }}
                maxLength={15}
                className="w-full px-5 py-4 text-lg focus:outline-none bg-transparent rounded-3xl text-gray-900 placeholder:text-gray-400"
                placeholder="e.g. London"
                aria-describedby={validationError ? "city-error" : undefined}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-3xl transition-all active:scale-[0.985] shadow-lg shadow-indigo-500/30"
            >
              <span>🔍</span> Search
            </button>
            {validationError && (
              <p
                id="city-error"
                className="mt-3 text-red-500 text-sm flex items-center gap-1"
              >
                ⚠️ {validationError}
              </p>
            )}
          </form>

          {isLoading && (
            <div className="text-blue-600 text-center">Loading weather...</div>
          )}
          {(queryError || validationError) && (
            <div className="text-red-500 text-sm text-center mb-4">
              {validationError || "Error loading data. Using demo values."}
            </div>
          )}
          <WeatherDisplay weather={displayWeather} />

          <button
            type="button"
            onClick={handleRefresh}
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium py-4 px-6 rounded-2xl transition-all active:scale-[0.985] flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 mt-8"
          >
            {isLoading
              ? "Fetching..."
              : `Refresh ${displayWeather.city} (clicked ${count} times)`}
            <span>↻</span>
          </button>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 px-8 py-6 text-xs text-gray-400 flex justify-between items-center">
          <div>Powered by MCP • React + TS + Tailwind</div>
          <div className="flex gap-4">
            <a
              href="https://modelcontextprotocol.io"
              target="_blank"
              className="hover:text-gray-600"
              rel="noopener noreferrer"
            >
              Docs
            </a>
            <a
              href="https://github.com/modelcontextprotocol"
              target="_blank"
              className="hover:text-gray-600"
              rel="noopener noreferrer"
            >
              Backend (weather-mcp)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
