import unittest

from server import mcp


class MCPServerTests(unittest.IsolatedAsyncioTestCase):
    async def test_weather_tools_are_registered(self):
        tool_names = {tool.name for tool in await mcp.list_tools()}

        self.assertEqual(
            tool_names,
            {
                "get_current_weather",
                "get_weather_by_date_range",
                "get_weather_details",
            },
        )


if __name__ == "__main__":
    unittest.main()