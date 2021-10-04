import { createSelector } from 'reselect';
import { getMethodsSelectedAttribute } from 'state/content-type/selectors';

export const getContentTemplateState = state => state.contentTemplate;

export const getContentTemplateList = createSelector(
  getContentTemplateState,
  contentTemplate => contentTemplate.list,
);

export const getContentTemplateOpened = createSelector(
  getContentTemplateState,
  contentTemplate => contentTemplate.opened,
);

export const getContentTemplateFilters = createSelector(
  getContentTemplateState,
  contentTemplate => contentTemplate.filters,
);

export const getContentTemplateFilterProps = createSelector(
  getContentTemplateFilters,
  filters => filters.filterProps,
);

export const getContentTemplateSearchAttribute = createSelector(
  getContentTemplateFilters,
  filters => filters.attribute,
);

export const getContentTemplateSearchKeyword = createSelector(
  getContentTemplateFilters,
  filters => filters.keyword,
);

export const getContentTemplateDictionary = createSelector(
  getContentTemplateState,
  contentTemplate => contentTemplate.dictionary,
);

export const getContentTemplateDictionaryList = createSelector(
  [getContentTemplateDictionary, getMethodsSelectedAttribute],
  (dictionary, attributeMethods) => (
    dictionary.list.map((object) => {
      const { code } = object;
      const methods = {
        ...(code === '$content' ? attributeMethods : {}),
        ...object.methods,
      };
      return {
        code,
        methods: methods ? Object.entries(methods)
          .map(([key, m]) => [key.replace(/"/g, '\''), m])
          .reduce((acc, [key, m]) => {
            acc[key] = m;
            return acc;
          }, {}) : null,
      };
    })
  ),
);
