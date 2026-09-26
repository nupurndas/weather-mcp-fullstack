export type WeatherData = {
  city: string;
  latitude: number;
  longitude: number;
  time: string;
  temperature_c: number;
  relative_humidity_percent: number;
  dew_point_c: number;
  weather_code: number;
  weather_description: string;
  wind_speed_kmh: number;
  wind_direction_degrees: number;
  wind_gusts_kmh: number;
  precipitation_mm: number;
  rain_mm: number;
  snowfall_cm: number;
  precipitation_probability_percent: number;
  pressure_hpa: number;
  cloud_cover_percent: number;
  uv_index: number;
  apparent_temperature_c: number;
  visibility_m: number;
  sunrise: string;
  sunset: string;
};

interface WeatherDisplayProps {
  weather: WeatherData;
}

export default function WeatherDisplay({ weather }: WeatherDisplayProps) {
  const getWeatherEmoji = (code: number) => {
    if (code === 0) return "☀️";
    if ([1, 2, 3].includes(code)) return "⛅";
    if ([45, 48].includes(code)) return "🌫️";
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "🌧️";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️";
    return "🌤️";
  };

  return (
    <div>
      {/* Main weather display */}
      <div className="text-center mb-8">
        <div className="text-7xl mb-3 transition-transform hover:scale-110">
          {getWeatherEmoji(weather.weather_code)}
        </div>
        <div className="text-6xl font-light text-gray-900 tracking-tighter">
          {weather.temperature_c}°C
        </div>
        <div className="text-2xl font-medium text-gray-600 mt-1">
          {weather.city}
        </div>
        <div className="text-base text-emerald-600 mt-2 font-medium">
          {weather.weather_description} • Feels like{" "}
          {weather.apparent_temperature_c}°C
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-5 text-center border border-blue-100">
          <div className="text-xs tracking-widest text-blue-500 font-medium">
            HUMIDITY
          </div>
          <div className="text-4xl font-semibold text-gray-800 mt-2">
            {weather.relative_humidity_percent}%
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-5 text-center border border-amber-100">
          <div className="text-xs tracking-widest text-amber-500 font-medium">
            WIND
          </div>
          <div className="text-4xl font-semibold text-gray-800 mt-2">
            {weather.wind_speed_kmh} <span className="text-base">km/h</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">UV Index</span>
          <span className="font-medium text-violet-600">
            {weather.uv_index}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Pressure</span>
          <span className="font-medium">{weather.pressure_hpa} hPa</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Visibility</span>
          <span className="font-medium">
            {(weather.visibility_m / 1000).toFixed(1)} km
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Sunrise</span>
          <span className="font-medium text-amber-500">{weather.sunrise}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Sunset</span>
          <span className="font-medium text-orange-500">{weather.sunset}</span>
        </div>
      </div>
    </div>
  );
}
