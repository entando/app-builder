// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

/**
 * From: https://github.com/abramenal/cypress-file-upload
 */
import 'cypress-file-upload';

const apiUrl = Cypress.config('apiUrl');

const domainUrl = `${apiUrl || '/'}entando-de-app`;

Cypress.Commands.add('addRouteListener', (url, method = 'PUT', waitId = 'upload') => {
  cy.server({ method });
  cy.route({
    method,
    url: `${domainUrl}/${url}`,
  }).as(waitId);
});

Cypress.Commands.add('addAttachFile', (selector, fixture) => {
  cy.getByTestId(selector).attachFile(fixture);
});

Cypress.Commands.add('addAttachFileByDragAndDrop', (selector, fixture) => {
  cy.getByTestId(selector).attachFile(fixture, { subjectType: 'drag-n-drop' });
});

// Convert this to a module instead of script (allows import/export)
export {};
