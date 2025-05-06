import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { node } from '@elysiajs/node';
import 'dotenv/config';

// Setup the Elysia server
const app = new Elysia({ adapter: node() });

// Add CORS middleware to enable requests from different origins
app.use(cors());

// Add Swagger middleware for API documentation
app.use(swagger());

app
  .onError(({ error }) => {
    // @ts-expect-error Response is not a valid type
    new Response(error.toString());
  })
  .get('/', () => 'Hello From the Server!');

// Set the host name for the server
const hostname = process.env.SERVER_APP_HOST ?? '127.0.0.1';
// Set the port for the server to listen on
const port = process.env.SERVER_APP_PORT ?? 3001;

// listen for incoming requests
app.listen({ hostname, port }, (server) => {
  // Log the server URL to the console
  console.log(`🦊 Server is running at ${server.hostname}:${server.port}`);
});

export default app;
