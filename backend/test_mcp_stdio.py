import sys
import unittest
from pathlib import Path

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client


BACKEND_DIR = Path(__file__).parent


class MCPStdioTests(unittest.IsolatedAsyncioTestCase):
    async def test_client_completes_initialize_handshake(self):
        server = StdioServerParameters(
            command=sys.executable,
            args=["server.py"],
            cwd=BACKEND_DIR,
        )

        async with stdio_client(server) as (read_stream, write_stream):
            async with ClientSession(read_stream, write_stream) as session:
                result = await session.initialize()

        self.assertEqual(result.server_info.name, "weather-mcp-server")
        self.assertTrue(result.protocol_version)

    async def test_client_discovers_weather_tools(self):
        server = StdioServerParameters(
            command=sys.executable,
            args=["server.py"],
            cwd=BACKEND_DIR,
        )

        async with stdio_client(server) as (read_stream, write_stream):
            async with ClientSession(read_stream, write_stream) as session:
                await session.initialize()
                result = await session.list_tools()

        tools = {tool.name: tool for tool in result.tools}
        self.assertEqual(
            set(tools),
            {
                "get_current_weather",
                "get_weather_by_date_range",
                "get_weather_details",
            },
        )
        self.assertIn("city", tools["get_current_weather"].input_schema["properties"])
        self.assertIn("city", tools["get_current_weather"].input_schema["required"])


if __name__ == "__main__":
    unittest.main()