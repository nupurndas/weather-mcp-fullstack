"""MCP server that exposes the shared weather service as AI tools."""

from mcp.server.mcpserver import MCPServer

from tools.weather_service import WeatherService

mcp = MCPServer(
    "weather-mcp-server",
    instructions="Use these tools to answer questions about current and forecast weather.",
)


@mcp.tool()
async def get_current_weather(city: str) -> str:
    """Get current weather for a city."""
    service = WeatherService()
    data = await service.get_current_weather(city)
    return service.format_current_weather_response(data)


@mcp.tool()
async def get_weather_by_date_range(city: str, start_date: str, end_date: str) -> str:
    """Get weather for a date range."""
    service = WeatherService()
    data = await service.get_weather_by_date_range(city, start_date, end_date)
    return service.format_weather_range_response(data)


@mcp.tool()
async def get_weather_details(city: str, include_forecast: bool = False) -> dict:
    """Get detailed weather data as JSON."""
    service = WeatherService()
    data = await service.get_current_weather(city)
    if include_forecast:
        from datetime import datetime, timedelta
        today = datetime.now().strftime("%Y-%m-%d")
        tomorrow = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")
        forecast = await service.get_weather_by_date_range(city, today, tomorrow)
        data["forecast"] = forecast
    return data


if __name__ == "__main__":
    mcp.run(transport="stdio")