import {
  TEST_ID_PAGE_TREE,
  TEST_ID_MODAL_BUTTON,
  TEST_ID_SEARCH_DROPDOWN_BUTTON,
  TEST_ID_SEARCH_DROPDOWN_MENU_ITEM,
  TEST_ID_SEARCH_FIELD,
  TEST_ID_SEARCH_BUTTON,
  TEST_ID_LIST_PAGE_TREE_BUTTON,
  TEST_ID_LIST_PAGE_TREE_ACTION_MENU,
} from '../../../../src/ui/test-const/page-management-test-const';

function doDragAndDrop(dragPageName, targetPageName, position) {
  cy.getByTestId(TEST_ID_PAGE_TREE).contains(targetPageName).then(($el) => {
    cy.getByTestId(TEST_ID_PAGE_TREE).contains(dragPageName).parent()
      .siblings('button')
      .drag($el, { force: true, position })
      .then(() => {
        cy.getByTestId(TEST_ID_MODAL_BUTTON).contains('Move').click();
      });
  });
}

/**
 * Drag the page above the target page by clicking on the drag button on the left of the row.
 * @param draggedPageName the exact displayed page name in the UI e.g. "Sitemap"
 * @param targetPageName the exact displayed page name in the UI e.g. "Home"
 */
Cypress.Commands.add('dragAndDropPageAbove', (draggedPageName, targetPageName) => {
  doDragAndDrop(draggedPageName, targetPageName, 'top');
});

/**
 * Drag the page into the target page by clicking on the drag button on the left of the row.
 * This is intended to be used to target a folder.
 * @param draggedPageName the exact displayed page name in the UI e.g. "Sitemap"
 * @param targetPageName the exact displayed page name in the UI e.g. "Home"
 */
Cypress.Commands.add('dragAndDropPageInto', (draggedPageName, targetPageName) => {
  doDragAndDrop(draggedPageName, targetPageName, 'center');
});

/**
 *  Drag the page below the target page by clicking on the drag button on the left of the row.
 * @param draggedPageName the exact displayed page name in the UI e.g. "Sitemap"
 * @param targetPageName the exact displayed page name in the UI e.g. "Home"
 */
Cypress.Commands.add('dragAndDropPageBelow', (draggedPageName, targetPageName) => {
  doDragAndDrop(draggedPageName, targetPageName, 'bottom');
});

function expandOrCollapse(folderName, isExpand) {
  const selectedClass = isExpand ? 'fa-angle-right' : 'fa-angle-down';
  cy.getByTestId(TEST_ID_PAGE_TREE).contains(folderName).siblings(`i.${selectedClass}`).click();
  cy.wait(500);
}

/**
 * Expand one folder by click on the arrow aside the name.
 * @param folderName the exact name displayed in the UI e.g. "Home", "Sitemap"
 */
Cypress.Commands.add('expand', (folderName) => {
  expandOrCollapse(folderName, true);
});

/**
 * Collapse one folder by click on the arrow aside the name.
 * @param folderName the exact name displayed in the UI e.g. "Home", "Sitemap"
 */
Cypress.Commands.add('collapse', (folderName) => {
  expandOrCollapse(folderName);
});

function expandOrCollapseAll(label) {
  cy.getByTestId(TEST_ID_PAGE_TREE).siblings().contains(label).click();
}

/**
 * Expand all folders by clicking on the "Expand" main button above the page tree.
 */
Cypress.Commands.add('expandAll', () => {
  expandOrCollapseAll('Expand');
});

/**
 * Collapse all folders by clicking on the "Collapse" main button above the page tree.
 */
Cypress.Commands.add('collapseAll', () => {
  expandOrCollapseAll('Collapse');
});

/**
 * Select the element we want to filter with and the value.
 * @param filterName the name in the UI dropdown list
 * @param value the value we want to search the page with
 */
Cypress.Commands.add('searchBy', (filterName, value) => {
  cy.getByTestId(TEST_ID_SEARCH_DROPDOWN_BUTTON).click().then(() => {
    cy.getByTestId(TEST_ID_SEARCH_DROPDOWN_MENU_ITEM).contains(filterName).click().then(() => {
      cy.getByTestId(TEST_ID_SEARCH_FIELD).type(value).then(() => {
        cy.getByTestId(TEST_ID_SEARCH_BUTTON).click();
      });
    });
  });
});

/**
 * Clear all the results after a research.
 */
Cypress.Commands.add('clearResults', () => {
  cy.getByTestId(TEST_ID_LIST_PAGE_TREE_BUTTON).contains('Clear results').click();
});

/**
 * Click on the action menu table if the kebab menu is open (@see command.openTableActionsByTestId)
 * @param the action name displayed in the UI
 */
Cypress.Commands.add('clickOnTableActionMenu', (action) => {
  cy.getByTestId(TEST_ID_LIST_PAGE_TREE_ACTION_MENU).contains(action).click();
});

export {};
