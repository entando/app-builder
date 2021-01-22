import { makeServer } from '../../../src/server';


describe('Users', () => {
  let server;
  beforeEach(() => {
    server = makeServer({ environment: 'test' });
    cy.getOauth2Data();
    cy.get('@oauth2Data').then((oauth2Data) => {
      cy.keycloackLogin(oauth2Data, 'user');
    });
  });

  afterEach(() => {
    server.shutdown();
    cy.get('@oauth2Data').then((oauth2Data) => {
      cy.keycloackLogout(oauth2Data);
    });
    cy.clearCache();
  });

  describe('Access to the user page', () => {
    it('Should display the targeted page', () => {
      server.create('user', { id: 1, name: 'Luke' });
      cy.visit('/');

      cy.get('[data-id=menu-user-settings]').click(); // This is a good selector

    });
  });
});

