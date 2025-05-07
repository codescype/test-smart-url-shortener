import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { node } from '@elysiajs/node';
import 'dotenv/config';

import routes from './routes/index.js';

import { hostname, port } from '@tsus/shared-lib';

// Setup the Elysia server
const app = new Elysia({ adapter: node() });

// Add CORS middleware to enable requests from different origins
app.use(cors());

// Add Swagger middleware for API documentation
app.use(swagger());

app.use(routes);

// listen for incoming requests
app.listen({ hostname, port }, (server) => {
  // Log the server URL to the console
  console.log(`🦊 Server is running at ${server.hostname}:${server.port}`);
});

export type App = typeof app;
