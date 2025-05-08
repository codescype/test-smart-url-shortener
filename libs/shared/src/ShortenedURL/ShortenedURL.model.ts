interface ShortenedURLInterface {
  originalURL: string;
  encodedURL: string;
  createdAt: Date;
  views: number;
  lastViewed: Date | null;
}

export class ShortenedURL {
    originalURL: string;
    encodedURL: string;
    createdAt: Date;
    views: number;
    lastViewed: Date | null;

    constructor(shortenedURLData: ShortenedURLInterface ) {
    this.originalURL = shortenedURLData.originalURL;
    this.encodedURL = shortenedURLData.encodedURL;
    this.createdAt = shortenedURLData.createdAt;
    this.views = shortenedURLData.views;
    this.lastViewed = shortenedURLData.lastViewed;
  }
}