import { Elysia } from 'elysia';

const routes = new Elysia()
  .onError(({ error }) => {
    new Response(error.toString());
  })
  .get('/', () => 'Hello From the Server!');

export default routes;
