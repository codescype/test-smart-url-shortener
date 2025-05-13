import { Elysia } from 'elysia';
import apiRoutes from './api';

const routes = new Elysia()
  .onError(({ error }) => {
    // @ts-expect-error type not found
    return new Response(error.toString());
  })
  .use(apiRoutes)
  .get('/', () => 'Hello From the Server!');

export default routes;
