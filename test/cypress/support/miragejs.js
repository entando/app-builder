// cypress/support/index.js
Cypress.on('window:before:load', (win) => {
  win.handleFromCypress = function (request) {
    return fetch(request.url, {
      method: request.method,
      headers: request.requestHeaders,
      body: request.requestBody,
    }).then((res) => {
      const content = res.headers.get('content-type').includes('application/json')
        ? res.json()
        : res.text();
      return new Promise((resolve) => {
        content.then(body => resolve([res.status, res.headers, body]));
      });
    });
  };
});
