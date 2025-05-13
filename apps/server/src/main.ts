import { Elysia } from 'elysia';
import { node } from '@elysiajs/node';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import 'dotenv/config';

import routes from './routes';

import { hostname, port } from '@tsus/shared-lib';

// Setup the Elysia server
const app = new Elysia({ adapter: node() });

// Add CORS middleware to enable requests from different origins
app.use(cors());

// Add Swagger middleware for API documentation
app.use(swagger());

app.use(routes);

// listen for incoming requests
app.listen({ hostname, port }, () => {
  const baseURL = `http://${hostname}:${port}`;

  // Log the server URL to the console
  console.log(`🦊 Server is running at ${baseURL}`);
  console.log(`📖 API documentation is available at ${baseURL}/swagger`);
});

export type App = typeof app;
