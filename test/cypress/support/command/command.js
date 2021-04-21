import { escapeRegExp } from 'lodash/string';

const TEST_ID_KEY = 'data-testid';

/**
 *  Get DOM elements by TEST_ID_KEY
 *  @param selector - The data-testid of the DOM elements
 */
Cypress.Commands.add('getByTestId', (selector, ...args) => cy.get(`[${TEST_ID_KEY}=${selector}]`, ...args));

/**
 *  Get DOM elements by Id
 *  @param selector - The id of the DOM element
 */
Cypress.Commands.add('getById', (selector, ...args) => cy.get(`[id=${selector}]`, ...args));

/**
 *  Get input elements by name
 *  @param selector - The name of the DOM elements
 */
Cypress.Commands.add('getInputByName', (name, ...args) => cy.get(`input[name=${escapeRegExp(name)}]`, ...args));

/**
 *  Get Typeahead Option by value
 *  @param value - The the exact Option text displayed in the UI
 */
Cypress.Commands.add('getTypeaheadOptionByValue', (value, ...args) => cy.get('.dropdown-item', ...args).contains(value));

/**
 *  Get select elements by name
 *  @param selector - The name of the DOM elements
 */
Cypress.Commands.add('getSelectByName', (name, ...args) => cy.get(`select[name=${escapeRegExp(name)}]`, ...args));

/**
 *  Get DOM elements by name
 *  @param selector - The name of the DOM elements
 */
Cypress.Commands.add('getByName', (selector, ...args) => cy.get(`[name="${selector}"]`, ...args));

/**
 *  Get the modal dialog by title
 *  @param title - The title of the dialog
 */
Cypress.Commands.add('getModalDialogByTitle', (title) => {
  cy.wait(500); // Wait until the animation is completed
  cy.get('.modal-dialog').contains(title);
});

/**
 *  Get the main title of the page
 */
Cypress.Commands.add('getPageTitle', () => cy.get('h1'));

/**
 *  Get a label by text
 *  @param text - the exact label text displayed in the UI
 */
Cypress.Commands.add('getLabelByText', text => cy.get('label').contains(text));

/**
 *  Get a Button by text
 *  @param text - the exact label text displayed in the UI
 */
Cypress.Commands.add('getButtonByText', text => cy.get('button').contains(text));

/**
 *  Get DOM element by role
 *  @param selector - The role value of the element
 */
Cypress.Commands.add('getByRole', (selector, ...args) => cy.get(`[role=${selector}]`, ...args));

/**
 *  Get a row of the table using a selector
 *  @param selector - the selector of the row to get
 */
Cypress.Commands.add('getTableRowsBySelector', selector => cy.contains('td', selector).siblings());

/**
 *  Get a list o table rows using the TEST_ID_KEY
 *  @param selector - the the table data test key
 */
Cypress.Commands.add('getTableRowsByTestId', selector => cy.getByTestId(selector).find('tbody > tr'));

/**
 *  Get the list o table columns using the TEST_ID_KEY
 *  @param selector - the table data test key
 */
Cypress.Commands.add('getTableColsByTestId', selector => cy.getByTestId(selector).find('thead > tr > th'));

/**
 *  Get the action menu (kebab menu) from a specific row of a table bu data test key
 *  @param selector - the action menu selector
 */
Cypress.Commands.add('getTableActionsByTestId', (selector) => {
  cy.log(`getTableActionsByTestId ${selector}-actions`);
  cy.getByTestId(`${selector}-actions`);
});

/**
 *  Open the action menu (kebab menu) from a specific row of a table bu data test key
 *  @param selector - the action menu selector
 */
Cypress.Commands.add('openTableActionsByTestId', (selector) => {
  cy.log(`click actions by selector ${selector}-actions`);
  cy.getByTestId(`${selector}-actions`).click();
});

/**
 *  Get a Visible Action Item from a specific row of a table by data test key
 *  @param selector - the action item menu selector
 */
Cypress.Commands.add('getVisibleActionItemByTestID', selector => cy.getByTestId(selector).filter(':visible'));

