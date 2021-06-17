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
const SAMPLE_DUPE_WIDGET_CODE = 'mio_widget';

const PAGE = {
  title: 'My Homepage',
  code: 'my_homepage',
};

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
      cy.openPageFromMenu(['Components', 'MFE & Widgets']);
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
      cy.openPageFromMenu(['Components', 'MFE & Widgets']);
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
      cy.openPageFromMenu(['Components', 'MFE & Widgets']);
      cy.wait(500);
      cy.get('table').should('contain', 'Your Widget');
    });

    it('Delete the widget we just made', () => {
      cy.openPageFromMenu(['Components', 'MFE & Widgets']);
      cy.openTableActionsByTestId(SAMPLE_BASIC_WIDGET_ID);
      cy.getVisibleActionItemByClass(DELETE_ACTION_CLASSNAME).click();
      cy.getModalDialogByTitle('Delete').should('be.visible');
      cy.getButtonByText('Delete').click();
      cy.get('table').should('not.contain', SAMPLE_BASIC_WIDGET_ID);
    });
  });

  describe('Widget Usage for CMS Content Widget', () => {
    const WIDGET_FRAME = {
      frameName: 'Frame 3',
      frameNum: 6,
      widgetCode: 'content_viewer',
      widgetName: 'Content',
    };

    it('Basic add with widget settings', () => {
      cy.openPageViaPageDesigner(PAGE);
      cy.wait(500);

      cy.log(`Add the widget to the page in ${WIDGET_FRAME.frameName}`);
      cy.addWidgetToFrame(WIDGET_FRAME.widgetName, WIDGET_FRAME.frameName);

      cy.validateUrlChanged(`/widget/config/${WIDGET_FRAME.widgetCode}/page/${PAGE.code}/frame/${WIDGET_FRAME.frameNum}`);
      cy.getByTestId(TEST_ID_PAGE_DESIGNER.WIDGET_CONFIG).contains('Add existing content').click();
      cy.getModalDialogByTitle('Select one content item').should('be.visible');
      cy.get('#selectTCL6').click();
      cy.get('.modal-dialog').contains('Choose').click();
      cy.wait(500);
      cy.get('.modal-dialog').should('not.exist');
      cy.getByTestId(TEST_ID_PAGE_DESIGNER.WIDGET_CONFIG).contains('Save').click();
      cy.wait(500);

      cy.getPageStatus().should('match', /^Published, with pending changes$/);
      cy.publishPageClick();
      cy.getPageStatus().should('match', /^Published$/);
    });

    it('Open Widget Details from the widget dropped', () => {
      cy.openPageViaPageDesigner(PAGE);
      cy.wait(500);

      cy.openPageWidgetDetailsByFrame(WIDGET_FRAME.frameName);
      cy.validateUrlChanged(`/widget/detail/${WIDGET_FRAME.widgetCode}`);
    });

    it('Save As Widget', () => {
      cy.openPageViaPageDesigner(PAGE);
      cy.wait(500);

      cy.openSaveAsWidgetWithFrame(WIDGET_FRAME.frameName);

      cy.validateUrlChanged(`/page/${PAGE.code}/clone/${WIDGET_FRAME.frameNum}/widget/${WIDGET_FRAME.widgetCode}/viewerConfig`);
      cy.fillUpWidgetForm('Mio Widget', SAMPLE_DUPE_WIDGET_CODE, '', 'Free Access');
      cy.get('form').contains('Parent Type').should('exist');
      cy.get('form').contains('Configuration *').should('exist');
      cy.get('form').contains('Configuration *').click();
      cy.wait(500);
      cy.get('form').contains('Change content').should('exist');
      cy.get(`.${WIDGET_FORM_HEADER_CLASSNAME}`).contains('Save and Replace').click();

      cy.wait(4500);
      cy.validateUrlChanged(`/page/configuration/${PAGE.code}`);
      cy.getPageStatus().should('match', /^Published, with pending changes$/);
      cy.publishPageClick();
      cy.wait(500);
      cy.getPageStatus().should('match', /^Published$/);
    });

    it('Test widget cleanup', () => {
      cy.openPageViaPageDesigner(PAGE);
      cy.wait(500);
      cy.deletePageWidgetByFrame(WIDGET_FRAME.frameName);
      cy.publishPageClick();
      cy.openPageFromMenu(['Components', 'MFE & Widgets']);
      cy.openTableActionsByTestId(SAMPLE_DUPE_WIDGET_CODE);
      cy.getVisibleActionItemByClass(DELETE_ACTION_CLASSNAME).click();
      cy.getModalDialogByTitle('Delete').should('be.visible');
      cy.getButtonByText('Delete').click();
      cy.get('table').should('not.contain', SAMPLE_DUPE_WIDGET_CODE);
    });
  });

  describe('Widget Usage for CMS Content List Widget', () => {
    const WIDGET_FRAME = {
      frameName: 'Frame 4',
      frameNum: 7,
      widgetCode: 'row_content_viewer_list',
      widgetName: 'Content List',
    };

    it('Basic add with widget settings', () => {
      cy.openPageViaPageDesigner(PAGE);
      cy.wait(500);

      cy.log(`Add the widget to the page in ${WIDGET_FRAME.frameName}`);
      cy.addWidgetToFrame(WIDGET_FRAME.widgetName, WIDGET_FRAME.frameName);

      cy.validateUrlChanged(`/widget/config/${WIDGET_FRAME.widgetCode}/page/${PAGE.code}/frame/${WIDGET_FRAME.frameNum}`);
      cy.wait(5000);
      cy.get('.Contents__body td').contains('Sample - About Us')
        .siblings().contains('Add')
        .click();
      cy.get('.Contents__body td').contains('Sample Banner')
        .siblings().contains('Add')
        .click();
      cy.wait(500);
      cy.getByName('contents[0].modelId').select('2-column-content');
      cy.getByName('contents[1].modelId').select('Banner - Text, Image, CTA');
      cy.getByTestId(TEST_ID_PAGE_DESIGNER.WIDGET_CONFIG).contains('Save').click();

      cy.wait(500);
      cy.getPageStatus().should('match', /^Published, with pending changes$/);
      cy.publishPageClick();
      cy.getPageStatus().should('match', /^Published$/);
    });

    it('Open Widget Details from the widget dropped', () => {
      cy.openPageViaPageDesigner(PAGE);
      cy.wait(500);

      cy.openPageWidgetDetailsByFrame(WIDGET_FRAME.frameName);
      cy.validateUrlChanged(`/widget/detail/${WIDGET_FRAME.widgetCode}`);
    });

    it('Save As Widget', () => {
      cy.openPageViaPageDesigner(PAGE);
      cy.wait(500);

      cy.openSaveAsWidgetWithFrame(WIDGET_FRAME.frameName);

      cy.validateUrlChanged(`/page/${PAGE.code}/clone/${WIDGET_FRAME.frameNum}/widget/${WIDGET_FRAME.widgetCode}/rowListViewerConfig`);
      cy.fillUpWidgetForm('Mio Widget', SAMPLE_DUPE_WIDGET_CODE, '', 'Free Access');
      cy.get('form').contains('Parent Type').should('exist');
      cy.get('form').contains('Configuration *').should('exist');
      cy.get('form').contains('Configuration *').click();
      cy.wait(500);
      cy.get('form').contains('Sample Banner').should('exist');
      cy.get(`.${WIDGET_FORM_HEADER_CLASSNAME}`).contains('Save and Replace').click();

      cy.wait(4500);
      cy.validateUrlChanged(`/page/configuration/${PAGE.code}`);
      cy.getPageStatus().should('match', /^Published, with pending changes$/);
      cy.publishPageClick();
      cy.wait(500);
      cy.getPageStatus().should('match', /^Published$/);
    });

    it('Test widget cleanup', () => {
      cy.openPageViaPageDesigner(PAGE);
      cy.wait(500);
      cy.deletePageWidgetByFrame(WIDGET_FRAME.frameName);
      cy.publishPageClick();
      cy.openPageFromMenu(['Components', 'MFE & Widgets']);
      cy.openTableActionsByTestId(SAMPLE_DUPE_WIDGET_CODE);
      cy.getVisibleActionItemByClass(DELETE_ACTION_CLASSNAME).click();
      cy.getModalDialogByTitle('Delete').should('be.visible');
      cy.getButtonByText('Delete').click();
      cy.get('table').should('not.contain', SAMPLE_DUPE_WIDGET_CODE);
    });
  });
});

