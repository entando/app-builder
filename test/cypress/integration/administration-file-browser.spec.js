import {
  TEST_ID_FOLDER_FILE_BROWSER,
  TEST_ID_BUTTON_FILE_BROWSER,
  TEST_ID_UPLOAD_FIELD_FILE_BROWSER,
  TEST_ID_ACTION_BUTTON_FILE_BROWSER,
} from '../../../src/ui/test-const/admin-test-const';

describe('Pages', () => {
  beforeEach(() => {
    cy.appBuilderLogin();
    cy.closeWizardAppTour();
  });

  afterEach(() => {
    cy.appBuilderLogout();
  });

  // TODO add assertions to have real tests
  describe('Upload file in the administration', () => {
    it('Should upload one file', () => {
      cy.openPageFromMenu(['Administration', 'File browser']);
      cy.getByTestId(TEST_ID_FOLDER_FILE_BROWSER).contains('public').click();
      cy.getByTestId(TEST_ID_BUTTON_FILE_BROWSER).contains('Upload files').click();
      cy.addAttachFile(TEST_ID_UPLOAD_FIELD_FILE_BROWSER, 'upload/data1.json');
      cy.getByTestId(TEST_ID_ACTION_BUTTON_FILE_BROWSER).contains('Upload').click();
    });

    it('Should upload multiple file', () => {
      cy.openPageFromMenu(['Administration', 'File browser']);
      cy.getByTestId(TEST_ID_FOLDER_FILE_BROWSER).contains('public').click();
      cy.getByTestId(TEST_ID_BUTTON_FILE_BROWSER).contains('Upload files').click();
      cy.addAttachFile(TEST_ID_UPLOAD_FIELD_FILE_BROWSER, ['upload/data2.json', 'upload/data3.json']);
      cy.getByTestId(TEST_ID_ACTION_BUTTON_FILE_BROWSER).contains('Upload').click();
    });

    it('Should upload file with drag and drop', () => {
      cy.openPageFromMenu(['Administration', 'File browser']);
      cy.getByTestId(TEST_ID_FOLDER_FILE_BROWSER).contains('public').click();
      cy.getByTestId(TEST_ID_BUTTON_FILE_BROWSER).contains('Upload files').click();
      cy.addAttachFileByDragAndDrop(TEST_ID_UPLOAD_FIELD_FILE_BROWSER, 'upload/data4.json');
      cy.getByTestId(TEST_ID_ACTION_BUTTON_FILE_BROWSER).contains('Upload').click();
    });
  });
});

