import { TTrain, TLastTicket, CustomError } from "../models";

export const fetchData = async (url: string, signal: AbortSignal): Promise<TTrain[] | TLastTicket[]> => {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error: CustomError = new Error(`status: ${response.status}, text: ${response.statusText}`);
    error.status = response.status;
    console.log(`status: ${response.status}, text: ${response.statusText}`);
    throw error;
  }

  return await response.json();
};

export const fetchStatus= async (url: string, body = {}): Promise<boolean> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.ok;
};