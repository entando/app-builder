// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

import {
  TEST_ID_USER_FORM,
  TEST_ID_USER_LIST_TABLE,
  TEST_ID_USER_PROFILE_FORM,
  TEST_ID_USER_SEARCH_FORM,
} from '../../../src/ui/test-const';

const TEST_ID_KEY = 'data-testid';

Cypress.Commands.add('getByTestId', (selector, ...args) => cy.get(`[${TEST_ID_KEY}=${selector}]`, ...args));

Cypress.Commands.add('getById', (selector, ...args) => cy.get(`[id=${selector}]`, ...args));

Cypress.Commands.add('getByName', (selector, ...args) => cy.get(`[name=${selector}]`, ...args));

Cypress.Commands.add('getModalDialogByTitle', (title) => {
  cy.wait(500); // Wait until the animation is completed
  cy.get('.modal-dialog').contains(title);
});

Cypress.Commands.add('getPageTitle', () => cy.get('h1'));

Cypress.Commands.add('getLabelByText', selector => cy.get('label').contains(selector));

Cypress.Commands.add('getButtonByText', text => cy.get('button').contains(text));

Cypress.Commands.add('getTableRowsBySelector', selector => cy.contains('td', selector).siblings());

Cypress.Commands.add('getTableRowsByTestId', selector => cy.getByTestId(selector).find('tbody > tr'));

Cypress.Commands.add('getTableColsByTestId', selector => cy.getByTestId(selector).find('thead > tr > th'));

Cypress.Commands.add('getTableActions', selector => cy.getById(`${selector}-actions`));

Cypress.Commands.add('getVisibleActionItemByTestID', selector => cy.getByTestId(selector).filter(':visible'));

Cypress.Commands.add('getVisibleActionItemByClass', className => cy.get(`li.${className} > a`).filter(':visible'));

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

Cypress.Commands.add('closeWizardAppTour', () => {
  cy.log('Close App Tour Wizard');
  const status = JSON.parse(localStorage.getItem('redux')).appTour.appTourProgress;
  cy.log(`AppTourWizardDialog status ${status}`);
  if (status !== 'cancelled') {
    cy.log('AppTourWizardDialog is active');
    cy.get('.reactour__helper--is-open').then(() => {
      cy.wait(500); // Wait until the animation of the App Tour dialog is completed
      cy.getButtonByText('Close').click();
      cy.getButtonByText('Yes').click();
    });
  } else {
    cy.log('AppTourWizardDialog is NOT active');
  }
});


Cypress.Commands.add('openPageFromMenu', (menuLinks) => {
  cy.log('Open a page from menu');
  cy.contains('Dashboard').click();
  cy.closeWizardAppTour();
  cy.log('Click Menu Group', menuLinks[0]);
  cy.contains(menuLinks[0]).trigger('mouseover');
  cy.wait(200);
  if (menuLinks[1]) {
    cy.log('Click Page Menu Item', menuLinks[1]);
    cy.get('li.secondary-nav-item-pf.is-hover.list-group-item').contains(menuLinks[1]).click();
  }
});

Cypress.Commands.add('addUser', (username, password, profileTypeCode, button) => {
  cy.log(`Add the new user  ${username}`);
  cy.openPageFromMenu(['Users', 'Management']);
  cy.getButtonByText('Add').click();
  cy.getByName(TEST_ID_USER_FORM.USERNAME_FIELD).type(username);
  cy.getByName(TEST_ID_USER_FORM.PASSWORD_FIELD).type(password);
  cy.getByName(TEST_ID_USER_FORM.CONFIRM_PASSWORD_FIELD).type(password);
  cy.getByName(TEST_ID_USER_FORM.PROFILE_TYPE_FIELD).select(profileTypeCode);
  if (button) {
    cy.getByTestId(button).click();
  } else {
    cy.getByTestId(TEST_ID_USER_FORM.SAVE_BUTTON).click();
  }
});

Cypress.Commands.add('searchUser', (username) => {
  cy.log(`Search User ${username}`);
  cy.openPageFromMenu(['Users', 'Management']);
  cy.getByTestId(TEST_ID_USER_SEARCH_FORM.USERNAME_FIELD).clear();
  cy.getByTestId(TEST_ID_USER_SEARCH_FORM.USERNAME_FIELD).type(username);
  cy.getByTestId(TEST_ID_USER_SEARCH_FORM.SEARCH_BUTTON).click();
});

Cypress.Commands.add('deleteUser', (username) => {
  cy.log(`Delete user ${username}`);
  cy.searchUser(username);
  cy.getTableActions(username).click();
  cy.getVisibleActionItemByTestID(TEST_ID_USER_LIST_TABLE.ACTION_DELETE_USER).click();
  cy.getModalDialogByTitle('Delete user').should('be.visible');
  cy.getButtonByText('Delete').click();
});

Cypress.Commands.add('editUserProfile', (username, fullname, email) => {
  cy.searchUser(username);
  cy.getTableActions(username).click();
  cy.getVisibleActionItemByClass(TEST_ID_USER_LIST_TABLE.ACTION_EDIT_PROFILE).click();
  cy.validateUrlChanged(`/userprofile/${username}`);
  cy.getByName(TEST_ID_USER_PROFILE_FORM.FULL_NAME_FIELD).type(fullname);
  cy.getByName(TEST_ID_USER_PROFILE_FORM.EMAIL_FIELD).type(email);
  cy.getByTestId(TEST_ID_USER_PROFILE_FORM.SAVE_BUTTON).click();
});


// Convert this to a module instead of script (allows import/export)
export {};
