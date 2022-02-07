import nodeFetch from 'node-fetch';

export default (
  url: string,
  method: string,
  body: object,
  headers: object,
) => nodeFetch(url, {
  method,
  body: JSON.stringify(body),
  headers,
});
