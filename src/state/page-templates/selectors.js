import { createSelector } from 'reselect';
import { get } from 'lodash';

import { validatePageTemplate, getCellMap, convertPageTemplateForm } from 'state/page-templates/helpers';
import { getPageTemplateForm } from 'state/forms/selectors';
import { getLocale } from 'state/locale/selectors';

export const getPageTemplates = state => state.pageTemplates;
export const getPageTemplatesIdList = state => state.pageTemplates.idList;
export const getPageTemplatesMap = state => state.pageTemplates.map;
export const getSelectedPageTemplate = state => state.pageTemplates.selected;
export const getPageTemplatesTotal = state => state.pageTemplates.total;

export const getPageTemplatesList = createSelector(
  [getPageTemplatesIdList, getPageTemplatesMap],
  (pageTemplatesIdList, pageTemplatesMap) => (
    pageTemplatesIdList.map(code => pageTemplatesMap[code])
  ),
);

export const getSelectedPageTemplateCellMap = createSelector(
  [getSelectedPageTemplate],
  getCellMap,
);

export const getSelectedPageTemplateCanBeOnTheFly = createSelector(
  [getSelectedPageTemplate],
  pageTemplate => !!get(pageTemplate, 'configuration.frames', []).find(frame => frame.mainFrame),
);

export const getSelectedPageTemplateMainFrame = createSelector(
  [getSelectedPageTemplate],
  (pageTemplate) => {
    const frames = get(pageTemplate, 'configuration.frames', []);
    const mainFrame = frames.find(frame => frame.mainFrame);
    return mainFrame || null;
  },
);

export const getSelectedPageTemplateDefaultConfig = createSelector(
  [getSelectedPageTemplate],
  (pageTemplate) => {
    const frames = get(pageTemplate, 'configuration.frames', []);
    return frames.length ? frames.map(frame => frame.defaultWidget || null) : null;
  },
);

export const getFormPageTemplate = createSelector(
  [getPageTemplateForm],
  pageTemplateForm => convertPageTemplateForm(pageTemplateForm),
);

export const getPageTemplateFormCellMap = createSelector(
  [getFormPageTemplate],
  getCellMap,
);

export const getPageTemplateFormErrors = createSelector(
  [getFormPageTemplate],
  (formPageTemplate) => {
    const errors = validatePageTemplate(formPageTemplate);
    if (errors && errors.length) {
      return errors;
    }
    return [];
  },
);

export const getSelectedPageTemplatePageRefs = createSelector(
  [getSelectedPageTemplate],
  pageTemplate => pageTemplate && pageTemplate.pageReferences,
);

export const getLocalizedPageTemplatePageRefs = createSelector(
  [getSelectedPageTemplatePageRefs, getLocale],
  (refs, locale) => refs && refs.map(ref => ({
    ...ref,
    title: ref.titles[locale],
    fullTitle: ref.fullTitles[locale],
  })),
);
