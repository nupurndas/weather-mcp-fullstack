<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

- Follow React + TypeScript best practices: functional components with hooks, TypeScript for all files, strict linting, responsive Tailwind CSS for UI.
- For MCP backend (in sibling weather-mcp folder): Use TypeScript, follow Model Context Protocol specs for weather tools (e.g., getCurrentWeather, getForecast).
- Structure: Separate concerns (components, services, types). Use React Query or SWR for data fetching. Add error boundaries, loading states.
- Testing: Add Vitest + React Testing Library.
- Accessibility: ARIA labels, semantic HTML.
- Performance: Memoization where needed, avoid unnecessary re-renders.
- Documentation: Keep README.md updated with setup, API keys (use env vars), usage.

Work through the project-setup checklist in this file. Update progress as steps complete. Clean comments at end.