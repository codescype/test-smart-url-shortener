# ShortLink Setup Instructions

## Project Structure

- `apps/client`: Next.js frontend with Zustand.
- `apps/server`: Node.js backend with Elysia and controller-service pattern.
- `libs/shared`: Shared TypeScript utilities (compiled to `dist/libs/shared`).

## Prerequisites

- Node.js (>= 22.15.0)
- pnpm (>= 8.x)

## Setup

1. Clone the repository:
   ```bash
   git clone <gitlab-repo-url>
   cd <directory-name>
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```

## Running the Application

### Development

1. Start the frontend (which automatically starts backend on `http://localhost:3001`):
   ```bash
   pnpm nx dev client
   # or run both client and server explicitly
   pnpm nx run-many --target=serve -parallel
   ```
2. Access the frontend app at `http://localhost:3002`.
3. Test the backend APIs intuitively using Swagger at `http://localhost:3001/swagger`.

### Production

1. Build both client and server for production:
   ```bash
   pnpm nx run-many --target=build
   ```
2. Run server alone in production:
   ```bash
   pnpm nx start server
   ```
3. Run both server and client in production:
   ```bash
   pnpm nx start
   ```

## Debugging

1. Open VSCode and go to the Debug panel.
2. Select "Debug Client + Server" or individual configurations.
3. Set breakpoints in `apps/client/src` or `apps/server/src`.

## Running Tests

1. Run backend unit tests:
   ```bash
   pnpm nx run server:test
   ```
2. Run backend e2e tests:
   ```bash
   pnpm nx run server-e2e:test
   ```
