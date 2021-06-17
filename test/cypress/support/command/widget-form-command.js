import {
  TEST_ID_ICON_UPLOADER_INPUT,
  FIELD_NAME_TITLE_EN,
  FIELD_NAME_TITLE_IT,
  FIELD_NAME_CODE,
  TEST_ID_GROUP_TYPEAHEAD,
  FIELD_NAME_CUSTOM_UI,
} from '../../../../src/ui/test-const/components-test-const';

Cypress.Commands.add('fillUpWidgetForm', (
  widgetName = 'My Widget',
  widgetCode = 'my_widget',
  customUi = '<h1>Just a basic widget</h1>',
  group = 'Administrators',
) => {
  cy.addAttachFile(TEST_ID_ICON_UPLOADER_INPUT, 'icon/Entando.svg');
  cy.wait(500);
  cy.getByName(FIELD_NAME_TITLE_EN).type(widgetName);
  cy.getByName(FIELD_NAME_TITLE_IT).type(widgetName);
  cy.getByName(FIELD_NAME_CODE).clear();
  cy.getByName(FIELD_NAME_CODE).type(widgetCode);
  cy.getByTestId(TEST_ID_GROUP_TYPEAHEAD).click();
  cy.getByTestId(TEST_ID_GROUP_TYPEAHEAD).contains(group).click();
  if (customUi) {
    cy.getByName(FIELD_NAME_CUSTOM_UI).type(customUi);
  }
});
