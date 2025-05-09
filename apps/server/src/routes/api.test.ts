import { describe, expect } from '@jest/globals';
import { Elysia } from 'elysia';
import { treaty } from '@elysiajs/eden';

import apiRoutes from './api';
import { testURLs } from '@tsus/shared-lib/URL/testURLs.data';

// Initialize the Elysia app with the API routes
const app = new Elysia().use(apiRoutes).get('/hello', () => 'Hello World!');
const api = treaty(app);

describe('API Routes', () => {
  describe('GET /hello', () => {
    it('should return "Hello World!"', async () => {
      const { status, data } = await api.hello.get();

      expect(status).toBe(200);
      expect(data).toBe('Hello World!');
    });
  });

  describe('POST /api/encode', () => {
    it('should encode a valid URL and return the shortened URL', async () => {
      const { status, data } = await api.api.encode.post({ url: 'https://example.com/123' });

      expect(status).toBe(200);
      expect(data).toHaveProperty('originalURL', 'https://example.com/123');
      expect(data).toHaveProperty('encodedURL');
      expect(data.encodedURL).toMatch(/^http/);
    });

    it('should return a 400 error for an invalid URL', async () => {
      const { status, data } = await api.api.encode.post({ url: '' });

      expect(status).toBe(400);
      expect(data).toHaveProperty('message', 'Invalid URL');
    });
  });

  describe('POST /api/decode', () => {
    it('should decode a valid shortened URL and return the original URL', async () => {
      // First, encode a URL
      const { data: encodedData } = await api.api.encode.post({
        url: 'https://example.com',
      });

      const shortenedURL = encodedData.encodedURL;

      // Decode the shortened URL
      const { data: decodedData, status } = await api.api.decode.post({
        url: shortenedURL,
      });

      expect(status).toBe(200);
      expect(decodedData).toHaveProperty('originalURL', 'https://example.com');
    });

    it('should return a 404 error for a non-existent shortened URL', async () => {
      const { status, data } = await api.api.decode.post({
        url: 'http://short.url/nonexistent',
      });

      expect(status).toBe(404);
      expect(data).toHaveProperty('message', 'URL not found');
    });
  });
});
