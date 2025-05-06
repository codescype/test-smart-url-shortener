import { Elysia } from 'elysia';

const apiRoutes = new Elysia().group('/api', (app) => {
  return app
    .get(
      '/encode/:originalURL',
      ({ params }) => `Encode ${params.originalURL} on the API!`
    )
    .get(
      '/decode/:encodedURL',
      ({ params }) => `Decode ${params.encodedURL} on the API!`
    )
    .get(
      '/statistic/:encodedURL',
      ({ params }) => `Get statistic for ${params.encodedURL} on the API!`
    )
    .get('/:encodedURL', ({ params }) => `Redirect to ${params.encodedURL}`)
    .get('/list', () => 'List all URLs from the API!');
});

export default apiRoutes;
