import {
  TEST_ID_LIST_PAGE_TREE,
  TEST_ID_PAGE_FORM,
  TEST_ID_PAGE_FORM_META_TAG,
} from '../../../../src/ui/test-const/page-management-test-const';
import { replaceLangCodePlaceholder, replaceMetaTagPlaceholders } from '../utils';

/**
 * Add the list of  the page meta-tags for the default language
 * @param metaTag - The list of meta-tags to add
 */
Cypress.Commands.add('addPageDefaultLangMetaTags', (metaTags) => {
  metaTags.forEach((metaTag) => {
    cy.getInputByName(TEST_ID_PAGE_FORM_META_TAG.DEFAULT_LANG_KEY_FIELD).type(metaTag.key);
    cy.getSelectByName(TEST_ID_PAGE_FORM_META_TAG.DEFAULT_LANG_TYPE_FIELD).select(metaTag.type);
    cy.getInputByName(TEST_ID_PAGE_FORM_META_TAG.DEFAULT_LANG_VALUE_FIELD).type(metaTag.value);
    cy.getByTestId(TEST_ID_PAGE_FORM_META_TAG.BUTTON).contains('Add').click();
  });
});

/**
 * Add the list of  the page meta-tags for non default language
 * @param metaTag - The list of meta-tags to add
 * @param lang - the language code of the meta-tags list
 */
Cypress.Commands.add('addPageMetaTags', (metaTags, lang) => {
  metaTags.forEach((metaTag, i) => {
    const { useDefaultLang, type, value } = metaTag;
    if (useDefaultLang) {
      // eslint-disable-next-line max-len
      cy.getByTestId(replaceMetaTagPlaceholders(TEST_ID_PAGE_FORM_META_TAG.INHERIT_SWITCH_FIELD, i, lang))
        .click();
    } else {
      cy.getSelectByName(replaceMetaTagPlaceholders(TEST_ID_PAGE_FORM_META_TAG.TYPE_FIELD, i, lang))
        .select(type);
      cy.getInputByName(replaceMetaTagPlaceholders(TEST_ID_PAGE_FORM_META_TAG.VALUE_FIELD, i, lang))
        .clear();
      cy.getInputByName(replaceMetaTagPlaceholders(TEST_ID_PAGE_FORM_META_TAG.VALUE_FIELD, i, lang))
        .type(value);
    }
  });
});

function fillSeoDataByLangFields(seoDataByLang, lang) {
  const { description, keywords, friendlyCode } = seoDataByLang;
  if (description) {
    cy.getInputByName(replaceLangCodePlaceholder(TEST_ID_PAGE_FORM.SEO_DESCRIPTION_FIELD, lang))
      .type(description);
  }
  if (keywords) {
    cy.getInputByName(replaceLangCodePlaceholder(TEST_ID_PAGE_FORM.SEO_KEYWORDS_FIELD, lang))
      .type(keywords);
  }
  if (friendlyCode) {
    // eslint-disable-next-line max-len
    cy.getInputByName(replaceLangCodePlaceholder(TEST_ID_PAGE_FORM.SEO_FRIENDLY_CODE_FIELD, lang))
      .type(friendlyCode);
  }
}

function fillPageForm(page, languages, defaultLang, button) {
  cy.getInputByName(replaceLangCodePlaceholder(TEST_ID_PAGE_FORM.TITLE_FIELD, defaultLang))
    .type(page.titles[defaultLang]);
  if (page.seoData) {
    fillSeoDataByLangFields(page.seoData.seoDataByLang[defaultLang], defaultLang);
    cy.addPageDefaultLangMetaTags(page.seoData.seoDataByLang[defaultLang].metaTags);
  }
  // remove the default lang from the list of languages
  const langugesFiltered = languages.filter(item => item !== defaultLang);
  langugesFiltered.forEach((lang) => {
    cy.getByTestId(TEST_ID_PAGE_FORM.TABS).contains(lang.toUpperCase()).click();
    cy.wait(200);
    cy.getInputByName(replaceLangCodePlaceholder(TEST_ID_PAGE_FORM.TITLE_FIELD, lang))
      .type(page.titles[lang]);
    if (page.seoData) {
      fillSeoDataByLangFields(page.seoData.seoDataByLang[lang], lang);
      cy.addPageMetaTags(page.seoData.seoDataByLang[lang].metaTags, lang);
    }
  });
  cy.getByTestId(TEST_ID_PAGE_FORM.OWNER_GROUP_TYPEAHEAD).click();
  cy.wait(500);
  cy.getTypeaheadOptionByValue(page.ownerGroup).click();
  cy.getInputByName(TEST_ID_PAGE_FORM.CODE_FIELD).clear();
  cy.getInputByName(TEST_ID_PAGE_FORM.CODE_FIELD).type(page.code);
  cy.getByTestId(TEST_ID_PAGE_FORM.PAGE_TREE_SELECTOR_FIELD).contains(page.parentPage).click();
  cy.getByName(TEST_ID_PAGE_FORM.PAGE_TEMPLATE_FIELD).select(page.pageModel);
  cy.getByTestId(button).click();
}

/**
 * Add a new Page
 * @param page - The page object
 * @param languages - An array with language codes e.g. ["en", "it"]
 * @param defaultLang - The code of the default lang (the default value is 'en')
 * @param button - The button to click ( the default button to click is 'save')
 */
Cypress.Commands.add('addPage', (
  page, languages, defaultLang = 'en',
  button = TEST_ID_PAGE_FORM.SAVE_BUTTON,
) => {
  cy.log(`Add a new page  ${page.code} with default lang ${defaultLang}`);
  cy.openPageFromMenu(['Pages', 'Management']);
  cy.getButtonByText('Add').click();
  cy.validateUrlChanged('/page/add');
  fillPageForm(page, languages, defaultLang, button);
});

/**
 * Delete a Page from the page tree
 * @param pageCode - the page code to delete
*/
Cypress.Commands.add('deletePage', (pageCode) => {
  cy.log(`Delete page  ${pageCode}`);
  cy.expandAllPageTree();
  cy.wait(1000);
  cy.openTableActionsByTestId(pageCode).then(() => {
    cy.clickOnTableActionMenu(TEST_ID_LIST_PAGE_TREE.ACTION_MENU, 'Delete');
  });
  cy.getModalDialogByTitle('Delete page').should('be.visible');
  cy.getButtonByText('Delete').click();
});

/**
 * Publish a Page from the page tree
 * @param pageCode - the page code to publish
 */
Cypress.Commands.add('publishPageAction', (pageCode) => {
  cy.log(`Publish page  ${pageCode}`);
  cy.expandAllPageTree();
  cy.wait(1000);
  cy.openTableActionsByTestId(pageCode).then(() => {
    cy.clickOnTableActionMenu(TEST_ID_LIST_PAGE_TREE.ACTION_MENU, 'Publish');
  });
  cy.getModalDialogByTitle('Publish').should('be.visible');
  cy.getButtonByText('Publish').click();
});

/**
 * Unpublish a Page from the page tree
 * @param pageCode - the page code to unpublish
 */
Cypress.Commands.add('unpublishPageAction', (pageCode) => {
  cy.log(`Unpublish page  ${pageCode}`);
  cy.expandAllPageTree();
  cy.wait(1000);
  cy.openTableActionsByTestId(pageCode).then(() => {
    cy.clickOnTableActionMenu(TEST_ID_LIST_PAGE_TREE.ACTION_MENU, 'Unpublish');
  });
  cy.getModalDialogByTitle('Unpublish').should('be.visible');
  cy.getButtonByText('Unpublish').click();
});
