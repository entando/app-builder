// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

const TEST_ID_KEY = 'data-testid';

Cypress.Commands.add('closeWizardAppTour', () => {
  cy.log('Close App Tour Wizard');
  cy.get('.reactour__helper--is-open').then(() => {
    cy.wait(500); // Wait until the animation of the App Tour dialog is completed
    cy.get(`[${TEST_ID_KEY}=AppTour__TourStart__CancelButton]`).click();
    cy.get(`[${TEST_ID_KEY}=AppTour__TourStart__YesButton]`).click();
  });
});

Cypress.Commands.add('openPageFromMenu', (menuLinks, closeWizardAppTour) => {
  cy.log('Open a page from menu');
  cy.visit('/');
  if (closeWizardAppTour) {
    cy.closeWizardAppTour();
  }
  cy.log('Click Menu Group', menuLinks[0]);
  cy.contains(menuLinks[0]).click();
  if (menuLinks[1]) {
    cy.log('Click Page Menu Item', menuLinks[1]);
    cy.get('.active.is-hover.list-group-item').contains(menuLinks[1]).click();
  }
});

Cypress.Commands.add('appBuilderLogin', () => {
  cy.log('App-builder Login');
  cy.getOauth2Data();
  cy.get('@oauth2Data').then((oauth2Data) => {
    cy.keycloackLogin(oauth2Data, 'user');
  });
});

Cypress.Commands.add('appBuilderLogout', () => {
  cy.log('App-builder Logout');
  cy.get('@oauth2Data').then((oauth2Data) => {
    cy.keycloackLogout(oauth2Data);
  });
  cy.clearCache();
});

Cypress.Commands.add('getByTestId', (selector, ...args) => cy.get(`[${TEST_ID_KEY}=${selector}]`, ...args));

Cypress.Commands.add('getById', (selector, ...args) => cy.get(`[id=${selector}]`, ...args));

Cypress.Commands.add('getByName', (selector, ...args) => cy.get(`[name=${selector}]`, ...args));

Cypress.Commands.add('getModalDialog', title => cy.get('.modal-dialog').contains(title));

Cypress.Commands.add('getTableRowsBySelector', selector => cy.contains('td', selector).siblings());

Cypress.Commands.add('getTableActions', selector => cy.contains('td', selector).siblings().getById(`${selector}-actions`));

Cypress.Commands.add('getTableRows', () => cy.get('table').find('tbody > tr'));

Cypress.Commands.add('getVisibleActionItemByClass', className => cy.get(`li.${className} > a`).filter(':visible'));


Cypress.Commands.add('validateBreadcrumbItems', (items) => {
  items.forEach((item) => {
    cy.log('validate item', item);
    cy.get('li.BreadcrumbItem').contains(item).should('be.visible');
  });
});

Cypress.Commands.add('validateUrlChanged', (expectedUrl) => {
  cy.location('pathname').should('eq', expectedUrl);
});

Cypress.Commands.add('validateToastNotificationOk', (text) => {
  cy.get('div.toast-notifications-list-pf > div > span.pficon.pficon-ok').should('be.visible');
  cy.get('div.toast-notifications-list-pf > div').contains(text);
});

// Convert this to a module instead of script (allows import/export)
export {};
