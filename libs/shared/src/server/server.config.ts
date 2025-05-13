// Set the host name for the server
export const hostname = process.env.SERVER_APP_HOST ?? '127.0.0.1';

// Set the port for the server to listen on
export const port = process.env.SERVER_APP_PORT ?? 3001;

export const baseURL = `http://${hostname}:${port}`;

export const apiPath = '/api';

export const apiURL = `${baseURL}${apiPath}`;

export const shortenedUrlAPISearchPath = '/statistic';