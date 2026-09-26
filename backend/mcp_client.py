import argparse
import asyncio
import sys
from pathlib import Path

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
from mcp.types import TextContent


BACKEND_DIR = Path(__file__).parent


async def get_weather_through_mcp(city: str) -> str:
    server = StdioServerParameters(
        command=sys.executable,
        args=["server.py"],
        cwd=BACKEND_DIR,
    )

    async with stdio_client(server) as (read_stream, write_stream):
        async with ClientSession(read_stream, write_stream) as session:
            await session.initialize()
            result = await session.call_tool(
                "get_current_weather",
                arguments={"city": city},
            )

    if result.is_error:
        raise RuntimeError(f"The MCP tool returned an error: {result.content}")

    text_parts = [
        content.text
        for content in result.content
        if isinstance(content, TextContent)
    ]
    return "\n".join(text_parts)


def main() -> None:
    parser = argparse.ArgumentParser(description="Call the weather MCP server")
    parser.add_argument("city", help="City whose current weather should be fetched")
    args = parser.parse_args()

    print(asyncio.run(get_weather_through_mcp(args.city)))


if __name__ == "__main__":
    main()