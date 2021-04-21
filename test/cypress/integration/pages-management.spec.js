import {
  PAGE_WITH_SEO_DATA,
  PAGE_ALREADY_EXIST,
  PAGE_WITHOUT_SEO_DATA,
  PAGE_FREE_OWNER_GROUP,
} from '../mocks/pages';
import { TEST_ID_LIST_PAGE_TREE } from '../../../src/ui/test-const/page-management-test-const';

describe('Pages Management', () => {
  const languages = ['en', 'it'];

  beforeEach(() => {
    cy.appBuilderLogin();
    cy.closeWizardAppTour();
  });

  afterEach(() => {
    cy.appBuilderLogout();
  });

  describe('Add a new page', () => {
    it('Should add a page without SEO Attributes', () => {
      cy.addPage(PAGE_WITHOUT_SEO_DATA, languages);
      cy.validateToastNotificationOk('Page successfully created');
      cy.deletePage(PAGE_WITHOUT_SEO_DATA.code);
    });

    it('Should add a page with SEO Attributes', () => {
      cy.addPage(PAGE_WITH_SEO_DATA, languages);
      cy.validateToastNotificationOk('Page successfully created');
      cy.deletePage(PAGE_WITH_SEO_DATA.code);
    });

    it('Should forbid adding a page that already exist', () => {
      cy.addPage(PAGE_ALREADY_EXIST, languages);
      cy.validateToastNotificationError(`The page ${PAGE_ALREADY_EXIST.code} already exists`);
    });
  });

  describe('Search Page', () => {
    it('Should search the page by Name', () => {
      const pageName = 'Home';
      cy.openPageFromMenu(['Pages', 'Management']);
      cy.searchPageBy('Page Name', pageName);
      cy.getTableRowsBySelector(pageName).should('be.visible');
      cy.getTableRowsByTestId(TEST_ID_LIST_PAGE_TREE.SEARCH_TABLE).should('have.length', 2);
      cy.clearSearchPageResults();
    });

    it('Should search the page by Code', () => {
      const pageCode = 'homepage';
      cy.openPageFromMenu(['Pages', 'Management']);
      cy.searchPageBy('Page Code', pageCode);
      cy.getTableRowsBySelector(pageCode).should('be.visible');
      cy.getTableRowsByTestId(TEST_ID_LIST_PAGE_TREE.SEARCH_TABLE).should('have.length', 2);
      cy.clearSearchPageResults();
    });
  });

  describe('Change page position in the page tree', () => {
    it('Should move the page in the right place according the place chosen in the tree (Above)', () => {
      cy.openPageFromMenu(['Pages', 'Management']);
      cy.expandAllPageTreeFolders();
      cy.dragAndDropPageAbove('Sitemap', 'Error page');
      cy.dragAndDropPageBelow('Error page', 'Sitemap');
    });

    it('Should move the page in the right place according the place chosen in the tree (Below)', () => {
      cy.openPageFromMenu(['Pages', 'Management']);
      cy.expandAllPageTreeFolders();
      cy.dragAndDropPageBelow('Sitemap', 'My Homepage');
      cy.dragAndDropPageAbove('My Homepage', 'Sitemap');
    });

    it('Should forbid to move a page with free owner group under a reserved page', () => {
      cy.addPage(PAGE_WITHOUT_SEO_DATA, languages);
      cy.closeToastNotification();
      cy.openPageFromMenu(['Pages', 'Management']);
      cy.expandAllPageTreeFolders();
      cy.dragAndDropPageInto('Search Result', PAGE_WITHOUT_SEO_DATA.titles.en);
      cy.validateToastNotificationError('Cannot move a free page under a reserved page');
      cy.closeToastNotification();
      cy.deletePage(PAGE_WITHOUT_SEO_DATA.code);
    });

    it('Should forbid to move a published page under a no published page', () => {
      cy.addPage(PAGE_FREE_OWNER_GROUP, languages);
      cy.closeToastNotification();
      cy.openPageFromMenu(['Pages', 'Management']);
      cy.expandAllPageTreeFolders();
      cy.wait(1000);
      cy.dragAndDropPageInto('Service', PAGE_FREE_OWNER_GROUP.titles.en);
      cy.validateToastNotificationError('Can not move a published page under an unpublished page');
      cy.deletePage(PAGE_FREE_OWNER_GROUP.code);
    });

    it('Should forbid to move a published page under his published child page', () => {
      cy.openPageFromMenu(['Pages', 'Management']);
      cy.expandAllPageTreeFolders();
      cy.wait(1000);
      cy.dragAndDropPageInto('Service', 'Login');
      cy.validateToastNotificationError('The page \'login\' can not be the parent of \'service\' because he is one of his child');
    });
  });

  describe('Change page status', () => {
    it('Should publish and unpublish a page', () => {
      cy.openPageFromMenu(['Pages', 'Management']);
      cy.unpublishPageAction('login');
      cy.getPageStatusInPageTree('Login').should('match', new RegExp('^Unpublished$'));
      cy.publishPageAction('login');
      cy.getPageStatusInPageTree('Login').should('match', new RegExp('^Published$'));
    });
  });
});
