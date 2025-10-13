import { create } from 'zustand';

import {
  ShortenedURL,
  URLService,
} from '@tsus/shared-lib';
import { callAPIServer } from '@/utils/apiServer';

// Define the states, setters, and actions for the shortened URL store
interface ShortenedURLStore {
  // States
  shortenedURLs: ShortenedURL[];
  query: string;

  // Setters
  setQuery: (query: string) => void;

  // Actions
  encodeUrl: (longUrl: string) => Promise<string>;
  decodeUrl: (shortPath: string) => Promise<string>;
  fetchUrls: (query?: string) => Promise<void>;
  validateUrl: (url: string) => boolean;
}

export const useShortenedURLStore = create<ShortenedURLStore>((set) => ({
  // States
  shortenedURLs: [],
  query: '',

  // Setters
  setQuery: (searchQuery) => set({ query: searchQuery }),

  // Actions
  encodeUrl: async (originalURL) => {
    // Try to encode the URL
    const shortenedURL: ShortenedURL = await callAPIServer(
      '/encode',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: originalURL }),
      }
    );

    // return the shortened URL
    return shortenedURL.encodedURL;
  },
  decodeUrl: async (encodedURL) => {
    // Try to encode the URL
    const shortenedURL: ShortenedURL = await callAPIServer(
      '/decode',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: encodedURL }),
      }
    );

    // return the shortened URL
    return shortenedURL.originalURL;
  },
  fetchUrls: async () => {
    // Try to encode the URL
    const shortenedURLs: ShortenedURL[] = await callAPIServer(
      '/list'
    );

    set({ shortenedURLs });
  },
  validateUrl: (url) => {
    const urlService = new URLService();
    return urlService.isValidUrl(url);
  },
}));
