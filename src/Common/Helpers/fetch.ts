import nodeFetch, { HeadersInit } from 'node-fetch';

export default (
  url: string,
  method: string,
  body: object,
  headers: HeadersInit,
) => nodeFetch(url, {
  method,
  body: JSON.stringify(body),
  headers,
});
