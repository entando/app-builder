// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

Cypress.Commands.add('getOauth2Data', () => {
  Cypress.log({ name: 'oauth2Data' });

  const url = Cypress.config('oauth2.url');
  const realm = Cypress.config('oauth2.realm');
  const clientId = Cypress.config('oauth2.clientId');
  const data = {
    url,
    realmPath: `${url}/auth/realms/${realm}`,
    realm,
    clientId,
  };

  cy.wrap(data).as('oauth2Data');
});

Cypress.Commands.add('keycloackLogin', (oauth2Data, user) => {
  Cypress.log({ name: 'Login' });

  cy.fixture(`users/${user}`).then((userData) => {
    cy.request({
      url: `${oauth2Data.realmPath}/protocol/openid-connect/auth`,
      followRedirect: false,
      qs: {
        scope: 'openid',
        response_type: 'code',
        approval_prompt: 'auto',
        redirect_uri: Cypress.config('baseUrl'),
        client_id: oauth2Data.clientId,
      },
    })
      .then(() => {
        cy.visit(Cypress.config('baseUrl'));
        cy.get('#username').type(userData.username);
        cy.get('#password').type(userData.password);
        cy.get('.LoginPage__button').click();
      });
  });
});

Cypress.Commands.add('keycloackLogout', oauth2Data => cy.request({
  url: `${oauth2Data.realmPath}/protocol/openid-connect/logout`,
}));

Cypress.Commands.add('clearCache', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.window().then((win) => {
    win.sessionStorage.clear();
  });
});

// Convert this to a module instead of script (allows import/export)
export {};
