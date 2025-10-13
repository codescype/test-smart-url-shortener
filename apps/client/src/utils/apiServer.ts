import {
  apiURL,
} from '@tsus/shared-lib';
console.log(`🚨 Server should be running at ${apiURL}`);

// Set up the API call function to make API calls to the server
export const callAPIServer = async (endpointPath: string, options?: RequestInit) => {
  const res = await fetch(`${apiURL}${endpointPath}`, options);
  const data = await res.json();

  console.info(`∴ Received a data ${data}`);

  if (data.error) throw new Error(data.error);

  return data;
};