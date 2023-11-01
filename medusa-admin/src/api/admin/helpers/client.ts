import Medusa from '@medusajs/medusa-js';

let client: Medusa | undefined;

export function medusaClient() {
  if (!client) {
    return new Medusa({
      maxRetries: 3,
      baseUrl: 'http://localhost:9000',
      apiKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNyXzAxSERLNDdKQjhEVlI5OVpIR1hKNEhBQzhRIiwiZG9tYWluIjoiYWRtaW4iLCJpYXQiOjE2OTg3NTg5NDMsImV4cCI6MTY5ODg0NTM0M30.aJi4zhFIzHOvxM4KkEJCgdHIztcJSDdaYd8SJdz2y_M',
    });
  }
  return client;
}
