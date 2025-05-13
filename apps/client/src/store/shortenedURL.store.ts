import { create } from 'zustand';

import {
  apiURL,
  ShortenedURL,
  URLService,
} from '@tsus/shared-lib';
console.log(`🚨 Server should be running at ${apiURL}`);

// Set up the API call function to make API calls to the server
const apiCall = async (endpointPath: string, options?: RequestInit) => {
  const res = await fetch(`${apiURL}${endpointPath}`, options);
  const data = await res.json();

  console.info(`∴ Received a data ${data}`);

  if (data.error) throw new Error(data.error);

  return data;
};

// Define the state and actions for the shortened URL store
interface UrlState {
  shortenedURLs: ShortenedURL[];
  search: string;
  encodeUrl: (longUrl: string) => Promise<string>;
  decodeUrl: (shortPath: string) => Promise<string>;
  setSearch: (search: string) => void;
  fetchUrls: (search?: string) => Promise<void>;
  validateUrl: (url: string) => boolean;
}

export const useShortenedURLStore = create<UrlState>((set) => ({
  shortenedURLs: [],
  search: '',
  encodeUrl: async (originalURL) => {
    // Try to encode the URL
    const shortenedURL: ShortenedURL = await apiCall(
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
    const shortenedURL: ShortenedURL = await apiCall(
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
  setSearch: (search) => set({ search }),
  fetchUrls: async () => {
    // Try to encode the URL
    const shortenedURLs: ShortenedURL[] = await apiCall(
      '/list'
    );

    set({ shortenedURLs });
  },
  validateUrl: (url) => {
    const urlService = new URLService();
    return urlService.isValidUrl(url);
  },
}));
