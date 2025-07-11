import { Elysia, t } from 'elysia';

import { ShortenedURLController } from './../controllers/ShortenedURL.controller';
import { apiPath, shortenedUrlAPISearchPath } from '@tsus/shared-lib';

const apiRoutes = new Elysia()
  // Add an error handler to catch errors on the route
  .onError(({ code, error }) => {
    console.error('Error:', error);

    return {
      status: code,
      message: error,
    };
  })

  // Add a ShortenedURLController instance to the API routes
  .decorate('shortenedURLController', new ShortenedURLController())

  // Define routes for the routes group
  .group(apiPath, (app) => {
    return app
      // Define encode route
      .post(
        '/encode',
        ({ body, error, shortenedURLController }) => {
          const shortenedURL = shortenedURLController.encode(body.url);

          // Return 404 if the URL is not found
          if (!shortenedURL) {
            return error(404, 'URL not found');
          }

          // Return the shortened URL data as JSON
          return { ...shortenedURL };
        },
        { body: t.Object({ url: t.String() }) }
    )
      
      // Define decode route
      .post(
        '/decode',
        ({ body, error, shortenedURLController }) => {
          const decodedURL = shortenedURLController.decode(body.url);

          // Return 404 if the URL is not found
          if (!decodedURL) {
            return error(404, 'URL not found');
          }

          // Return the decoded URL data as JSON
          return { ...decodedURL };
        },
        { body: t.Object({ url: t.String() }) }
    )
      
      // Define search routes
      .get(
        `${shortenedUrlAPISearchPath}/:encodedURLPath`,
        ({ params, error, shortenedURLController }) => {
          const shortenedURL = shortenedURLController.getStats(
            params.encodedURLPath
          );

          // Return 404 if the URL is not found
          if (!shortenedURL) {
            return error(404, 'URL not found');
          }

          // Return the shortened URL data as JSON
          return { ...shortenedURL };
        }
    )
      
      // Define list route
      .get('/list', ({ error, shortenedURLController }) => {
        const shortenedURLs = shortenedURLController.list();

        // Return 404 if the URLs are not found
        if (!shortenedURLs) {
          return error(404, 'URL not found');
        }

        // Return the shortened URL data as JSON
        return [...shortenedURLs];
      });
  })

  // Define stats route
  .get('/:encodedURLPath', ({ params, error, shortenedURLController }) => {
    const shortenedURL = shortenedURLController.getStats(params.encodedURLPath);

    // Return 404 if the URL is not found
    if (!shortenedURL) {
      return error(404, 'URL not found');
    }

    // Return the shortened URL data as JSON
    return { ...shortenedURL };
  });

export default apiRoutes;
