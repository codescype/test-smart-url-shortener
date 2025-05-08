import 'dotenv/config';

import {
  ShortenedURL,
  ShortenedURLService,
} from '@tsus/shared-lib/ShortenedURL/index.js';
import { testURLs } from '@tsus/shared-lib/URL/testURLs.data.js';

export class ShortenedURLController {
  // Instantiate the URLShortenerService
  private readonly shortenedURLService: ShortenedURLService =
    new ShortenedURLService();

  constructor() {
    // Initialize the store with test URLs
    testURLs.forEach((url) => {
      this.shortenedURLService.encode(url);
    });

    console.info('ShortenedURLController initialized with test URLs');
  }

  // Encode and store URL
  encode(originalURL: string): ShortenedURL | null {
    try {
      return this.shortenedURLService.encode(originalURL);
    } catch (error) {
      console.error('Error encoding URL:', error);
      return null;
    }
  }

  // Decode and retrieve original URL
  decode(encodedURL: string): ShortenedURL | null {
    try {
      return this.shortenedURLService.findShortenedURLWithURL(
        encodedURL,
        false
      );
    } catch (error) {
      console.error('Error decoding URL:', error);
      return null;
    }
  }

  // Get statistics for a specific URL
  getStats(encodedURLPath: string): ShortenedURL | null {
    try {
      return (
        this.shortenedURLService.findShortenedURLWithURLPath(encodedURLPath) ||
        null
      );
    } catch (error) {
      console.error('Error getting URL stats:', error);
      return null;
    }
  }

  // Get all URLs with optional search
  list(search?: string): ShortenedURL[] | null {
    try {
      return this.shortenedURLService.list(search);
    } catch (error) {
      console.error('Error listing URLs:', error);
      return null;
    }
  }
}
