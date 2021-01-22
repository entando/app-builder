// src/server.js
import { createServer, Model } from 'miragejs';

// eslint-disable-next-line import/prefer-default-export
export function makeServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    models: {
      user: Model,
    },

    // eslint-disable-next-line no-shadow
    seeds(server) {
      server.create('user', { name: 'Bob' });
      server.create('user', { name: 'Alice' });
    },

    routes() {
      this.namespace = 'api';

      this.get('/users', schema => schema.users.all());
    },
  });

  return server;
}
