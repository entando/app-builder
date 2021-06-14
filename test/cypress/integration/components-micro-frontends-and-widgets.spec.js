import {
  TEST_ID_COMPONENT_LIST_BUTTON,
  FIELD_NAME_TITLE_EN,
  TEST_ID_WIDGETFORM_SAVE_DROPDOWNBTN,
  EDIT_ACTION_CLASSNAME,
  DELETE_ACTION_CLASSNAME,
  WIDGET_FORM_HEADER_CLASSNAME,
} from '../../../src/ui/test-const/components-test-const';

import { TEST_ID_PAGE_DESIGNER } from '../../../src/ui/test-const/page-designer-test-const';

const SAMPLE_BASIC_WIDGET_ID = 'my_widget';

describe('Microfrontends and Widgets', () => {
  beforeEach(() => {
    cy.appBuilderLogin();
    cy.closeWizardAppTour();
  });

  afterEach(() => {
    cy.appBuilderLogout();
  });

  describe('Widgets CRUD', () => {
    it('Adding a basic widget with icon', () => {
      cy.openPageFromMenu(['Components', 'Micro Frontends & Widgets']);
      cy.validateUrlChanged('/widget');
      cy.getByTestId(TEST_ID_COMPONENT_LIST_BUTTON).contains('Add').click();
      cy.validateUrlChanged('/widget/add');
      cy.wait(500);
      cy.fillUpWidgetForm('My Widget', SAMPLE_BASIC_WIDGET_ID);
      cy.getByTestId(TEST_ID_WIDGETFORM_SAVE_DROPDOWNBTN).click();
      cy.get('.FragmentForm__dropdown [role=menu]').contains('Save').click();
      cy.validateUrlChanged('/widget');
      cy.get('table').should('contain', SAMPLE_BASIC_WIDGET_ID);
    });

    it('Editing the widget we just made', () => {
      cy.openPageFromMenu(['Components', 'Micro Frontends & Widgets']);
      cy.openTableActionsByTestId(SAMPLE_BASIC_WIDGET_ID);
      cy.getVisibleActionItemByClass(EDIT_ACTION_CLASSNAME).click();
      cy.wait(500);
      cy.validateUrlChanged(`/widget/edit/${SAMPLE_BASIC_WIDGET_ID}`);
      cy.getByName(FIELD_NAME_TITLE_EN).clear();
      cy.getByName(FIELD_NAME_TITLE_EN).type('Your Widget');
      cy.getByTestId(TEST_ID_WIDGETFORM_SAVE_DROPDOWNBTN).click();
      cy.get('.FragmentForm__dropdown [role=menu]').contains('Save and continue').click();
      cy.location('pathname').should('not.eq', '/widget');
      cy.validateUrlChanged(`/widget/edit/${SAMPLE_BASIC_WIDGET_ID}`);
      cy.openPageFromMenu(['Components', 'Micro Frontends & Widgets']);
      cy.wait(500);
      cy.get('table').should('contain', 'Your Widget');
    });

    it('Delete the widget we just made', () => {
      cy.openPageFromMenu(['Components', 'Micro Frontends & Widgets']);
      cy.openTableActionsByTestId(SAMPLE_BASIC_WIDGET_ID);
      cy.getVisibleActionItemByClass(DELETE_ACTION_CLASSNAME).click();
      cy.getModalDialogByTitle('Delete').should('be.visible');
      cy.getButtonByText('Delete').click();
      cy.get('table').should('not.contain', SAMPLE_BASIC_WIDGET_ID);
    });
  });

  describe('Widget Usage for CMS Content Widget', () => {
    const PAGE = 'My Homepage';
    const PAGE_CODE = 'my_homepage';
    const WIDGET_CODE = 'content_viewer';
    it('Open Widget Settings', () => {
      cy.openPageFromMenu(['Pages', 'Designer']);
      cy.getByTestId(TEST_ID_PAGE_DESIGNER.CONFIG_TABS).contains('Page Tree').click();
      cy.wait(500);
      cy.getByTestId(TEST_ID_PAGE_DESIGNER.PAGE_TREE).contains(PAGE).click();
      cy.log('Select the widget');
      cy.getByTestId(TEST_ID_PAGE_DESIGNER.CONFIG_TABS).contains('Widgets').click();
      cy.validateUrlChanged(`/page/configuration/${PAGE_CODE}`);
      cy.log('Add the widget to the page in Frame 3');
      cy.addWidgetToFrame('Content', 'Frame 3');
      cy.validateUrlChanged(`/widget/config/${WIDGET_CODE}/page/${PAGE_CODE}/frame/6`);
      cy.getByTestId(TEST_ID_PAGE_DESIGNER.WIDGET_CONFIG).contains('Add existing content').click();
      cy.getModalDialogByTitle('Select one content item').should('be.visible');
      cy.get('#selectTCL6').click();
      cy.get('.modal-dialog').contains('Choose').click();
      cy.wait(500);
      cy.get('.modal-dialog').should('not.exist');
      cy.getByTestId(TEST_ID_PAGE_DESIGNER.WIDGET_CONFIG).contains('Save').click();
      cy.wait(500);
      cy.getPageStatus().should('match', new RegExp('^Published, with pending changes$'));
      cy.publishPageClick();
      cy.getPageStatus().should('match', new RegExp('^Published$'));
    });

    it('Open Widget Details from the widget dropped', () => {
      cy.openPageFromMenu(['Pages', 'Designer']);
      cy.getByTestId(TEST_ID_PAGE_DESIGNER.CONFIG_TABS).contains('Page Tree').click();
      cy.wait(500);
      cy.getByTestId(TEST_ID_PAGE_DESIGNER.PAGE_TREE).contains(PAGE).click();
      cy.log('Select the widget');
      cy.getByTestId(TEST_ID_PAGE_DESIGNER.CONFIG_TABS).contains('Widgets').click();
      cy.wait(500);
      cy.openPageWidgetDetailsByFrame('Frame 3');
      cy.validateUrlChanged(`/widget/detail/${WIDGET_CODE}`);
    });

    it('Save As Widget', () => {
      cy.openPageFromMenu(['Pages', 'Designer']);
      cy.getByTestId(TEST_ID_PAGE_DESIGNER.CONFIG_TABS).contains('Page Tree').click();
      cy.wait(500);
      cy.getByTestId(TEST_ID_PAGE_DESIGNER.PAGE_TREE).contains(PAGE).click();
      cy.log('Select the widget');
      cy.getByTestId(TEST_ID_PAGE_DESIGNER.CONFIG_TABS).contains('Widgets').click();
      cy.wait(500);
      cy.openSaveAsWidgetWithFrame('Frame 3');
      cy.validateUrlChanged(`/page/${PAGE_CODE}/clone/6/widget/${WIDGET_CODE}/viewerConfig`);
      cy.fillUpWidgetForm('Mio Widget', 'mio_widget', '', 'Free Access');
      cy.get('form').contains('Parent Type').should('exist');
      cy.get('form').contains('Configuration *').should('exist');
      cy.get('form').contains('Configuration *').click();
      cy.wait(500);
      cy.get('form').contains('Change content').should('exist');
      cy.get(`.${WIDGET_FORM_HEADER_CLASSNAME}`).contains('Save and Replace').click();
      cy.wait(4500);
      cy.validateUrlChanged(`/page/configuration/${PAGE_CODE}`);
    });
  });
});

