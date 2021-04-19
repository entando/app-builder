import {
  TEST_ID_PAGE_CONTAINER,
  TEST_ID_CONTENTTYPES_LIST_TABLE,
  TEST_ID_CONTENTTYPE_FORM,
} from '../../../../src/ui/test-const/contenttypes-complex-const';

Cypress.Commands.add('openContentTypeFormWith', (contentTypeCode) => {
  cy.log(`Edit content type ${contentTypeCode}`);
  cy.openPageFromMenu(['Content', 'Types']);
  cy.openTableActionsByTestId(contentTypeCode);
  cy.getVisibleActionItemByClass(TEST_ID_CONTENTTYPES_LIST_TABLE.ACTION_EDIT).click();
  cy.validateUrlChanged(`/cms/content-types/edit/${contentTypeCode}`);
});

Cypress.Commands.add('addNewContentTypeAttribute', (contentTypeCode, attributeType) => {
  cy.log(`Add new content type attribute ${attributeType} to ${contentTypeCode}`);
  cy.getByName(TEST_ID_CONTENTTYPE_FORM.NAME_TYPE_DROPDOWN).select(attributeType);
  cy.getByTestId(TEST_ID_PAGE_CONTAINER).contains('Add').click();
  cy.validateUrlChanged(`/cms/content-type/attribute/${contentTypeCode}/add`);
});

Cypress.Commands.add('fillAddListAttributeForm', (nestedAttribute, codeValue, contentTypeCode, attributeType = 'List') => {
  const isArrayNested = ['Monolist', 'List'].includes(attributeType);
  cy.log(`Add a nested attribute ${nestedAttribute} with attribute ${codeValue} for ${contentTypeCode}`);
  cy.getByName('code').type(codeValue);
  if (isArrayNested) {
    cy.getByName(TEST_ID_CONTENTTYPE_FORM.ATTRIBUTE_TYPE_DROPDOWN).select(nestedAttribute);
  }
  cy.getByTestId(TEST_ID_PAGE_CONTAINER).contains('Continue').click();

  if (isArrayNested) {
    cy.validateUrlChanged(`/cms/content-type/attribute/${contentTypeCode}/MonolistAdd/${codeValue}`);
    cy.wait(1000);

    if (nestedAttribute !== 'Composite') {
      cy.getByTestId(TEST_ID_PAGE_CONTAINER).contains('Continue').click();
      cy.validateUrlChanged(`/cms/content-types/edit/${contentTypeCode}`);
      cy.wait(1000);
      cy.log('check if new list attribute exists');
      cy.get('table').should('contain', codeValue);
    }
  }
});

Cypress.Commands.add('addNewCompositeAttribute', (attributeType, codeValue, contentTypeCode, fromEdit = false, isMonolistComposite = false) => {
  cy.log(`Add new composite attribute ${attributeType} to ${contentTypeCode}`);
  const dropdownName = (!fromEdit && isMonolistComposite) ?
    TEST_ID_CONTENTTYPE_FORM.ATTRIBUTE_TYPE_DROPDOWN :
    TEST_ID_CONTENTTYPE_FORM.NAME_TYPE_DROPDOWN;
  cy.getByName(dropdownName).select(attributeType);
  cy.getByTestId(TEST_ID_PAGE_CONTAINER).contains(/^Add$/).click();
  cy.getByName('code').type(codeValue);
  cy.getByTestId(TEST_ID_PAGE_CONTAINER).contains(fromEdit || isMonolistComposite ? 'Continue' : 'Save').click();
  cy.wait(500);
  cy.log('check if new list attribute exists');
  cy.get('table').should('contain', codeValue);
});

Cypress.Commands.add('fillEditListAttributeForm', (nameEnValue, codeValue, contentTypeCode, attributeType = 'List', isMonolistComposite = false) => {
  const isArrayNested = ['Monolist', 'List'].includes(attributeType);
  cy.log(`Edit attribute ${codeValue} for ${contentTypeCode}`);
  cy.openTableActionsByTestId(codeValue);
  cy.getVisibleActionItemByClass(TEST_ID_CONTENTTYPE_FORM.ACTION_EDIT).click();
  cy.wait(500);
  cy.validateUrlChanged(`/cms/content-type/attribute/${contentTypeCode}/edit/${codeValue}`);
  cy.getByName('names.en').clear();
  cy.getByName('names.en').type(nameEnValue);
  cy.getByTestId(TEST_ID_PAGE_CONTAINER).contains('Continue').click();
  if (isArrayNested) {
    if (!isMonolistComposite) {
      cy.validateUrlChanged(`/cms/content-type/attribute/${contentTypeCode}/MonolistAdd/${codeValue}`);
      cy.wait(1000);
      cy.getByTestId(TEST_ID_PAGE_CONTAINER).contains('Continue').click();
      cy.validateUrlChanged(`/cms/content-types/edit/${contentTypeCode}`);
      cy.wait(1000);

      cy.log('check if new name of list attribute exists');
      cy.get('table').should('contain', nameEnValue);
    }
  }
});

Cypress.Commands.add('deleteAttributeFromContentType', (codeValue, contentTypeCode, forSubAttribute = false) => {
  cy.log(`Delete attribute ${codeValue} from ${contentTypeCode}`);
  cy.openTableActionsByTestId(codeValue);
  cy.getVisibleActionItemByClass(TEST_ID_CONTENTTYPE_FORM.ACTION_DELETE).click();
  if (!forSubAttribute) {
    cy.getModalDialogByTitle('Delete').should('be.visible');
    cy.getButtonByText('Delete').click();
  }
  cy.get('table').should('not.contain', codeValue);
});

export {};
