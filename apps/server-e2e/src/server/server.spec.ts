import axios from 'axios';

import { hostname, port } from '@tsus/shared-lib/server/config';

describe('Elysia Server API tests', () => {
  // Set the base URL for the server
  const baseUrl = `http://${hostname}:${port}`;

  it('should return a message from the root API', async () => {

    const response = await axios.get(`${baseUrl}/`);

    expect(response.status).toBe(200);
    expect(response.data).toBe('Hello From the Server!');
  });
});
