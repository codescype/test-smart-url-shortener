import { Elysia, t } from 'elysia';

import { ShortenedURLController } from './../controllers/ShortenedURL.controller.js';

// Instantiate the URLShortenerService
const shortenedURLController = new ShortenedURLController();

const apiRoutes = new Elysia()
  .onError(({ code, error }) => {
    console.error('Error:', error);

    return {
      status: code,
      message: error,
    };
  })
  .group('/api', (app) => {
    return app
      .post(
        '/encode',
        ({ body, error }) => {
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
      .post(
        '/decode',
        ({ body, error }) => {
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
      .get('/statistic/:encodedURLPath', ({ params, error }) => {
        const shortenedURL = shortenedURLController.getStats(
          params.encodedURLPath
        );

        // Return 404 if the URL is not found
        if (!shortenedURL) {
          return error(404, 'URL not found');
        }

        // Return the shortened URL data as JSON
        return { ...shortenedURL };
      })
      .get('/list', ({ error }) => {
        const shortenedURLs = shortenedURLController.list();

        // Return 404 if the URLs are not found
        if (!shortenedURLs) {
          return error(404, 'URL not found');
        }

        // Return the shortened URL data as JSON
        return [...shortenedURLs];
      });
  })
  .get('/:encodedURLPath', ({ params, error, redirect }) => {
    const shortenedURL = shortenedURLController.getStats(params.encodedURLPath);

    // Return 404 if the URL is not found
    if (!shortenedURL) {
      return error(404, 'URL not found');
    }

    // Redirect to the original URL
    return redirect(shortenedURL.originalURL);
  });

export default apiRoutes;
