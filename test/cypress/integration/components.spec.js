import {
  TEST_ID_COMPONENT_LIST_BUTTON,
  TEST_ID_ICON_UPLOADER_INPUT,
} from '../../../src/ui/test-const/components-test-const';

describe('Pages', () => {
  beforeEach(() => {
    cy.appBuilderLogin();
  });

  afterEach(() => {
    cy.appBuilderLogout();
  });

  // TODO add assertions to have real tests
  describe('Add a new widget with upload a file', () => {
    it('Should create the widget and upload the icon', () => {
      cy.openPageFromMenu(['Components', 'Micro Frontends & Widgets']);
      cy.getByTestId(TEST_ID_COMPONENT_LIST_BUTTON).contains('Add').click();
      cy.getByTestId(TEST_ID_ICON_UPLOADER_INPUT).attachFile('icon/pokeball.svg');
    });

    it('Should create the widget and drag and drop the icon', () => {
      cy.openPageFromMenu(['Components', 'Micro Frontends & Widgets']);
      cy.getByTestId(TEST_ID_COMPONENT_LIST_BUTTON).contains('Add').click();
      cy.getByTestId(TEST_ID_ICON_UPLOADER_INPUT).attachFile('icon/pokeball.svg', { subjectType: 'drag-n-drop' });
    });
  });
});

