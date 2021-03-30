import TEST_ID_PAGE_TREE from '../../../../src/ui/test-const/page-management-test-const';

function doDragAndDrop(dragPageName, targetPageName, position) {
  cy.getByTestId(TEST_ID_PAGE_TREE).contains(targetPageName).then(($el) => {
    cy.getByTestId(TEST_ID_PAGE_TREE).contains(dragPageName).parent()
      .siblings('button')
      .drag($el, { force: true, position })
      .then(() => {
        cy.getByTestId('modal_GenericModal_Button').contains('Move').click();
      });
  });
}

Cypress.Commands.add('dragAndDropPageAbove', (dragPageName, targetPageName) => {
  doDragAndDrop(dragPageName, targetPageName, 'top');
});

Cypress.Commands.add('dragAndDropPageInto', (dragPageName, targetPageName) => {
  doDragAndDrop(dragPageName, targetPageName, 'center');
});

Cypress.Commands.add('dragAndDropPageBelow', (dragPageName, targetPageName) => {
  doDragAndDrop(dragPageName, targetPageName, 'bottom');
});

function expandOrCollapse(folderName, isExpand) {
  const selectedClass = isExpand ? 'fa-angle-right' : 'fa-angle-down';
  cy.getByTestId(TEST_ID_PAGE_TREE).contains(folderName).siblings(`i.${selectedClass}`).click();
  cy.wait(500);
}

Cypress.Commands.add('expand', (folderName) => {
  expandOrCollapse(folderName, true);
});

Cypress.Commands.add('collapse', (folderName) => {
  expandOrCollapse(folderName);
});

Cypress.Commands.add('collapseAll', () => {
  cy.getByTestId(TEST_ID_PAGE_TREE).siblings().contains('Collapse').click();
});

Cypress.Commands.add('expandAll', () => {
  cy.getByTestId(TEST_ID_PAGE_TREE).siblings().contains('Expand').click();
});

export {};