/**
 *  Get a Visible Action Item from a specific row of a table by class name
 *  @param selector - the action item menu selector
 */
Cypress.Commands.add('getVisibleActionItemByClass', className => cy.get(`li.${className} > a`).filter(':visible'));

/**
 * Login to AppBuilder
 */
Cypress.Commands.add('appBuilderLogin', () => {
  cy.log('App-builder Login');
  cy.getOauth2Data();
  cy.get('@oauth2Data').then((oauth2Data) => {
    cy.keycloackLogin(oauth2Data, 'user');
  });
});

/**
 * Logout from AppBuilder
 */
Cypress.Commands.add('appBuilderLogout', () => {
  cy.log('App-builder Logout');
  cy.get('@oauth2Data').then((oauth2Data) => {
    cy.keycloackLogout(oauth2Data);
  });
  cy.clearCache();
});

/**
 * Check if the breadcrumb are visible
 * @param items - an array with the exact breadcrumb items text that should be visible
 */
Cypress.Commands.add('validateBreadcrumbItems', (items) => {
  items.forEach((item) => {
    cy.log('validate breadcrumb item', item);
    cy.get('li.BreadcrumbItem').contains(item).should('be.visible');
  });
});

/**
 * Check if the url is changed as expected
 * @param expectedUrl - the changed expected url
 */
Cypress.Commands.add('validateUrlChanged', (expectedUrl) => {
  cy.location('pathname').should('eq', expectedUrl);
});

/**
 * Check if the toast notification success message is visible
 * @param text - the text message that should be visible in the toast notification
 */
Cypress.Commands.add('validateToastNotificationOk', (text) => {
  cy.get('div.toast-notifications-list-pf > div > span.pficon.pficon-ok').should('be.visible');
  cy.get('div.toast-notifications-list-pf > div').contains(text).should('be.visible');
});

/**
 * Check if the toast notification error message is visible
 * @param text - the text of the error message that should be visible in the toast notification
 */
Cypress.Commands.add('validateToastNotificationError', (text) => {
  cy.get('div.toast-notifications-list-pf > div > span.pficon.pficon-error-circle-o').should('be.visible');
  cy.get('div.toast-notifications-list-pf > div').contains(text).should('be.visible');
});
/**
 * Close the toast notification
 */
Cypress.Commands.add('closeToastNotification', () => {
  cy.get('div.toast-notifications-list-pf > div > button').click();
});

/**
 *  Close the wizard App Tour if it's visible
 */
Cypress.Commands.add('closeWizardAppTour', () => {
  cy.log('Close App Tour Wizard');
  cy.wait(500);
  const status = JSON.parse(localStorage.getItem('redux')).appTour.appTourProgress;
  console.log('status', status);
  cy.log(`AppTourWizardDialog status ${status}`);
  if (!status || status !== 'cancelled') {
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

/**
 *  Open a page from the left menu
 *  @param menuLinks - an array with the exact Menu items names displayed in the UI
 *         e.g. ['Users', 'Management'],
 */
Cypress.Commands.add('openPageFromMenu', (menuLinks) => {
  cy.log('Open a page from menu');
  cy.contains('Dashboard').click({ force: true });
  cy.wait(500);
  cy.closeWizardAppTour();
  cy.log('Click Menu Group', menuLinks[0]);
  cy.contains(menuLinks[0]).click();
  cy.wait(500);
  if (menuLinks[1]) {
    cy.log('Click Page Menu Item', menuLinks[1]);
    cy.get('li.secondary-nav-item-pf.is-hover.list-group-item').contains(menuLinks[1]).click();
  }
});

/**
 * Click on the action menu table if the kebab menu is open (@see command.openTableActionsByTestId)
 * @param actionMenuSelector - the selector of the action menu
 * @param action - the action name displayed in the UI
 */
Cypress.Commands.add('clickOnTableActionMenu', (actionMenuSelector, action) => {
  cy.getByTestId(actionMenuSelector).filter(':visible').contains(action).click();
});

export {};
