import { atom } from 'nanostores';
import { nanoid } from 'nanoid';
import 'dotenv/config';

import { URLService } from '../URL/URL.service';
import { ShortenedURL } from './ShortenedURL.model';
import { encodedURLPrefix } from './shortenedURL.config';

export class ShortenedURLService extends URLService {
  // Reactive store for transformed URLs
  private readonly shortenedURLStore = atom<ShortenedURL[]>([]);

  constructor() {
    super();
  }

  // Encode and store a URL
  encode(originalURL: string): ShortenedURL {
    // Check if the URL is valid
    if (!this.isValidUrl(originalURL)) throw new Error('Invalid URL');

    // Check if the URL already exists
    const existingShortenedURL = this.findShortenedURLWithURL(
      originalURL,
      true
    );
    // If it exists, return the existing encoded URL
    if (existingShortenedURL) return existingShortenedURL;

    // If it doesn't exist, create a new one

    // Generate a unique short path
    const shortPath = nanoid(8);
    // Create the encoded URL
    const encodedURL = `${encodedURLPrefix}/${shortPath}`;

    // Create a new ShortenedURL
    const shortenedURL: ShortenedURL = new ShortenedURL({
      originalURL,
      encodedURL,
      createdAt: new Date(),
      views: 0,
      lastViewed: null,
    });

    // Add the new URL to the store
    this.shortenedURLStore.set([...this.shortenedURLStore.get(), shortenedURL]);

    // Return the encoded URL Data
    return shortenedURL;
  }

  // Get statistics for a specific URL
  findShortenedURLWithURL(
    url: string,
    isOriginalURL = true
  ): ShortenedURL | null {
    // Check if the URL is valid
    if (!this.isValidUrl(url)) throw new Error('Invalid URL');

    // Get the list of URLs from the store
    const urls = this.shortenedURLStore.get();
    // Find the URL in the store
    const existingShortenedURLIndex = this.findShortenedURLFromStore(url, isOriginalURL);

    // If not found, return null
    if (existingShortenedURLIndex === null) {
      return null;
    }

    // If found get the ShortenedURL
    const existingShortenedURL = urls[existingShortenedURLIndex];

    // Update the last viewed date and number of views
    existingShortenedURL.lastViewed = new Date();
    existingShortenedURL.views += 1;


    // Update the urls array with the modified URL data
    urls[existingShortenedURLIndex] = existingShortenedURL;
    // Update the store to trigger reactivity
    this.shortenedURLStore.set([...urls]);

    // Return the original URL
    return existingShortenedURL;
  }

  // Find a shortened URL with a specific EncodedURL path
  findShortenedURLWithURLPath(encodedURLPath: string): ShortenedURL | null {
    return this.findShortenedURLWithURL(
      `${encodedURLPrefix}/${encodedURLPath}`,
      false
    );
  }

  // Get all URLs with optional search
  list(): ShortenedURL[] {
    const urls = this.shortenedURLStore.get();
    
    return urls;
  }

  // Find a shortened URL in the store with a URL
  private findShortenedURLFromStore(
    url: string,
    isOriginalURL = true
  ): number | null {
    const existingShortenedURLIndex = this.shortenedURLStore
      .get()
      .findIndex((shortenedURL) =>
        isOriginalURL
          ? shortenedURL.originalURL === url
          : shortenedURL.encodedURL === url
      );

    return existingShortenedURLIndex !== -1 ? existingShortenedURLIndex : null;
  }
}
