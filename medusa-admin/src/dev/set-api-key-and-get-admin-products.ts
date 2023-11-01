import Medusa from '@medusajs/medusa-js';

const api_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNyXzAxSERLNDdKQjhEVlI5OVpIR1hKNEhBQzhRIiwiZG9tYWluIjoiYWRtaW4iLCJpYXQiOjE2OTg3NTg5NDMsImV4cCI6MTY5ODg0NTM0M30.aJi4zhFIzHOvxM4KkEJCgdHIztcJSDdaYd8SJdz2y_M';

const account = {
  email: 'camille.feghali@petsdeli.de',
  password: 'Insabgho@123',
};

const medusa = new Medusa({
  baseUrl: 'http://localhost:9000',
  maxRetries: 1,
  apiKey: api_token,
});

(function main() {
  medusa.admin.products.list().then(({ products }) => {
    console.log(JSON.stringify(products, null, 2));
  });
})();

function generateApiToken() {
  medusa.admin.auth.createSession({ ...account }).then(({ user }) => {
    medusa.admin.auth.getToken({ ...account }).then((session) => {
      medusa.admin.users
        .update(user.id, {
          api_token: session.access_token,
        })
        .then(({ user }) => {
          return user.api_token;
        });
    });
  });
}
